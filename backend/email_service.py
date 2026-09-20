"""
HarvestGate Email Service — Brevo Transactional API
====================================================
Dedicated module for all outbound email operations.
Uses Brevo HTTP API (no SMTP, no port-blocking issues on Vercel/cloud).
All credentials read from environment variables — never hardcoded.
"""

import os
import re
import logging
import requests
from typing import Tuple, Optional

logger = logging.getLogger(__name__)

BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"

# ── Configuration helpers ─────────────────────────────────────────────────────

def _cfg() -> dict:
    port_str = os.environ.get("SMTP_PORT", "587").strip()
    try:
        smtp_port = int(port_str)
    except ValueError:
        smtp_port = 587

    return {
        "api_key":     os.environ.get("BREVO_API_KEY", "").strip(),
        "from_email":  os.environ.get("MAIL_FROM_EMAIL", "admin@harvestgateoverseas.com").strip(),
        "from_name":   os.environ.get("MAIL_FROM_NAME", "HarvestGate Overseas").strip(),
        "admin_email": os.environ.get("MAIL_ADMIN_EMAIL", "admin@harvestgateoverseas.com").strip(),
        "smtp_host":   os.environ.get("SMTP_HOST", "").strip(),
        "smtp_port":   smtp_port,
        "smtp_user":   os.environ.get("SMTP_USER", "").strip(),
        "smtp_pass":   os.environ.get("SMTP_PASSWORD", "").strip(),
    }

def is_configured() -> bool:
    key = os.environ.get("BREVO_API_KEY", "").strip()
    if key and not key.startswith("your_"):
        return True
    smtp_host = os.environ.get("SMTP_HOST", "").strip()
    smtp_pass = os.environ.get("SMTP_PASSWORD", "").strip()
    return bool(smtp_host and smtp_pass)

_EMAIL_RE = re.compile(r"^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$")

def is_valid_email(email: str) -> bool:
    return bool(_EMAIL_RE.match(email.strip())) if email else False

def _mask_email(email: str) -> str:
    """Privacy-safe email masking for production logs."""
    if not email or "@" not in email:
        return "invalid-email"
    user, domain = email.strip().split("@", 1)
    masked_user = user[0] + "***" + (user[-1] if len(user) > 2 else "")
    return f"{masked_user}@{domain} (domain: {domain})"


# ── Core SMTP delivery helper ─────────────────────────────────────────────────

def _send_smtp(
    smtp_host: str, smtp_port: int, smtp_user: str, smtp_pass: str,
    from_email: str, from_name: str,
    to_email: str, to_name: str,
    subject: str, html_body: str, text_body: str,
    reply_to_email: str = None, reply_to_name: str = None,
) -> Tuple[bool, Optional[str], str]:
    import smtplib
    import ssl
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText

    clean_to = to_email.strip()
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{from_name} <{from_email}>"
    msg["To"] = f"{to_name} <{clean_to}>"
    if reply_to_email:
        msg["Reply-To"] = f"{reply_to_name or reply_to_email} <{reply_to_email.strip()}>"

    msg.attach(MIMEText(text_body, "plain", "utf-8"))
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    try:
        if smtp_port == 465:
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(smtp_host, smtp_port, context=context, timeout=12) as server:
                server.login(smtp_user, smtp_pass)
                server.sendmail(from_email, [clean_to], msg.as_string())
        else:
            with smtplib.SMTP(smtp_host, smtp_port, timeout=12) as server:
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.sendmail(from_email, [clean_to], msg.as_string())
        logger.info("SMTP: successfully sent to %s via %s:%d", _mask_email(clean_to), smtp_host, smtp_port)
        return True, "smtp-relay", ""
    except Exception as exc:
        logger.error("SMTP delivery failed to %s: %s", _mask_email(clean_to), exc)
        return False, None, f"SMTP delivery failed: {exc}"


# ── Core Send Dispatcher (Brevo API preferred -> SMTP fallback) ───────────────

