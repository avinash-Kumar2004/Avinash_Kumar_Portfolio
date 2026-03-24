// routes/subscribe.js — Production Ready ✅
import express from "express";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import Subscriber from "../models/Subscriber.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

const subscribeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: { message: "Too many attempts. Please try again after an hour." },
  standardHeaders: true,
  legacyHeaders: false,
});

const validateSubscribe = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Please enter a valid email address.")
    .normalizeEmail()
    .isLength({ max: 254 }).withMessage("Email too long."),
];

router.post("/subscribe", subscribeLimiter, validateSubscribe, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const email = req.body.email;
  const FRONTEND = process.env.FRONTEND_URL;

  try {
    // ✅ Duplicate check
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "You're already subscribed! 🎉" });
    }

    // ✅ Save to DB first
    await Subscriber.create({ email });

    const totalCount = await Subscriber.countDocuments();

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    // ✅ Notify yourself — new subscriber alert
    await sendEmail({
      to: process.env.FROM_EMAIL,
      subject: `🎉 New Blog Subscriber — Portfolio`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',sans-serif;">
            <div style="max-width:520px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
              <div style="background:linear-gradient(135deg,#2563eb,#10b981);padding:24px 32px;text-align:center;">
                <h2 style="margin:0;color:#fff;font-size:20px;font-weight:800;">🎉 New Subscriber!</h2>
              </div>
              <div style="padding:28px 32px;">
                <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
                  <tr>
                    <td style="padding:10px 14px;background:#f8fafc;border-radius:8px 8px 0 0;border:1px solid #e2e8f0;border-bottom:none;">
                      <span style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Email</span><br/>
                      <span style="font-size:15px;font-weight:700;color:#0f172a;">${email}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 14px;background:#f8fafc;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;border-top:none;">
                      <span style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Subscribed At</span><br/>
                      <span style="font-size:13px;color:#64748b;">${timestamp} IST</span>
                    </td>
                  </tr>
                </table>
                <div style="background:linear-gradient(135deg,#f0fdf4,#ecfeff);border:1.5px solid #a7f3d0;border-radius:12px;padding:16px 20px;text-align:center;">
                  <p style="margin:0;font-size:24px;font-weight:800;color:#0f172a;">🎯 ${totalCount}</p>
                  <p style="margin:4px 0 0;font-size:13px;color:#64748b;font-weight:600;">Total Subscribers</p>
                </div>
              </div>
              <div style="background:#f8fafc;padding:14px 32px;text-align:center;border-top:1px solid #e2e8f0;">
                <p style="margin:0;color:#94a3b8;font-size:12px;">Portfolio Blog — Avinash Kumar</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // ✅ Welcome email to subscriber
    await sendEmail({
      to: email,
      subject: `✅ You're subscribed to Avinash Kumar's Blog!`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',sans-serif;">
            <div style="max-width:520px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
              <div style="background:linear-gradient(135deg,#2563eb,#0ea5e9,#10b981);padding:28px 32px;text-align:center;">
                <h2 style="margin:0;color:#fff;font-size:22px;font-weight:800;">You're Subscribed! 🎉</h2>
                <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Welcome to my blog newsletter</p>
              </div>
              <div style="padding:28px 32px;">
                <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
                  Hey there! 👋
                </p>
                <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.7;">
                  Thanks for subscribing! You'll now receive updates whenever I publish new articles about
                  <strong style="color:#2563eb;">React</strong>,
                  <strong style="color:#10b981;">Node.js</strong>,
                  <strong style="color:#7c3aed;">mobile development</strong>, and the latest in tech.
                </p>
                <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-left:4px solid #2563eb;border-radius:8px;padding:14px 18px;margin-bottom:24px;">
                  <p style="margin:0;font-size:13.5px;color:#475569;line-height:1.6;">
                    📌 New articles are published regularly.<br/>
                    🔔 You'll get notified when something new drops.<br/>
                    🚫 Unsubscribe anytime — no spam, ever.
                  </p>
                </div>
                <div style="text-align:center;margin-bottom:12px;">
                  <a href="${FRONTEND}/blog"
                     style="display:inline-block;background:linear-gradient(135deg,#2563eb,#3b82f6);color:#fff;padding:13px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;">
                    📖 Read Latest Articles →
                  </a>
                </div>
                <div style="text-align:center;">
                  <a href="${FRONTEND}/projects"
                     style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#0ea5e9);color:#fff;padding:13px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;">
                    🚀 View My Projects →
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

    return res.status(200).json({ message: "Subscribed successfully!" });

  } catch (error) {
    console.error("❌ Subscribe error:", error.message);
    return res.status(500).json({ message: "Could not process subscription. Please try again later." });
  }
});

export default router;