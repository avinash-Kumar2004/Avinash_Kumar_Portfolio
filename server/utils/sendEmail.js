// utils/sendEmail.js — Production Ready (Render compatible)
import nodemailer from "nodemailer";

// Create transporter ONCE (reuse across requests)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,          // smtp.gmail.com
  port: Number(process.env.SMTP_PORT),  // 587  ← KEY FIX (465 is blocked on Render free tier)
  secure: false,                         // false for 587 (STARTTLS), true only for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,         // Gmail App Password (16 chars, no spaces)
  },
  tls: {
    rejectUnauthorized: true,            // Always verify TLS in production
  },
  connectionTimeout: 10000,             // 10s connect timeout
  greetingTimeout:   8000,              // 8s greeting timeout
  socketTimeout:     15000,             // 15s socket timeout
});

// Verify connection on startup (optional but helpful for debugging)
if (process.env.NODE_ENV !== "test") {
  transporter.verify((err) => {
    if (err) {
      console.error("❌ SMTP connection failed:", err.message);
    } else {
      console.log("✅ SMTP ready — emails can be sent");
    }
  });
}

/**
 * Send an email
 * @param {Object} opts
 * @param {string}  opts.to      — recipient address
 * @param {string}  opts.subject — email subject
 * @param {string}  opts.html    — HTML body
 * @param {string} [opts.replyTo]— optional reply-to address
 */
export const sendEmail = async ({ to, subject, html, replyTo }) => {
  const info = await transporter.sendMail({
    from:    `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
    ...(replyTo && { replyTo }),
  });
  console.log(`📧 Email sent → ${to} | msgId: ${info.messageId}`);
  return info;
};