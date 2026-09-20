// api/enquiry.js — Vercel Serverless Function
// Uses Brevo Transactional Email HTTP API (no SMTP, no port-blocking)
// All credentials read from Vercel Environment Variables — never hardcoded

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

// Privacy-safe masked email for diagnostic logging
function maskEmail(email) {
  if (!email || !email.includes("@")) return "invalid-email";
  const [user, domain] = email.split("@");
  const maskedUser = user.length > 2 ? user[0] + "***" + user.slice(-1) : user[0] + "***";
  return `${maskedUser}@${domain} (domain: ${domain})`;
}

async function sendBrevoEmail({ apiKey, fromEmail, fromName, toEmail, toName, subject, html, text, replyToEmail, replyToName }) {
  const cleanToEmail = (toEmail || "").trim();
  const domain = cleanToEmail.includes("@") ? cleanToEmail.split("@")[1] : "unknown";

  const payload = {
    sender: { name: (fromName || "HarvestGate Overseas").trim(), email: (fromEmail || "admin@harvestgateoverseas.com").trim() },
    to: [{ email: cleanToEmail, name: (toName || cleanToEmail).trim() }],
    subject,
    htmlContent: html,
    textContent: text,
  };
  if (replyToEmail) {
    payload.replyTo = { email: replyToEmail.trim(), name: (replyToName || replyToEmail).trim() };
  }

  try {
    const resp = await fetch(BREVO_URL, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json().catch(() => ({}));
    const ok = resp.status === 200 || resp.status === 201;

    if (ok) {
      console.log(`[Brevo API] SUCCESS | Domain: ${domain} | Status: ${resp.status} | messageId: ${data.messageId || "N/A"}`);
      return { ok: true, status: resp.status, messageId: data.messageId || null, error: null };
    } else {
      console.error(`[Brevo API] ERROR | Domain: ${domain} | Status: ${resp.status} | Code: ${data.code || "unknown"} | Message: ${data.message || "Unknown error"}`);
      return { ok: false, status: resp.status, messageId: null, error: data.message || `HTTP ${resp.status}` };
    }
  } catch (err) {
    console.error(`[Brevo API] NETWORK ERROR | Domain: ${domain} | Error: ${err.message}`);
    return { ok: false, status: 0, messageId: null, error: err.message };
  }
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = req.body || {};
  const clientRef    = (body.ref || "").trim();
  const name         = (body.name || "").trim();
  const orgName      = (body.orgName || "").trim();
  const orgAddress   = (body.orgAddress || "").trim();
  const email        = (body.email || "").trim();
  const contactNumber = (body.contactNumber || "").trim();
  const product      = (body.product || "").trim();
  const quantity     = (body.quantity || "").trim();
  const message      = (body.message || "").trim();

  if (!name || !email || !product) {
    return res.status(400).json({ error: "Missing required fields (name, email, product)" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address format" });
  }

  const apiKey = process.env.BREVO_API_KEY || "";
  const ref = clientRef && /^HG-/.test(clientRef) ? clientRef : `HG-${Date.now().toString().slice(-6)}`;

  console.log(`[Enquiry ${ref}] Processing submission for ${maskEmail(email)} | Product: ${product}`);

  if (!apiKey || apiKey.startsWith("your_")) {
    console.warn(`[Enquiry ${ref}] BREVO_API_KEY is not configured in Vercel environment variables.`);
    return res.status(200).json({
      success: true,
      ref,
      email_sent: false,
      buyer_email: { sent: false, error: "Brevo service not configured" },
      admin_email: { sent: false, error: "Brevo service not configured" },
    });
  }

  const fromEmail  = process.env.MAIL_FROM_EMAIL || "admin@harvestgateoverseas.com";
  const fromName   = process.env.MAIL_FROM_NAME  || "HarvestGate Overseas";
  const adminEmail = process.env.MAIL_ADMIN_EMAIL || "admin@harvestgateoverseas.com";

  const notesRow = message
    ? `<tr><td style="padding:10px 14px;background:#fef3c7;border-top:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#92400e;font-family:Courier,monospace;text-transform:uppercase;width:38%">Buyer Notes</td><td style="padding:10px 14px;border-top:1px solid #e5e7eb;font-size:13px;color:#374151;">${message}</td></tr>`
    : "";

  const adminHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f0f4f0;font-family:Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:25px 10px;"><tr><td align="center"><table width="100%" style="max-width:620px;background:#fff;border:1px solid #d1dbd1;border-radius:12px;overflow:hidden;"><tr><td style="background:#112417;padding:30px 20px;border-bottom:4px solid #d4af37;text-align:center;"><span style="font-size:20px;font-weight:900;letter-spacing:0.12em;color:#fff;text-transform:uppercase;">HARVEST<span style="color:#d4af37;">GATE</span></span><div style="font-size:10px;color:#d4af37;letter-spacing:0.22em;text-transform:uppercase;margin-top:3px;">OVERSEAS PVT. LTD.</div><div style="font-size:13px;color:#e2e8f0;font-weight:bold;margin-top:12px;">New Commercial Export Enquiry</div><div style="margin-top:10px;"><span style="background:#1d3d27;border:1px solid #d4af37;color:#d4af37;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:bold;font-family:Courier,monospace;">REF: ${ref}</span></div></td></tr><tr><td style="padding:28px 24px;"><table width="100%" style="border-collapse:collapse;border:1px solid #d1fae5;border-radius:8px;overflow:hidden;"><tr style="background:#166534;"><td colspan="2" style="padding:10px 14px;color:#fff;font-size:12px;font-weight:bold;font-family:Courier,monospace;text-transform:uppercase;">&#10003; Trade Enquiry Details</td></tr><tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;width:38%">Contact Person</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#111827;">${name}</td></tr><tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Organisation</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#111827;">${orgName}</td></tr><tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Business Email</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#047857;"><a href="mailto:${email}" style="color:#047857;text-decoration:none;">${email}</a></td></tr><tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Phone</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#047857;">${contactNumber}</td></tr><tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Commodity</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:14px;font-weight:800;color:#047857;">${product}</td></tr><tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Volume</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#111827;">${quantity}</td></tr><tr><td style="padding:10px 14px;background:#f0fdf4;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Address</td><td style="padding:10px 14px;font-size:13px;font-weight:bold;color:#111827;">${orgAddress}</td></tr>${notesRow}</table><table width="100%" style="margin-top:24px;"><tr><td align="center"><a href="mailto:${email}?subject=Re: Export Enquiry ${ref}" style="display:inline-block;background:#d4af37;color:#000;text-decoration:none;padding:12px 28px;border-radius:6px;font-weight:bold;font-size:13px;">Reply to Buyer &rarr;</a></td></tr></table></td></tr><tr><td align="center" style="background:#111827;padding:20px;color:#9ca3af;font-size:11px;">HarvestGate Overseas Pvt. Ltd. &bull; FSSAI &amp; APEDA Certified</td></tr></table></td></tr></table></body></html>`;

  const buyerHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Thank You - HarvestGate Overseas</title></head><body style="margin:0;padding:0;background:#f0f4f0;font-family:Arial,Helvetica,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:30px 12px;"><tr><td align="center"><table width="100%" style="max-width:600px;background:#fff;border:1px solid #d1dbd1;border-radius:14px;overflow:hidden;"><tr><td style="background:linear-gradient(135deg,#0f2015 0%,#1a3d23 100%);padding:36px 28px;border-bottom:4px solid #d4af37;text-align:center;"><table border="0" cellpadding="0" cellspacing="0" align="center"><tr><td style="border:1.5px solid #d4af37;background:#1d3d27;padding:10px 22px;border-radius:10px;"><span style="font-size:22px;font-weight:900;letter-spacing:0.14em;color:#fff;text-transform:uppercase;font-family:Arial,sans-serif;">HARVEST<span style="color:#d4af37;">GATE</span></span><div style="font-size:9.5px;color:#d4af37;letter-spacing:0.28em;text-transform:uppercase;margin-top:3px;font-family:Courier,monospace;">OVERSEAS PVT. LTD.</div></td></tr></table><div style="margin-top:18px;"><span style="background:#1d3d27;border:1px solid #d4af37;color:#d4af37;padding:5px 18px;border-radius:20px;font-size:11px;font-weight:bold;font-family:Courier,monospace;">REF: ${ref}</span></div><div style="font-size:13px;color:#d1fae5;font-weight:600;margin-top:14px;">Enquiry Received - Export Trade Desk</div></td></tr><tr><td style="padding:32px 28px 0;"><p style="font-size:17px;font-weight:bold;color:#111827;margin:0 0 10px 0;">Dear ${name},</p><p style="font-size:14px;color:#374151;margin:0 0 18px 0;line-height:1.75;">Thank you for contacting <strong>HarvestGate Overseas</strong>. We have successfully received your export enquiry and appreciate your interest in our premium Indian agricultural products.</p><p style="font-size:14px;color:#374151;margin:0 0 24px 0;line-height:1.75;">Our trade desk will review your requirements and get back to you within <strong>24 business hours</strong>.</p></td></tr><tr><td style="padding:0 28px 24px;"><p style="font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;margin:0 0 10px 0;">&#10003; Your Enquiry Summary</p><table width="100%" style="border-collapse:collapse;background:#f9fafb;border:1px solid #d1fae5;border-radius:10px;overflow:hidden;"><tr style="background:#166534;"><td colspan="2" style="padding:10px 14px;color:#fff;font-size:11px;font-weight:bold;font-family:Courier,monospace;text-transform:uppercase;">Trade Enquiry Details</td></tr><tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;width:42%">Reference ID</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#111827;font-family:Courier,monospace;">${ref}</td></tr><tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Name</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#374151;">${name}</td></tr><tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Organisation</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#374151;">${orgName}</td></tr><tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Product Required</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:14px;font-weight:800;color:#047857;">${product}</td></tr><tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Quantity</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#374151;">${quantity}</td></tr><tr><td style="padding:10px 14px;background:#f0fdf4;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Address</td><td style="padding:10px 14px;font-size:13px;color:#374151;">${orgAddress}</td></tr></table></td></tr><tr><td style="padding:0 28px 28px;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#fefce8;border:1px solid #fde68a;border-radius:10px;"><tr><td style="padding:18px 20px;"><p style="font-size:11px;font-weight:bold;color:#92400e;font-family:Courier,monospace;text-transform:uppercase;margin:0 0 10px 0;">For Immediate Queries</p><p style="font-size:13px;color:#374151;margin:0;line-height:2.1;">&#128222;&nbsp;<a href="https://wa.me/918077078313" style="color:#047857;font-weight:bold;text-decoration:none;">+91 8077078313</a>&nbsp;(Phone / WhatsApp)<br>&#9993;&nbsp;<a href="mailto:contact@harvestgateoverseas.com" style="color:#047857;font-weight:bold;text-decoration:none;">contact@harvestgateoverseas.com</a><br>&#127760;&nbsp;<a href="https://www.harvestgateoverseas.com" style="color:#047857;font-weight:bold;text-decoration:none;">www.harvestgateoverseas.com</a></p></td></tr></table></td></tr><tr><td style="padding:0 28px 32px;"><p style="font-size:13px;color:#6b7280;margin:0;line-height:1.7;">Warm regards,<br><strong style="color:#111827;font-size:14px;">HarvestGate Overseas Pvt. Ltd.</strong><br><span style="font-size:12px;color:#6b7280;">Premium Indian Agricultural Exports<br>FSSAI &amp; APEDA Certified</span></p></td></tr><tr><td align="center" style="background:#111827;padding:20px;color:#9ca3af;font-size:11px;line-height:1.7;border-radius:0 0 14px 14px;">HarvestGate Overseas Pvt. Ltd. &bull; Mig-14, Kanth Rd, Ashiyana Colony, Moradabad, UP - 244001<br>Automated acknowledgement &mdash; do not reply directly.<br><a href="https://www.harvestgateoverseas.com" style="color:#d4af37;text-decoration:none;">www.harvestgateoverseas.com</a></td></tr></table></td></tr></table></body></html>`;

  const adminText = `HarvestGate — Export Enquiry ${ref}\n\nFrom: ${name} (${orgName})\nEmail: ${email}\nPhone: ${contactNumber}\nProduct: ${product}\nQty: ${quantity}\nAddress: ${orgAddress}\nNotes: ${message || "N/A"}`;
  const buyerText = `Dear ${name},\n\nThank you for contacting HarvestGate Overseas. We have successfully received your export enquiry (Ref: ${ref}) and appreciate your interest in our Indian agricultural products.\n\nOur trade desk will review your requirements and get back to you within 24 business hours.\n\nEnquiry Summary:\nProduct: ${product}\nQuantity: ${quantity}\nOrganisation: ${orgName}\n\nFor immediate queries: +91 8077078313 | contact@harvestgateoverseas.com\n\nWarm regards,\nHarvestGate Overseas Pvt. Ltd.\nwww.harvestgateoverseas.com`;

  // Dispatch both emails separately to track individual delivery status
  const [adminResult, buyerResult] = await Promise.all([
    sendBrevoEmail({
      apiKey, fromEmail, fromName,
      toEmail: adminEmail, toName: "HarvestGate Trade Desk",
      subject: `[HarvestGate Trade Desk] New Export Enquiry: ${ref} · ${orgName} — ${product}`,
      html: adminHtml, text: adminText,
      replyToEmail: email, replyToName: name,
    }),
    sendBrevoEmail({
      apiKey, fromEmail, fromName,
      toEmail: email, toName: name,
      subject: "Thank You for Your Enquiry — HarvestGate Overseas",
      html: buyerHtml, text: buyerText,
      replyToEmail: adminEmail, replyToName: fromName,
    }),
  ]);

  console.log(`[Enquiry ${ref}] Result | Buyer Email: ${buyerResult.ok ? "DELIVERED (" + buyerResult.messageId + ")" : "FAILED (" + buyerResult.error + ")"} | Admin Email: ${adminResult.ok ? "DELIVERED (" + adminResult.messageId + ")" : "FAILED (" + adminResult.error + ")"}`);

  return res.status(200).json({
    success: true,
    ref,
    email_sent: buyerResult.ok,
    buyer_email: { sent: buyerResult.ok, message_id: buyerResult.messageId, error: buyerResult.error },
    admin_email: { sent: adminResult.ok, message_id: adminResult.messageId, error: adminResult.error },
  });
};
