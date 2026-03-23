// server/server.js — Production Ready ✅
import express        from "express";
import cors           from "cors";
import helmet         from "helmet";
import dotenv         from "dotenv";
import rateLimit      from "express-rate-limit";
import path           from "path";
import { fileURLToPath } from "url";
import subscribeRoute from "./routes/subscribe.js";
import contactRoute   from "./routes/contact.js";
import mongoose from "mongoose";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/* ── Validate required env vars on startup ── */
const REQUIRED_ENV = ["SMTP_HOST","SMTP_PORT","SMTP_USER","SMTP_PASS","FROM_NAME","FROM_EMAIL","MONGO_URI"];
REQUIRED_ENV.forEach(key => {
  if (!process.env[key]) {
    console.error(`❌ Missing env variable: ${key}`);
    process.exit(1);
  }
});
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => { console.error("❌ MongoDB Error:", err); process.exit(1); });
const app  = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === "production";

/* ══════════════════════════════════════
   SECURITY MIDDLEWARE
══════════════════════════════════════ */

/* 1. Helmet — secure HTTP headers */
app.use(helmet({
  contentSecurityPolicy: false, // React app ke liye disable
  crossOriginEmbedderPolicy: false,
}));

/* 2. CORS
   - Production: sirf tumhara domain
   - Development: localhost bhi allow
══════════════════════════════════════ */
const allowedOrigins = isProd
  ? [
      "https://avinashkumar.dev",
      "https://www.avinashkumar.dev",
     "https://avinash-kumar-portfolio-zts1.vercel.app",  // ← add karo

    ]
  : [
      "http://localhost:5173",
      "http://localhost:3000",
    ];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

/* 3. Body parser with size limit */
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

/* 4. Global rate limit */
app.use(rateLimit({
  windowMs:  15 * 60 * 1000,
  max:       100,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { message: "Too many requests. Try again later." },
}));

/* 5. Remove X-Powered-By */
app.disable("x-powered-by");

/* ══════════════════════════════════════
   API ROUTES
══════════════════════════════════════ */
app.use("/api", subscribeRoute);
app.use("/api", contactRoute);

/* Health check */
app.get("/health", (_req, res) => {
  res.status(200).json({
    status:    "ok",
    env:       process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.use((err, _req, res, _next) => {
  console.error("🔴 Server error:", err.message);
  res.status(500).json({ message: "Internal server error." });
});

/* ══════════════════════════════════════
   START SERVER
══════════════════════════════════════ */
app.listen(PORT, () => {
  console.log(`✅ Server: http://localhost:${PORT}`);
  console.log(`🌍 Mode:   ${process.env.NODE_ENV || "development"}`);
  console.log(`📧 Email:  ${process.env.FROM_EMAIL}`);
});