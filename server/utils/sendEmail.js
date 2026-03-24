// utils/sendEmail.js — Using Resend (works perfectly on Render free tier) ✅
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email via Resend
 * @param {Object} opts
 * @param {string}  opts.to      — recipient address
 * @param {string}  opts.subject — email subject
 * @param {string}  opts.html    — HTML body
 * @param {string} [opts.replyTo]— optional reply-to address
 */
export const sendEmail = async ({ to, subject, html, replyTo }) => {
  const { data, error } = await resend.emails.send({
    from:  `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
    ...(replyTo && { replyTo }),
  });

  if (error) {
    console.error("❌ Resend error:", error);
    throw new Error(error.message);
  }

  console.log(`📧 Email sent → ${to} | id: ${data.id}`);
  return data;
};