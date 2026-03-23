import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../App";

/* ── useInView ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ══════════════════════════════════════════
   TECH STACK DATA
   img: use devicons CDN — always works
══════════════════════════════════════════ */
const TECHS = [
  { name: "React",       img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",          bg: "#20232a" },
  { name: "Node.js",     img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",        bg: "#1a2a1a" },
  { name: "JavaScript",  img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",bg: "#2a2510" },
  { name: "TypeScript",  img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",bg: "#0d2137" },
  { name: "Express",     img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",      bg: "#1e1e1e" },
  { name: "MongoDB",     img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",      bg: "#0d2213" },
  { name: "PostgreSQL",  img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",bg: "#0d1a2a" },
  { name: "React Native",img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",          bg: "#1a2535" },
  { name: "Tailwind",    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", bg: "#0d2030" },
  { name: "Python",      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",        bg: "#1a1a2a" },
  { name: "Git",         img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",              bg: "#2a1510" },
  { name: "GitHub",      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",        bg: "#1a1a1a" },
  { name: "Docker",      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",        bg: "#0d1e30" },
  { name: "AWS",         img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", bg: "#1a1208" },
  { name: "Figma",       img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",          bg: "#1e1520" },
  { name: "Redux",       img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",          bg: "#1a1030" },
];

/* ── Single Tech Icon Card ── */
function TechCard({ tech, index, inView, dark }) {
  const [hovered, setHovered] = useState(false);

  const cardBg        = hovered
    ? (dark ? "rgba(255,255,255,0.1)"  : "rgba(37,99,235,0.07)")
    : (dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)");
  const cardBorder    = hovered
    ? (dark ? "rgba(255,255,255,0.2)"  : "rgba(37,99,235,0.35)")
    : (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)");
  const nameColor     = hovered
    ? (dark ? "#e2e8f0" : "#0f172a")
    : (dark ? "#94a3b8" : "#64748b");
  const cardShadow    = hovered
    ? (dark ? "0 8px 28px rgba(0,0,0,0.5)" : "0 8px 24px rgba(37,99,235,0.12)")
    : (dark ? "none" : "0 1px 4px rgba(0,0,0,0.05)");

  const delay = index * 45;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:   cardBg,
        border:       `1.5px solid ${cardBorder}`,
        borderRadius: "14px",
        padding:      "18px 10px 14px",
        display:      "flex",
        flexDirection:"column",
        alignItems:   "center",
        gap:          "10px",
        cursor:       "default",
        opacity:      inView ? 1 : 0,
        transform:    inView
          ? (hovered ? "translateY(-4px) scale(1.04)" : "translateY(0) scale(1)")
          : "translateY(20px)",
        transition: `
          opacity   0.5s ease ${delay}ms,
          transform 0.5s ease ${delay}ms,
          background 0.2s ease,
          border-color 0.2s ease,
          box-shadow 0.2s ease
        `,
        boxShadow: cardShadow,
      }}
    >
      {/* Icon */}
      <div style={{
        width: "44px", height: "44px",
        borderRadius: "10px",
        background: tech.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "8px",
      }}>
        <img
          src={tech.img}
          alt={tech.name}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onError={e => { e.target.style.display = "none"; }}
        />
      </div>

      {/* Name */}
      <span style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "11.5px",
        fontWeight: 500,
        color: nameColor,
        textAlign: "center",
        lineHeight: 1.2,
        transition: "color 0.2s ease",
      }}>
        {tech.name}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════ */
export default function TechStack() {
  const { dark } = useTheme();
  const [leftRef,  leftInView]  = useInView(0.15);
  const [rightRef, rightInView] = useInView(0.1);

  useEffect(() => {
    if (document.getElementById("tech-styles")) return;
    const s = document.createElement("style");
    s.id = "tech-styles";
    s.textContent = `
      .tech-font-display { font-family: 'Plus Jakarta Sans', sans-serif !important; }
      .tech-font-body    { font-family: 'Outfit', sans-serif !important; }
      @keyframes techDotPulse {
        0%,100% { opacity:1; transform:scale(1); }
        50%      { opacity:0.4; transform:scale(1.5); }
      }
      .tech-dot { animation: techDotPulse 2s ease-in-out infinite; }
    `;
    document.head.appendChild(s);
    if (!document.getElementById("tech-fonts")) {
      const l = document.createElement("link");
      l.id = "tech-fonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  /* ✅ Proper dark/light mode */
  const sectionBg = dark
    ? "linear-gradient(135deg,#0b0f1a 0%,#0d1117 50%,#0a0e18 100%)"
    : "linear-gradient(135deg,#f0f7ff 0%,#f8fbff 50%,#eef6ff 100%)";

  /* Arrow icons */
  const ArrowRight = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );

  return (
    <section
      className="relative w-full py-20 sm:py-28 overflow-hidden"
      style={{ background: sectionBg, transition: "background 0.4s ease" }}
    >
      {/* Dot pattern overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(circle,${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} 1px,transparent 1px)`,
        backgroundSize: "28px 28px",
      }} />

      {/* Glow blobs */}
      <div style={{
        position:"absolute", top:"-10%", left:"-5%",
        width:"500px", height:"500px", borderRadius:"50%", pointerEvents:"none",
        background:"radial-gradient(circle,rgba(37,99,235,0.12) 0%,transparent 65%)",
      }} />
      <div style={{
        position:"absolute", bottom:"-10%", right:"5%",
        width:"400px", height:"400px", borderRadius:"50%", pointerEvents:"none",
        background:"radial-gradient(circle,rgba(14,165,233,0.08) 0%,transparent 65%)",
      }} />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row items-start gap-14 lg:gap-20">

          {/* ══ LEFT — slides from left ══ */}
          <div
            ref={leftRef}
            className="w-full lg:w-[38%] flex-shrink-0 lg:sticky lg:top-28"
            style={{
              opacity:    leftInView ? 1 : 0,
              transform:  leftInView ? "translateX(0)" : "translateX(-70px)",
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6"
              style={{
                background: dark ? "rgba(37,99,235,0.15)" : "rgba(219,234,254,0.8)",
                border: `1px solid ${dark ? "rgba(59,130,246,0.3)" : "rgba(147,197,253,0.7)"}`,
              }}>
              <span className="tech-dot" style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#3b82f6" }} />
              <span className="tech-font-body text-[11.5px] font-semibold tracking-widest uppercase"
                style={{ color: dark ? "#93c5fd" : "#1d4ed8" }}>
                Technologes We Used
              </span>
            </div>

            {/* Heading */}
            <h2
              className="tech-font-display font-bold mb-5 leading-tight"
              style={{
                fontSize:"clamp(28px,3.5vw,42px)", letterSpacing:"-0.02em",
                color: dark ? "#ffffff" : "#0f172a",
                transition: "color 0.4s ease",
              }}
            >
              Technologies &<br />Tools I Use
            </h2>

            {/* Desc */}
            <p
              className="tech-font-body leading-relaxed mb-8"
              style={{
                fontSize:"clamp(14px,1.4vw,16px)",
                color: dark ? "rgba(148,163,184,0.9)" : "#475569",
                maxWidth:"360px",
                transition: "color 0.4s ease",
              }}
            >
             I build scalable, production-ready web and mobile solutions — from frontend and backend development to databases and deployment.
            </p>

            {/* Stats row */}
            <div className="flex gap-6 mb-10">
              {[
                { num: "15+", label: "Technologies" },
                { num: "6+",  label: "Month Exp." },
                { num: "5+",  label: "Projects" },
              ].map(s => (
                <div key={s.label}>
                  <div className="tech-font-display font-bold" style={{ fontSize:"24px", color: dark ? "#ffffff" : "#0f172a", transition:"color 0.4s ease" }}>{s.num}</div>
                  <div className="tech-font-body text-[12px]" style={{ color: dark ? "#64748b" : "#94a3b8", transition:"color 0.4s ease" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="tech-font-body inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-[14px] no-underline text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-xl active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                  boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
                }}
              >
                Contact Me <ArrowRight />
              </Link>
              <Link
                to="/projects"
                className="tech-font-body inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-[14px] no-underline transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.9)",
                  border: `1.5px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(203,213,225,0.9)"}`,
                  color: dark ? "#e2e8f0" : "#334155",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = dark ? "rgba(255,255,255,0.13)" : "rgba(241,245,249,1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = dark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.9)";
                }}
              >
                View Projects <ArrowRight />
              </Link>
            </div>
          </div>

          {/* ══ RIGHT — icon grid, slides from right ══ */}
          <div
            ref={rightRef}
            className="flex-1 w-full"
            style={{
              opacity:    rightInView ? 1 : 0,
              transform:  rightInView ? "translateX(0)" : "translateX(70px)",
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s",
            }}
          >
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))" }}
            >
              {TECHS.map((tech, i) => (
                <TechCard key={tech.name} tech={tech} index={i} inView={rightInView} dark={dark} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}