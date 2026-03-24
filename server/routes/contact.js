// routes/contact.js — Production Ready ✅
import express from "express";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import Contact from "../models/Contact.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { message: "Too many messages sent. Please try again after an hour." },
  standardHeaders: true,
  legacyHeaders: false,
});

const validateContact = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required.")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be 2-100 characters."),
  body("email")
    .trim()
    .isEmail().withMessage("Valid email required.")
    .normalizeEmail()
    .isLength({ max: 254 }).withMessage("Email too long."),
  body("subject")
    .trim()
    .notEmpty().withMessage("Subject is required.")
    .isLength({ min: 3, max: 200 }).withMessage("Subject must be 3-200 characters."),
  body("message")
    .trim()
    .notEmpty().withMessage("Message is required.")
    .isLength({ min: 10, max: 2000 }).withMessage("Message must be 10-2000 characters."),
];

router.post("/contact", contactLimiter, validateContact, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { name, email, subject, message } = req.body;
  const FRONTEND = process.env.FRONTEND_URL;

  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  try {
    // ✅ Step 1: Save to DB first (so we don't lose data if email fails)
    await Contact.create({ name, email, subject, message });

    // ✅ Step 2: Notify yourself
    await sendEmail({
      to: process.env.FROM_EMAIL,
      subject: `📩 New Contact: ${subject}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',sans-serif;">
            <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
              <div style="background:linear-gradient(135deg,#2563eb,#0ea5e9);padding:24px 32px;text-align:center;">
                <h2 style="margin:0;color:#fff;font-size:20px;font-weight:800;">📩 New Contact Message</h2>
              </div>
              <div style="padding:28px 32px;">
                <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
                  <tr>
                    <td style="padding:10px 14px;background:#f8fafc;border-radius:8px 8px 0 0;border:1px solid #e2e8f0;border-bottom:none;">
                      <span style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">From</span><br/>
                      <span style="font-size:15px;font-weight:700;color:#0f172a;">${name}</span>
                      <span style="font-size:13px;color:#64748b;"> &lt;${email}&gt;</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-top:none;border-bottom:none;">
                      <span style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Subject</span><br/>
                      <span style="font-size:15px;font-weight:600;color:#0f172a;">${subject}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 14px;background:#f8fafc;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;border-top:none;">
                      <span style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Received</span><br/>
                      <span style="font-size:13px;color:#64748b;">${timestamp} IST</span>
                    </td>
                  </tr>
                </table>
                <div>
                  <p style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;margin:0 0 8px;">Message</p>
                  <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-left:4px solid #2563eb;border-radius:8px;padding:16px 18px;">
                    <p style="margin:0;font-size:15px;color:#334155;line-height:1.75;white-space:pre-wrap;">${message}</p>
                  </div>
                </div>
                <div style="text-align:center;margin-top:24px;">
                  <a href="mailto:${email}?subject=Re: ${subject}"
                     style="display:inline-block;background:linear-gradient(135deg,#2563eb,#3b82f6);color:#fff;padding:12px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;">
                    Reply to ${name} →
                  </a>
                </div>
              </div>
              <div style="background:#f8fafc;padding:14px 32px;text-align:center;border-top:1px solid #e2e8f0;">
                <p style="margin:0;color:#94a3b8;font-size:12px;">Portfolio Contact Form — Avinash Kumar</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // ✅ Step 3: Confirmation to sender
    await sendEmail({
      to: email,
      subject: `✅ Message received — Avinash Kumar`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',sans-serif;">
            <div style="max-width:520px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
              <div style="background:linear-gradient(135deg,#2563eb,#0ea5e9);padding:28px 32px;text-align:center;">
                <h2 style="margin:0;color:#fff;font-size:22px;font-weight:800;">Message Received! ✅</h2>
                <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">I'll get back to you within 24 hours</p>
              </div>
              <div style="padding:28px 32px;">
                <p style="margin:0 0 14px;color:#475569;font-size:15px;line-height:1.7;">
                  Hi <strong style="color:#0f172a;">${name}</strong>! 👋
                </p>
                <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.7;">
                  Thanks for reaching out! I've received your message about
                  <strong style="color:#2563eb;">"${subject}"</strong>
                  and will respond as soon as possible.
                </p>
                <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
                  <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Your Message</p>
                  <p style="margin:0;font-size:14px;color:#475569;line-height:1.6;white-space:pre-wrap;">
                    ${message.length > 200 ? message.substring(0, 200) + "..." : message}
                  </p>
                </div>
                <div style="text-align:center;margin-bottom:12px;">
                  <a href="${FRONTEND}/projects"
                     style="display:inline-block;background:linear-gradient(135deg,#2563eb,#3b82f6);color:#fff;padding:13px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;">
                    🚀 View My Projects →
                  </a>
                </div>
                <div style="text-align:center;">
                  <a href="${FRONTEND}/blog"
                     style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#0ea5e9);color:#fff;padding:13px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;">
                    📖 Read My Blog →
                  </a>
                </div>
              </div>
              <div style="background:#f8fafc;padding:16px 32px;text-align:center;border-top:1px solid #e2e8f0;">
                <p style="margin:0 0 4px;color:#64748b;font-size:13px;font-weight:600;">Avinash Kumar</p>
                <p style="margin:0;color:#94a3b8;font-size:12px;">Full Stack Developer</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return res.status(200).json({ message: "Message sent successfully!" });

  } catch (error) {
    console.error("❌ Contact error:", error.message);
    // DB save already happened, so data is safe. Email failed — inform user.
    return res.status(500).json({ message: "Could not send email. Please try again later." });
  }
});

export default router;