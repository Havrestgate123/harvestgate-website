const nodemailer = require("nodemailer");

// Vercel Serverless Function — /api/enquiry
// Sends: 1) Admin notification  2) Buyer acknowledgement
module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const {
    name, orgName, orgAddress, email,
    contactNumber, product, quantity, message,
  } = req.body;

  if (!name || !email || !product) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const ref = `HG-${Date.now().toString().slice(-6)}`;

  // ── SMTP Transporter (Gmail) ──────────────────────────────────────────────
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL || "admin@harvestgateoverseas.com";
  const fromLabel = `HarvestGate Overseas <${process.env.SMTP_USER}>`;

  // ── 1. ADMIN NOTIFICATION EMAIL ───────────────────────────────────────────
  const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Export Enquiry</title></head>
<body style="margin:0;padding:0;background:#f0f4f0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:25px 10px;">
    <tr><td align="center">
      <table width="100%" style="max-width:620px;background:#fff;border:1px solid #d1dbd1;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#112417;padding:30px 20px;border-bottom:4px solid #d4af37;text-align:center;">
          <span style="font-size:20px;font-weight:900;letter-spacing:0.12em;color:#fff;text-transform:uppercase;">HARVEST<span style="color:#d4af37;">GATE</span></span>
          <div style="font-size:10px;color:#d4af37;letter-spacing:0.22em;text-transform:uppercase;margin-top:3px;">OVERSEAS PVT. LTD.</div>
          <div style="font-size:13px;color:#e2e8f0;font-weight:bold;margin-top:12px;">New Commercial Export Enquiry</div>
          <div style="margin-top:10px;"><span style="background:#1d3d27;border:1px solid #d4af37;color:#d4af37;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:bold;font-family:Courier,monospace;">REF: ${ref}</span></div>
        </td></tr>
        <tr><td style="padding:28px 24px;">
          <table width="100%" style="border-collapse:collapse;border:1px solid #d1fae5;border-radius:8px;overflow:hidden;">
            <tr style="background:#166534;"><td colspan="2" style="padding:10px 14px;color:#fff;font-size:12px;font-weight:bold;font-family:Courier,monospace;text-transform:uppercase;">✓ Trade Enquiry Details</td></tr>
            <tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;width:38%">Contact Person</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#111827;">${name}</td></tr>
            <tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Organisation</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#111827;">${orgName}</td></tr>
            <tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Business Email</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#047857;"><a href="mailto:${email}" style="color:#047857;text-decoration:none;">${email}</a></td></tr>
            <tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Phone / WhatsApp</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#047857;">${contactNumber}</td></tr>
            <tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Commodity Required</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:14px;font-weight:800;color:#047857;">${product}</td></tr>
            <tr><td style="padding:10px 14px;background:#f0fdf4;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Target Volume</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#111827;">${quantity}</td></tr>
            <tr><td style="padding:10px 14px;background:#f0fdf4;font-size:12px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Delivery Address</td><td style="padding:10px 14px;font-size:13px;font-weight:bold;color:#111827;">${orgAddress}</td></tr>
            ${message ? `<tr><td style="padding:10px 14px;background:#fef3c7;border-top:1px solid #e5e7eb;font-size:12px;font-weight:bold;color:#92400e;font-family:Courier,monospace;text-transform:uppercase;">Buyer Notes</td><td style="padding:10px 14px;border-top:1px solid #e5e7eb;font-size:13px;color:#374151;">${message}</td></tr>` : ""}
          </table>
          <table width="100%" style="margin-top:24px;"><tr><td align="center">
            <a href="mailto:${email}?subject=Quotation for ${encodeURIComponent(product)} - Ref ${ref}" style="display:inline-block;background:#d4af37;color:#000;text-decoration:none;padding:12px 28px;border-radius:6px;font-weight:bold;font-size:13px;">Reply Directly to Buyer →</a>
          </td></tr></table>
        </td></tr>
        <tr><td align="center" style="background:#111827;padding:20px;color:#9ca3af;font-size:11px;line-height:1.6;">
          HarvestGate Overseas Pvt. Ltd. • Mig-14, Kanth Rd, Ashiyana Colony, Moradabad, UP - 244001<br>
          FSSAI &amp; APEDA Certified Global Agro Export House
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // ── 2. BUYER ACKNOWLEDGEMENT EMAIL ────────────────────────────────────────
  const buyerHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Enquiry Received</title></head>
