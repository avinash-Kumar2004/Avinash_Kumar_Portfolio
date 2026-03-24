// server/server.js — Production Ready ✅
import express        from "express";
import cors           from "cors";
import helmet         from "helmet";
import dotenv         from "dotenv";
import rateLimit      from "express-rate-limit";
import subscribeRoute from "./routes/subscribe.js";
import contactRoute   from "./routes/contact.js";
import mongoose       from "mongoose";
import { startKeepAlive } from "./utils/Keepalive.js";
dotenv.config();

/* ── Validate required env vars on startup ── */
const REQUIRED_ENV = [
  "MONGO_URI",
  "RESEND_API_KEY",
  "FROM_EMAIL",
  "FROM_NAME",
  "FRONTEND_URL",
];
REQUIRED_ENV.forEach(key => {
  if (!process.env[key]) {
    console.error(`❌ Missing env variable: ${key}`);
    process.exit(1);
  }
});

/* ── MongoDB Connect ── */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => { console.error("MongoDB Error:", err); process.exit(1); });

const app    = express();
const PORT   = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === "production";

/* ── Trust Proxy (Render ke liye zaroori) ── */
app.set("trust proxy", 1);

/* 1. Helmet */
app.use(helmet({
  contentSecurityPolicy:     false,
  crossOriginEmbedderPolicy: false,
}));

/* 2. CORS */
const allowedOrigins = isProd
  ? [
      "https://avinashkumar.dev",
      "https://www.avinashkumar.dev",
      "https://avinash-kumar-portfolio-zts1.vercel.app",
      "https://avinash-kumar-portfolio.vercel.app",
    ]
  : [
      "http://localhost:5173",
      "http://localhost:3000",
    ];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    console.error("❌ CORS blocked:", origin);
    cb(new Error("Not allowed by CORS"));
  },
  methods:        ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials:    false,
}));

app.options("*", cors());

/* 3. Body parser */
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

/* 4. Global rate limit */
app.use(rateLimit({
  windowMs:        15 * 60 * 1000,
  max:             100,
  standardHeaders: true,
  legacyHeaders:   false,
  message:         { message: "Too many requests. Try again later." },
}));

/* 5. Remove X-Powered-By */
app.disable("x-powered-by");

/* ══════════════════════════════════════
   API ROUTES
══════════════════════════════════════ */
app.use("/api", subscribeRoute);
app.use("/api", contactRoute);

/* Health check — keep-alive bhi isi ko ping karta hai */
app.get("/health", (_req, res) => {
  res.status(200).json({
    status:    "ok",
    env:       process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

/* ══════════════════════════════════════
   ERROR HANDLERS
══════════════════════════════════════ */
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
  console.log(`📧 From:   ${process.env.FROM_EMAIL}`);

  // ✅ Keep-alive start karo — Render ko sleep mat karne do
  startKeepAlive();
});