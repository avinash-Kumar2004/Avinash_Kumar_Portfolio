// subscribe.js — fixed
import express from "express";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import Subscriber from "../models/Subscriber.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

const subscribeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
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

  try {
    // ✅ Fix 2: duplicate check is now inside try/catch
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "You're already subscribed! 🎉" });
    }

    // ✅ Fix 1: save subscriber BEFORE sending emails
    await Subscriber.create({ email });

    // ✅ Fix 3: count AFTER create so the number is accurate
    const totalCount = await Subscriber.countDocuments();

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });
    const FRONTEND = process.env.FRONTEND_URL;

    await sendEmail({
      to: process.env.FROM_EMAIL,
      subject: "🎉 New Blog Subscriber — Portfolio",
      html: `<!-- your existing HTML — no changes needed -->`,
    });

    await sendEmail({
      to: email,
      subject: "✅ You're subscribed to Avinash Kumar's Blog!",
      html: `<!-- your existing HTML — no changes needed -->`,
    });

    return res.status(200).json({ message: "Subscribed successfully!" });

  } catch (error) {
    console.error("❌ Email send error:", error.message);
    return res.status(500).json({
      message: "Could not send email. Please try again later.",
    });
  }
});

export default router;