def _send(
    cfg: dict,
    to_email: str, to_name: str,
    subject: str, html_body: str, text_body: str,
    reply_to_email: str = None, reply_to_name: str = None,
) -> Tuple[bool, Optional[str], str]:
    api_key = cfg.get("api_key", "").strip()
    clean_to = to_email.strip()
    domain = clean_to.split("@")[1] if "@" in clean_to else "unknown"

    # 1. Primary: Brevo Transactional Email HTTP API (no SMTP, port-blocking proof)
    if api_key and not api_key.startswith("your_"):
        payload = {
            "sender": {"name": cfg["from_name"], "email": cfg["from_email"]},
            "to": [{"email": clean_to, "name": to_name.strip()}],
            "subject": subject,
            "htmlContent": html_body,
            "textContent": text_body,
        }
        if reply_to_email:
            payload["replyTo"] = {"email": reply_to_email.strip(), "name": (reply_to_name or reply_to_email).strip()}

        try:
            resp = requests.post(
                BREVO_API_URL,
                json=payload,
                headers={"accept": "application/json", "content-type": "application/json", "api-key": api_key},
                timeout=10,
            )
            data = resp.json() if resp.content else {}
            if resp.status_code in (200, 201):
                msg_id = data.get("messageId", "N/A")
                logger.info("[Brevo API] SUCCESS | Domain: %s | Status: %d | messageId: %s", domain, resp.status_code, msg_id)
                return True, msg_id, ""
            code = data.get("code", "unknown")
            msg = data.get("message", resp.text[:150])
            logger.error("[Brevo API] ERROR | Domain: %s | Status: %d | Code: %s | Message: %s", domain, resp.status_code, code, msg)
            # If Brevo API failed, proceed to SMTP fallback if configured
        except requests.exceptions.Timeout:
            logger.error("[Brevo API] TIMEOUT | Domain: %s", domain)
        except requests.exceptions.RequestException as exc:
            logger.error("[Brevo API] NETWORK ERROR | Domain: %s | Error: %s", domain, str(exc))

    # 2. Secondary: Brevo SMTP / SMTP Relay
    smtp_host = cfg.get("smtp_host", "").strip()
    smtp_pass = cfg.get("smtp_pass", "").strip()
    if smtp_host and smtp_pass:
        return _send_smtp(
            smtp_host=smtp_host,
            smtp_port=cfg.get("smtp_port", 587),
            smtp_user=cfg.get("smtp_user", ""),
            smtp_pass=smtp_pass,
            from_email=cfg["from_email"],
            from_name=cfg["from_name"],
            to_email=clean_to,
            to_name=to_name,
            subject=subject,
            html_body=html_body,
            text_body=text_body,
            reply_to_email=reply_to_email,
            reply_to_name=reply_to_name,
        )

    logger.warning("Email not sent: neither valid Brevo API key nor SMTP credentials are configured.")
    return False, None, "Email service not configured"


# ── Admin Notification ────────────────────────────────────────────────────────