<body style="margin:0;padding:0;background:#f0f4f0;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f0;padding:25px 10px;">
    <tr><td align="center">
      <table width="100%" style="max-width:600px;background:#fff;border:1px solid #d1dbd1;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#112417;padding:32px 24px;border-bottom:4px solid #d4af37;text-align:center;">
          <span style="font-size:22px;font-weight:900;letter-spacing:0.12em;color:#fff;text-transform:uppercase;">HARVEST<span style="color:#d4af37;">GATE</span></span>
          <div style="font-size:10px;color:#d4af37;letter-spacing:0.22em;text-transform:uppercase;margin-top:4px;">OVERSEAS PVT. LTD.</div>
          <div style="margin-top:14px;"><span style="background:#1d3d27;border:1px solid #d4af37;color:#d4af37;padding:5px 16px;border-radius:20px;font-size:11px;font-weight:bold;font-family:Courier,monospace;">REF: ${ref}</span></div>
        </td></tr>
        <tr><td style="padding:32px 28px;">
          <p style="font-size:16px;font-weight:bold;color:#111827;margin:0 0 8px 0;">Dear ${name},</p>
          <p style="font-size:14px;color:#374151;margin:0 0 20px 0;line-height:1.7;">
            Thank you for reaching out to <strong>HarvestGate Overseas</strong>. We have formally registered your commercial export enquiry and our international trade desk is now reviewing your requirements.
          </p>

          <table width="100%" style="border-collapse:collapse;background:#f0fdf4;border:1px solid #d1fae5;border-radius:8px;margin-bottom:24px;">
            <tr style="background:#166534;"><td colspan="2" style="padding:10px 14px;color:#fff;font-size:11px;font-weight:bold;font-family:Courier,monospace;text-transform:uppercase;">✓ Your Enquiry Summary</td></tr>
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;width:40%">Reference ID</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#111827;font-family:Courier,monospace;">${ref}</td></tr>
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Commodity</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#047857;">${product}</td></tr>
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Quantity</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:13px;font-weight:bold;color:#111827;">${quantity}</td></tr>
            <tr><td style="padding:10px 14px;font-size:11px;font-weight:bold;color:#166534;font-family:Courier,monospace;text-transform:uppercase;">Organisation</td><td style="padding:10px 14px;font-size:13px;font-weight:bold;color:#111827;">${orgName}</td></tr>
          </table>

          <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 20px 0;">
            A dedicated trade manager will connect with you within <strong>24 business hours</strong> with a formal CIF/FOB quotation tailored to your requirements.
          </p>

          <table width="100%" style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:16px;margin-bottom:24px;" cellpadding="0" cellspacing="0">
            <tr><td style="padding:14px;">
              <p style="font-size:11px;font-weight:bold;color:#92400e;font-family:Courier,monospace;text-transform:uppercase;margin:0 0 8px 0;">For Immediate Queries</p>
              <p style="font-size:13px;color:#374151;margin:0;line-height:1.8;">
                📞 Phone / WhatsApp: <a href="https://wa.me/918077078313" style="color:#047857;font-weight:bold;text-decoration:none;">+91 8077078313</a><br>
                ✉️ Email: <a href="mailto:contact@harvestgateoverseas.com" style="color:#047857;font-weight:bold;text-decoration:none;">contact@harvestgateoverseas.com</a>
              </p>
            </td></tr>
          </table>

          <p style="font-size:13px;color:#6b7280;margin:0;line-height:1.6;">
            Warm regards,<br>
            <strong style="color:#111827;">HarvestGate Overseas Pvt. Ltd.</strong><br>
            <span style="font-size:11px;">Global Agricultural Exports | FSSAI &amp; APEDA Certified</span>
          </p>
        </td></tr>
        <tr><td align="center" style="background:#111827;padding:18px;color:#9ca3af;font-size:11px;line-height:1.6;">
          HarvestGate Overseas Pvt. Ltd. • Mig-14, Kanth Rd, Ashiyana Colony, Moradabad, UP - 244001<br>
          This is an automated acknowledgement. Please do not reply directly to this email.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail({
        from: fromLabel,
        to: adminEmail,
        replyTo: `${name} <${email}>`,
        subject: `[HarvestGate Trade Desk] New Export Enquiry: ${ref} · ${orgName} — ${product}`,
        html: adminHtml,
      }),
      transporter.sendMail({
        from: fromLabel,
        to: `${name} <${email}>`,
        replyTo: `HarvestGate Export Desk <${adminEmail}>`,
        subject: `Export Enquiry Received — Ref: ${ref} | HarvestGate Overseas`,
        html: buyerHtml,
      }),
    ]);

    return res.status(200).json({ success: true, ref });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Failed to send email", detail: err.message });
  }
}
