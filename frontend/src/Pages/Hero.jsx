import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../App";

/* ── Google Fonts ── */
function injectFont() {
  if (document.getElementById("hero-fonts")) return;
  const l = document.createElement("link");
  l.id = "hero-fonts";
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap";
  document.head.appendChild(l);
}

/* ── Typing roles ── */
const ROLES = [
  "Full Stack Developer",
  "React Developer",
  "Node.js Developer",
  "MERN Developer",
  "PERN Developer",
];

/* ── Icons ── */
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

export default function Hero() {
  /* ✅ Read dark from shared context */
  const { dark } = useTheme();

  const [roleIdx, setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting]   = useState(false);

  injectFont();

  useEffect(() => {
    if (document.getElementById("hero-styles")) return;
    const s = document.createElement("style");
    s.id = "hero-styles";
    s.textContent = `
      .hero-font-display { font-family: 'Plus Jakarta Sans', sans-serif !important; }
      .hero-font-body    { font-family: 'Outfit', sans-serif !important; }
      @keyframes heroFadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes heroFloat {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-10px); }
      }
      @keyframes heroPulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.6; transform: scale(1.4); }
      }
      @keyframes cursorBlink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0; }
      }
      .hero-fade-1 { animation: heroFadeUp 0.6s ease forwards; opacity: 0; animation-delay: 0.1s; }
      .hero-fade-2 { animation: heroFadeUp 0.6s ease forwards; opacity: 0; animation-delay: 0.25s; }
      .hero-fade-3 { animation: heroFadeUp 0.6s ease forwards; opacity: 0; animation-delay: 0.4s; }
      .hero-fade-4 { animation: heroFadeUp 0.6s ease forwards; opacity: 0; animation-delay: 0.55s; }
      .hero-fade-5 { animation: heroFadeUp 0.6s ease forwards; opacity: 0; animation-delay: 0.7s; }
      .hero-fade-6 { animation: heroFadeUp 0.6s ease forwards; opacity: 0; animation-delay: 0.85s; }
      .hero-photo  { animation: heroFloat 4s ease-in-out infinite; }
      .hero-dot    { animation: heroPulse 2s ease-in-out infinite; }
      .hero-cursor { animation: cursorBlink 1s step-end infinite; }
    `;
    document.head.appendChild(s);
  }, []);

  /* Typewriter */
  useEffect(() => {
    const current = ROLES[roleIdx];
    let t;
    if (!deleting && displayed.length < current.length)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    else if (!deleting && displayed.length === current.length)
      t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    else { setDeleting(false); setRoleIdx(i => (i + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx]);

  /* ── Dynamic colors based on dark mode ── */
  const bg = dark
    ? "linear-gradient(135deg, #0b0b10 0%, #0f1624 40%, #0b1220 70%, #090e1a 100%)"
    : "linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 40%, #f5faff 70%, #eef6ff 100%)";

  const blobTop = dark
    ? "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)"
    : "radial-gradient(circle, rgba(147,210,255,0.35) 0%, transparent 70%)";

  const blobBot = dark
    ? "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)"
    : "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)";

  const badgeBg    = dark ? "rgba(30,58,138,0.5)"  : "rgba(219,234,254,0.7)";
  const badgeBorder= dark ? "rgba(59,130,246,0.35)" : "rgba(147,197,253,0.6)";
  const badgeText  = dark ? "#93c5fd" : "#1d4ed8";

  const headingCol = dark ? "#f1f5f9" : "#0f172a";
  const descCol    = dark ? "#94a3b8" : "#64748b";

  const btn2Bg     = dark ? "rgba(15,23,42,0.8)"   : "rgba(255,255,255,0.8)";
  const btn2Border = dark ? "rgba(71,85,105,0.8)"  : "rgba(203,213,225,0.9)";
  const btn2Text   = dark ? "#cbd5e1" : "#334155";

  const iconBg     = dark ? "rgba(15,23,42,0.7)"   : "rgba(255,255,255,0.7)";
  const iconBorder = dark ? "rgba(51,65,85,0.7)"   : "rgba(203,213,225,0.7)";
  const iconColor  = dark ? "#94a3b8" : "#64748b";

  const dividerCol = dark ? "rgba(51,65,85,0.8)"  : "rgba(203,213,225,0.8)";
  const cvColor    = dark ? "#94a3b8" : "#475569";

  const photoBg    = dark
    ? "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0369a1 100%)"
    : "linear-gradient(135deg, #93c5fd 0%, #bfdbfe 50%, #e0f2fe 100%)";
  const photoShadow= dark
    ? "0 20px 60px rgba(37,99,235,0.3), 0 0 0 1px rgba(59,130,246,0.2)"
    : "0 20px 60px rgba(37,99,235,0.18), 0 0 0 1px rgba(147,197,253,0.3)";
  const photoInner = dark ? "#1e293b" : "#e2e8f0";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-[60px]"
      style={{ background: bg, transition: "background 0.4s ease" }}
    >
      {/* Background blobs */}
      <div style={{
        position: "absolute", top: "-80px", right: "10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: blobTop, pointerEvents: "none",
        transition: "background 0.4s ease",
      }} />
      <div style={{
        position: "absolute", bottom: "-60px", left: "5%",
        width: "350px", height: "350px", borderRadius: "50%",
        background: blobBot, pointerEvents: "none",
        transition: "background 0.4s ease",
      }} />

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">

          {/* LEFT */}
          <div className="flex-1 max-w-[620px]">

            {/* Badge */}
            <div className="hero-fade-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: badgeBg, border: `1px solid ${badgeBorder}`, backdropFilter: "blur(8px)", transition: "all 0.4s ease" }}>
              <span className="hero-dot" style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }} />
              <span className="hero-font-body text-[13.5px] font-medium" style={{ color: badgeText, transition: "color 0.4s ease" }}>
                Full Stack Developer at Adore Simtrak
              </span>
            </div>

            {/* Hi I'm Avinash */}
            <div className="hero-fade-2 mb-3">
              <h1 className="hero-font-display leading-[1.1]" style={{ color: headingCol, transition: "color 0.4s ease" }}>
                <span style={{ fontSize: "clamp(40px, 5vw, 62px)", fontWeight: 800, display: "block" }}>
                  Hi, I'm Avinash
                </span>
              </h1>
            </div>

            {/* Typewriter */}
            <div className="hero-fade-3 mb-6">
              <div className="hero-font-display leading-[1.1]"
                style={{ fontSize: "clamp(32px, 4.5vw, 55px)", fontWeight: 800 }}>
                <span style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {displayed}
                </span>
                <span className="hero-cursor" style={{
                  display: "inline-block", width: "3px", height: "0.85em",
                  background: "#2563eb", marginLeft: "4px",
                  verticalAlign: "middle", borderRadius: "2px",
                }} />
              </div>
            </div>

            {/* Description */}
            <p className="hero-fade-4 hero-font-body leading-relaxed mb-10"
              style={{ fontSize: "clamp(15px, 1.5vw, 17px)", maxWidth: "520px", color: descCol, transition: "color 0.4s ease" }}>
              I build scalable, high-impact digital solutions that combine
              innovation, business strategy, and technology execution.
            </p>

            {/* Buttons */}
            <div className="hero-fade-5 flex flex-wrap items-center gap-3 mb-10">
              <Link to="/projects"
                className="hero-font-body inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-[15px] no-underline transition-all duration-200 hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)", boxShadow: "0 4px 20px rgba(37,99,235,0.35)" }}>
                View My Work <ArrowRightIcon />
              </Link>
              <Link to="/contact"
                className="hero-font-body inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[15px] no-underline transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{ background: btn2Bg, border: `1.5px solid ${btn2Border}`, backdropFilter: "blur(8px)", color: btn2Text, transition: "all 0.4s ease" }}>
                Contact Me <MailIcon />
              </Link>
            </div>

            {/* Social + CV */}
            <div className="hero-fade-6 flex items-center gap-4">
              <a href="https://github.com/avinash-Kumar2004" target="_blank" rel="noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl no-underline transition-all duration-200 hover:scale-110"
                style={{ background: iconBg, border: `1.5px solid ${iconBorder}`, color: iconColor, transition: "all 0.4s ease" }}
                onMouseEnter={e => e.currentTarget.style.color = "#2563eb"}
                onMouseLeave={e => e.currentTarget.style.color = iconColor}>
                <GithubIcon />
              </a>
              <a href="https://www.linkedin.com/in/avinash-kumar-a226932a4" target="_blank" rel="noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl no-underline transition-all duration-200 hover:scale-110"
                style={{ background: iconBg, border: `1.5px solid ${iconBorder}`, color: iconColor, transition: "all 0.4s ease" }}
                onMouseEnter={e => e.currentTarget.style.color = "#2563eb"}
                onMouseLeave={e => e.currentTarget.style.color = iconColor}>
                <LinkedinIcon />
              </a>

              <div style={{ width: "1px", height: "28px", background: dividerCol, transition: "background 0.4s ease" }} />

              <a href="/Avinash_Kumar_CV.pdf" download="Avinash_Kumar_CV.pdf"
                className="hero-font-body inline-flex items-center gap-2 text-[14px] font-medium no-underline transition-all duration-200 hover:text-blue-500"
                style={{ color: cvColor, transition: "color 0.4s ease" }}>
                <DownloadIcon />
                Download CV
              </a>
            </div>
          </div>

          {/* RIGHT — Photo */}
          <div className="flex-shrink-0 hero-photo lg:ml-16">
            <div style={{
              width: "clamp(260px, 28vw, 380px)",
              height: "clamp(260px, 28vw, 380px)",
              borderRadius: "50%",
              padding: "6px",
              background: photoBg,
              boxShadow: photoShadow,
              transition: "all 0.4s ease",
            }}>
              <div style={{
                width: "100%", height: "100%", borderRadius: "50%",
                overflow: "hidden", background: photoInner,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.4s ease",
              }}>
                <img
                  src="/assets/profile1.png"
                  alt="Avinash Kumar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback */}
                <div style={{
                  display: "none", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  width: "100%", height: "100%",
                  background: dark
                    ? "linear-gradient(135deg, #1e3a8a, #1e40af)"
                    : "linear-gradient(135deg, #dbeafe, #bfdbfe)",
                  fontSize: "64px", fontWeight: 800,
                  color: dark ? "#93c5fd" : "#2563eb",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  AK
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}