def send_admin_notification(enquiry) -> Tuple[bool, Optional[str], str]:
    c = _cfg()
    if not is_configured():
        logger.warning("Email service not configured — admin notification skipped.")
        return False, None, "Not configured"

    notes_row = f"""<tr><td style="padding:10px 14px;background:#fef3c7;border-top:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#92400e;font-family:Courier,monospace;text-transform:uppercase;width:38%">Buyer Notes</td><td style="padding:10px 14px;border-top:1px solid #e5e7eb;font-size:13px;color:#374151;">{enquiry.message}</td></tr>""" if enquiry.message else ""

    html = f"""<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f4f0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:25px 10px;">
<tr><td align="center">
<table width="100%" style="max-width:620px;background:#fff;border:1px solid #d1dbd1;border-radius:12px;overflow:hidden;">
<tr><td style="background:#112417;padding:30px 20px;border-bottom:4px solid #d4af37;text-align:center;">
<span style="font-size:20px;font-weight:900;letter-spacing:0.12em;color:#fff;text-transform:uppercase;">HARVEST<span style="color:#d4af37;">GATE</span></span>
<div style="font-size:10px;color:#d4af37;letter-spacing:0.22em;text-transform:uppercase;margin-top:3px;">OVERSEAS PVT. LTD.</div>
<div style="font-size:13px;color:#e2e8f0;font-weight:bold;margin-top:12px;">New Commercial Export Enquiry</div>
<div style="margin-top:10px;"><span style="background:#1d3d27;border:1px solid #d4af37;color:#d4af37;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:bold;font-family:Courier,monospace;">REF: {enquiry.ref}</span></div>
</td></tr>
<tr><td style="padding:28px 24px;">
<table width="100%" style="border-collapse:collapse;border:1px solid #d1fae5;border-radius:8px;overflow:hidden;">
<tr style="background:#166534;"><td colspan="2" style="padding:10px 14px;color:#fff;font-size:12px;font-weight:bold;font-family:Courier,monospace;text-transform:uppercase;">&#10003; Trade Enquiry Details</td></tr>
<tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;width:38%">Contact Person</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#111827;">{enquiry.name}</td></tr>
<tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Organisation</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#111827;">{enquiry.orgName}</td></tr>
<tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Business Email</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#047857;"><a href="mailto:{enquiry.email}" style="color:#047857;text-decoration:none;">{enquiry.email}</a></td></tr>
<tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Phone / WhatsApp</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#047857;">{enquiry.contactNumber}</td></tr>
<tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Commodity Required</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:14px;font-weight:800;color:#047857;">{enquiry.product}</td></tr>
<tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Target Volume</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#111827;">{enquiry.quantity}</td></tr>
<tr><td style="padding:10px 14px;background:#f0fdf4;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Delivery Address</td><td style="padding:10px 14px;font-size:13px;font-weight:bold;color:#111827;">{enquiry.orgAddress}</td></tr>
{notes_row}
</table>
<table width="100%" style="margin-top:24px;"><tr><td align="center">
<a href="mailto:{enquiry.email}?subject=Re: Export Enquiry {enquiry.ref}" style="display:inline-block;background:#d4af37;color:#000;text-decoration:none;padding:12px 28px;border-radius:6px;font-weight:bold;font-size:13px;">Reply to Buyer &rarr;</a>
</td></tr></table>
</td></tr>
<tr><td align="center" style="background:#111827;padding:20px;color:#9ca3af;font-size:11px;line-height:1.6;">HarvestGate Overseas Pvt. Ltd. &bull; FSSAI &amp; APEDA Certified</td></tr>
</table></td></tr></table>
</body></html>"""

    text = f"HarvestGate — Export Enquiry {enquiry.ref}\n\nFrom: {enquiry.name} ({enquiry.orgName})\nEmail: {enquiry.email}\nPhone: {enquiry.contactNumber}\nProduct: {enquiry.product}\nQty: {enquiry.quantity}\nAddress: {enquiry.orgAddress}\nNotes: {enquiry.message or 'N/A'}"

    return _send(
        cfg=c,
        to_email=c["admin_email"], to_name="HarvestGate Trade Desk",
        subject=f"[HarvestGate Trade Desk] New Export Enquiry: {enquiry.ref} · {enquiry.orgName} — {enquiry.product}",
        html_body=html, text_body=text,
        reply_to_email=enquiry.email, reply_to_name=enquiry.name,
    )


# ── Buyer Acknowledgement ─────────────────────────────────────────────────────

