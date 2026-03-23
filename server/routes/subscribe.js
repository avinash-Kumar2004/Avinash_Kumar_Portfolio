// server/routes/subscribe.js — Production Ready ✅
import express      from "express";
import nodemailer   from "nodemailer";
import rateLimit    from "express-rate-limit";
import { body, validationResult } from "express-validator";
import validator    from "validator";
import Subscriber   from "../models/Subscriber.js";

const router = express.Router();

/* ══════════════════════════════════════
   RATE LIMIT — Max 3 subscribe attempts
   per IP per hour (prevents spam)
══════════════════════════════════════ */
const subscribeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { message: "Too many attempts. Please try again after an hour." },
  standardHeaders: true,
  legacyHeaders: false,
});

/* ══════════════════════════════════════
   INPUT VALIDATION RULES
══════════════════════════════════════ */
const validateSubscribe = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Please enter a valid email address.")
    .normalizeEmail()
    .isLength({ max: 254 }).withMessage("Email too long."),
];

/* ══════════════════════════════════════
   CREATE TRANSPORTER (reuse connection)
══════════════════════════════════════ */
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      tls: {
        rejectUnauthorized: true,
      },
    });
  }
  return transporter;
};

/* ══════════════════════════════════════
   POST /api/subscribe
══════════════════════════════════════ */
router.post(
  "/subscribe",
  subscribeLimiter,
  validateSubscribe,
  async (req, res) => {

    /* ── Validation errors check ── */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const email = req.body.email.toLowerCase().trim();

    /* ── Extra safety check ── */
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    /* ── MongoDB Duplicate Check ── */
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "You're already subscribed! 🎉" });
    }

    try {
      const mailer = getTransporter();

      /* ── Verify SMTP connection ── */
      await mailer.verify();

      const timestamp = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "full",
        timeStyle: "short",
      });

      /* ══ Email 1 — Notification to YOU ══ */
      await mailer.sendMail({
        from:    `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
        to:      process.env.SMTP_USER,
        subject: "🎉 New Blog Subscriber — Portfolio",
        html: `
          <!DOCTYPE html>
          <html lang="en">
            <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',sans-serif;">
              <div style="max-width:520px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                <div style="background:linear-gradient(135deg,#2563eb,#0ea5e9);padding:28px 32px;text-align:center;">
                  <h2 style="margin:0;color:#fff;font-size:22px;font-weight:800;">🎉 New Subscriber!</h2>
                </div>
                <div style="padding:28px 32px;">
                  <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.6;">
                    Someone just subscribed to your blog newsletter:
                  </p>
                  <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:10px;padding:16px 20px;margin-bottom:16px;">
                    <p style="margin:0;font-size:16px;font-weight:700;color:#0f172a;">📧 ${email}</p>
                  </div>
                  <p style="margin:0;color:#94a3b8;font-size:13px;">🕐 ${timestamp} IST</p>
                  <p style="margin:8px 0 0;color:#94a3b8;font-size:13px;">
                    Total subscribers: ${await Subscriber.countDocuments() + 1}
                  </p>
                </div>
                <div style="background:#f8fafc;padding:16px 32px;text-align:center;border-top:1px solid #e2e8f0;">
                  <p style="margin:0;color:#94a3b8;font-size:12px;">Portfolio — avinashkumar.dev</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      /* ══ Email 2 — Confirmation to SUBSCRIBER ══ */
      await mailer.sendMail({
        from:    `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
        to:      email,
        subject: "✅ You're subscribed to Avinash Kumar's Blog!",
        html: `
          <!DOCTYPE html>
          <html lang="en">
            <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',sans-serif;">
              <div style="max-width:520px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                <div style="background:linear-gradient(135deg,#2563eb,#0ea5e9);padding:28px 32px;text-align:center;">
                  <h2 style="margin:0;color:#fff;font-size:22px;font-weight:800;">Welcome Aboard! 🚀</h2>
                  <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">
                    You're subscribed to Avinash Kumar's Blog
                  </p>
                </div>
                <div style="padding:28px 32px;">
                  <p style="margin:0 0 14px;color:#475569;font-size:15px;line-height:1.7;">
                    Hey there! 👋 Thanks for subscribing.
                  </p>
                  <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.7;">
                    I'll notify you when I publish new articles about
                    <strong style="color:#2563eb;">React</strong>,
                    <strong style="color:#10b981;">Node.js</strong>,
                    <strong style="color:#7c3aed;">React Native</strong>,
                    and the latest in tech.
                  </p>
                  <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px;">
                    ${["Frontend","Backend","React Native","New Technology"].map(t =>
                      `<span style="background:#eff6ff;color:#2563eb;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;display:inline-block;margin:2px;">${t}</span>`
                    ).join("")}
                  </div>
                  <div style="text-align:center;margin-bottom:8px;">
                    <a href="${process.env.FRONTEND_URL || "https://avinashkumar.dev"}/blog"
                       style="display:inline-block;background:linear-gradient(135deg,#2563eb,#3b82f6);color:#fff;padding:13px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;">
                      Read Latest Articles →
                    </a>
                  </div>
                </div>
                <div style="background:#f8fafc;padding:16px 32px;text-align:center;border-top:1px solid #e2e8f0;">
                  <p style="margin:0 0 4px;color:#64748b;font-size:13px;font-weight:600;">Avinash Kumar</p>
                  <p style="margin:0;color:#94a3b8;font-size:12px;">Full Stack Developer at Adore Simtrak</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      /* ── Save to MongoDB AFTER emails sent ── */
      await Subscriber.create({ email });

      return res.status(200).json({ message: "Subscribed successfully!" });

    } catch (error) {
      console.error("❌ Email send error:", error.message);
      return res.status(500).json({
        message: "Could not send email. Please try again later.",
      });
    }
  }
);

export default router;