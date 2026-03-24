import cron from "node-cron";
import https from "https";

const RENDER_URL = process.env.RENDER_URL; // e.g. https://avinash-kumar-portfolio.onrender.com

export function startKeepAlive() {
  if (!RENDER_URL) {
    console.warn("⚠️  RENDER_URL not set — keep-alive disabled");
    return;
  }

  // Har 10 minute mein ping
  cron.schedule("*/10 * * * *", () => {
    https.get(`${RENDER_URL}/health`, (res) => {
      console.log(`🏓 Keep-alive ping → ${res.statusCode}`);
    }).on("error", (err) => {
      console.error("❌ Keep-alive ping failed:", err.message);
    });
  });

  console.log("✅ Keep-alive started — pinging every 10 minutes");
}