def send_buyer_acknowledgement(enquiry) -> Tuple[bool, Optional[str], str]:
    c = _cfg()
    if not is_configured():
        logger.warning("Email service not configured — buyer acknowledgement skipped.")
        return False, None, "Not configured"
    if not is_valid_email(enquiry.email):
        logger.warning("Invalid buyer email '%s' — skipping.", _mask_email(enquiry.email))
        return False, None, "Invalid recipient email"

    notes_row = f"""<tr><td style="padding:10px 14px;background:#f0fdf4;border-top:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;width:42%">Additional Notes</td><td style="padding:10px 14px;border-top:1px solid #e5e7eb;font-size:13px;color:#374151;">{enquiry.message}</td></tr>""" if enquiry.message else ""

    html = f"""<!DOCTYPE html><html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Thank You for Your Enquiry — HarvestGate Overseas</title></head>
<body style="margin:0;padding:0;background:#f0f4f0;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:30px 12px;">
<tr><td align="center">
<table width="100%" style="max-width:600px;background:#ffffff;border:1px solid #d1dbd1;border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.07);">

<!-- HEADER -->
<tr><td style="background:linear-gradient(135deg,#0f2015 0%,#1a3d23 100%);padding:36px 28px 28px;border-bottom:4px solid #d4af37;text-align:center;">
<table border="0" cellpadding="0" cellspacing="0" align="center"><tr><td style="border:1.5px solid #d4af37;background:#1d3d27;padding:10px 22px;border-radius:10px;">
<span style="font-size:22px;font-weight:900;letter-spacing:0.14em;color:#ffffff;text-transform:uppercase;font-family:Arial,sans-serif;">HARVEST<span style="color:#d4af37;">GATE</span></span>
<div style="font-size:9.5px;color:#d4af37;letter-spacing:0.28em;text-transform:uppercase;margin-top:3px;font-family:Courier,monospace;">OVERSEAS PVT. LTD.</div>
</td></tr></table>
<div style="margin-top:18px;"><span style="background:#1d3d27;border:1px solid #d4af37;color:#d4af37;padding:5px 18px;border-radius:20px;font-size:11px;font-weight:bold;font-family:Courier,monospace;letter-spacing:0.08em;">REF: {enquiry.ref}</span></div>
<div style="font-size:13px;color:#d1fae5;font-weight:600;margin-top:14px;letter-spacing:0.04em;">Enquiry Received — Export Trade Desk</div>
</td></tr>

<!-- GREETING -->
<tr><td style="padding:32px 28px 0;">
<p style="font-size:17px;font-weight:bold;color:#111827;margin:0 0 10px 0;">Dear {enquiry.name},</p>
<p style="font-size:14px;color:#374151;margin:0 0 18px 0;line-height:1.75;">Thank you for contacting <strong>HarvestGate Overseas</strong>. We have successfully received your export enquiry and appreciate your interest in our premium Indian agricultural products.</p>
<p style="font-size:14px;color:#374151;margin:0 0 24px 0;line-height:1.75;">Our international trade desk will review your requirements — including product availability, specifications, pricing, packaging, and export compliance — and get back to you within <strong>24 business hours</strong>.</p>
</td></tr>

<!-- ENQUIRY SUMMARY -->
<tr><td style="padding:0 28px 24px;">
<p style="font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;letter-spacing:0.18em;margin:0 0 10px 0;">&#10003; Your Enquiry Summary</p>
<table width="100%" style="border-collapse:collapse;background:#f9fafb;border:1px solid #d1fae5;border-radius:10px;overflow:hidden;">
<tr style="background:#166534;"><td colspan="2" style="padding:10px 14px;color:#fff;font-size:11px;font-weight:bold;font-family:Courier,monospace;text-transform:uppercase;">Trade Enquiry Details</td></tr>
<tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;width:42%">Reference ID</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#111827;font-family:Courier,monospace;">{enquiry.ref}</td></tr>
<tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Name</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#374151;">{enquiry.name}</td></tr>
<tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Organisation</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#374151;">{enquiry.orgName}</td></tr>
<tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Email</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#047857;">{enquiry.email}</td></tr>
<tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Contact Number</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#374151;">{enquiry.contactNumber}</td></tr>
<tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Product Required</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:14px;font-weight:800;color:#047857;">{enquiry.product}</td></tr>
<tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Quantity Required</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#374151;">{enquiry.quantity}</td></tr>
<tr><td style="padding:10px 14px;background:#f0fdf4;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Organisation Address</td><td style="padding:10px 14px;font-size:13px;color:#374151;">{enquiry.orgAddress}</td></tr>
{notes_row}
</table>
</td></tr>

<!-- CONTACT BOX -->
<tr><td style="padding:0 28px 28px;">
<p style="font-size:14px;color:#374151;margin:0 0 18px 0;line-height:1.75;">We look forward to exploring a potential business partnership with you and providing you with the finest quality Indian agricultural products for your market.</p>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#fefce8;border:1px solid #fde68a;border-radius:10px;">
<tr><td style="padding:18px 20px;">
<p style="font-size:11px;font-weight:bold;color:#92400e;font-family:Courier,monospace;text-transform:uppercase;letter-spacing:0.14em;margin:0 0 10px 0;">For Immediate Queries</p>
<p style="font-size:13px;color:#374151;margin:0;line-height:2.1;">
&#128222;&nbsp;<a href="https://wa.me/918077078313" style="color:#047857;font-weight:bold;text-decoration:none;">+91 8077078313</a>&nbsp;(Phone / WhatsApp)<br>
&#9993;&nbsp;<a href="mailto:contact@harvestgateoverseas.com" style="color:#047857;font-weight:bold;text-decoration:none;">contact@harvestgateoverseas.com</a><br>
&#127760;&nbsp;<a href="https://www.harvestgateoverseas.com" style="color:#047857;font-weight:bold;text-decoration:none;">www.harvestgateoverseas.com</a>
</p>
</td></tr>
</table>
</td></tr>

<!-- SIGN-OFF -->
<tr><td style="padding:0 28px 32px;">
<p style="font-size:13px;color:#6b7280;margin:0;line-height:1.7;">
Warm regards,<br>
<strong style="color:#111827;font-size:14px;">HarvestGate Overseas Pvt. Ltd.</strong><br>
<span style="font-size:12px;color:#6b7280;">Premium Indian Agricultural Exports<br>FSSAI &amp; APEDA Certified</span>
</p>
</td></tr>

<!-- FOOTER -->
<tr><td align="center" style="background:#111827;padding:20px;color:#9ca3af;font-size:11px;line-height:1.7;border-radius:0 0 14px 14px;">
HarvestGate Overseas Pvt. Ltd. &bull; Mig-14, Kanth Rd, Ashiyana Colony, Moradabad, UP - 244001<br>
This is an automated acknowledgement &mdash; please do not reply to this email directly.<br>
<a href="https://www.harvestgateoverseas.com" style="color:#d4af37;text-decoration:none;">www.harvestgateoverseas.com</a>
</td></tr>

</table>
</td></tr>
</table>
</body></html>"""

    text = f"""Thank You for Your Enquiry — HarvestGate Overseas
====================================================

Dear {enquiry.name},

Thank you for contacting HarvestGate Overseas. We have successfully received
your export enquiry and appreciate your interest in our Indian agricultural products.

Our team will review your requirements and get back to you within 24 business hours.

-- Enquiry Summary --
Reference ID     : {enquiry.ref}
Name             : {enquiry.name}
Organisation     : {enquiry.orgName}
Email            : {enquiry.email}
Contact Number   : {enquiry.contactNumber}
Product Required : {enquiry.product}
Quantity         : {enquiry.quantity}
Address          : {enquiry.orgAddress}
Notes            : {enquiry.message or 'N/A'}

For immediate queries:
  Phone/WhatsApp : +91 8077078313
  Email          : contact@harvestgateoverseas.com
  Website        : https://www.harvestgateoverseas.com

Warm regards,
HarvestGate Overseas Pvt. Ltd.
Premium Indian Agricultural Exports
https://www.harvestgateoverseas.com

---
This is an automated acknowledgement. Please do not reply to this email.
"""

    return _send(
        cfg=c,
        to_email=enquiry.email, to_name=enquiry.name,
        subject="Thank You for Your Enquiry — HarvestGate Overseas",
        html_body=html, text_body=text,
        reply_to_email=c["admin_email"], reply_to_name=c["from_name"],
    )
