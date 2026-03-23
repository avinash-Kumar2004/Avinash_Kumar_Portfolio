import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../App";

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
   TECH PILLS DATA
══════════════════════════════════════════ */
const TECHS = [
  { name: "React",         category: "Frontend",  img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js",       category: "Backend",   img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express",       category: "Backend",   img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "React Native",  category: "Mobile",    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "MongoDB",       category: "Database",  img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL",    category: "Database",  img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "TypeScript",    category: "Language",  img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript",    category: "Language",  img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Tailwind CSS",  category: "Styling",   img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Git",           category: "Tools",     img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub",        category: "Tools",     img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Vercel",        category: "Deploy",    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
  { name: "Netlify",       category: "Deploy",    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" },
  { name: "Redux",         category: "Frontend",  img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
  { name: "Convex",        category: "Database",  img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Clerk",         category: "Auth",      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Figma",         category: "Design",    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Postman",       category: "Tools",     img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
];

/* Category accent colors */
const CAT_COLORS = {
  Frontend: "#2563eb",
  Backend:  "#10b981",
  Mobile:   "#7c3aed",
  Database: "#0ea5e9",
  Language: "#f59e0b",
  Styling:  "#06b6d4",
  Tools:    "#6366f1",
  Deploy:   "#ef4444",
  Auth:     "#8b5cf6",
  Design:   "#ec4899",
};

/* ── Single Pill ── */
function TechPill({ tech, dark, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const delay = (index % 6) * 55;
  const accent = CAT_COLORS[tech.category] || "#2563eb";

  const pillBg     = hovered
    ? (dark ? `${accent}22` : `${accent}14`)
    : (dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)");
  const pillBorder = hovered
    ? `${accent}70`
    : (dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)");
  const nameCol    = dark ? (hovered ? "#f1f5f9" : "#e2e8f0") : (hovered ? "#0f172a" : "#1e293b");
  const catCol     = hovered ? accent : (dark ? "#64748b" : "#94a3b8");

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            "8px",
        padding:        "8px 16px 8px 10px",
        borderRadius:   "50px",
        background:     pillBg,
        border:         `1.5px solid ${pillBorder}`,
        cursor:         "default",
        opacity:        inView ? 1 : 0,
        transform:      inView
          ? (hovered ? "translateY(-2px) scale(1.03)" : "translateY(0)")
          : "translateY(16px)",
        transition: `
          opacity   0.5s ease ${delay}ms,
          transform 0.5s ease ${delay}ms,
          background   0.2s ease,
          border-color 0.2s ease,
          box-shadow   0.2s ease
        `,
        boxShadow: hovered
          ? (dark ? `0 6px 20px rgba(0,0,0,0.4), 0 0 0 1px ${accent}30` : `0 6px 20px rgba(0,0,0,0.1), 0 0 0 1px ${accent}25`)
          : "none",
        whiteSpace: "nowrap",
      }}
    >
      {/* Icon */}
      <div style={{
        width: "24px", height: "24px",
        borderRadius: "6px",
        background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "3px", flexShrink: 0,
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
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "13.5px",
        fontWeight: 700,
        color: nameCol,
        transition: "color 0.2s ease",
      }}>
        {tech.name}
      </span>

      {/* Dot separator */}
      <span style={{ color: dark ? "#334155" : "#cbd5e1", fontSize: "10px" }}>•</span>

      {/* Category */}
      <span style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "11.5px",
        fontWeight: 500,
        color: catCol,
        transition: "color 0.2s ease",
      }}>
        {tech.category}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════ */
export default function TechStack() {
  const { dark } = useTheme();
  const [headerRef, headerInView] = useInView(0.2);
  const [pillsRef,  pillsInView]  = useInView(0.1);

  useEffect(() => {
    if (document.getElementById("tech-styles")) return;
    const s = document.createElement("style");
    s.id = "tech-styles";
    s.textContent = `
      .tech-font-display { font-family:'Plus Jakarta Sans',sans-serif !important; }
      .tech-font-body    { font-family:'Outfit',sans-serif !important; }
      @keyframes techDotPulse {
        0%,100% { opacity:1; transform:scale(1); }
        50%      { opacity:0.4; transform:scale(1.6); }
      }
      .tech-dot { animation: techDotPulse 2s ease-in-out infinite; }
    `;
    document.head.appendChild(s);
    if (!document.getElementById("tech-fonts")) {
      const l = document.createElement("link");
      l.id = "tech-fonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  const sectionBg  = dark
    ? "linear-gradient(180deg,#0d1117 0%,#0b0b10 100%)"
    : "linear-gradient(180deg,#f8fbff 0%,#f0f7ff 100%)";
  const headingCol = dark ? "#f1f5f9" : "#0f172a";
  const subCol     = dark ? "#64748b" : "#64748b";
  const badgeBg    = dark ? "rgba(30,58,138,0.3)"   : "rgba(219,234,254,0.8)";
  const badgeText  = dark ? "#93c5fd"               : "#1d4ed8";
  const badgeBorder= dark ? "rgba(59,130,246,0.25)" : "rgba(147,197,253,0.6)";

  return (
    <section
      className="relative w-full py-20 sm:py-28 overflow-hidden"
      style={{ background: sectionBg, transition: "background 0.4s ease" }}
    >
      {/* Bg glow */}
      <div style={{
        position:"absolute", top:"10%", left:"50%", transform:"translateX(-50%)",
        width:"700px", height:"350px", borderRadius:"50%", pointerEvents:"none",
        background: dark
          ? "radial-gradient(ellipse,rgba(37,99,235,0.07) 0%,transparent 65%)"
          : "radial-gradient(ellipse,rgba(37,99,235,0.05) 0%,transparent 65%)",
      }} />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ══ HEADER ══ */}
        <div
          ref={headerRef}
          className="text-center mb-14"
          style={{
            opacity:    headerInView ? 1 : 0,
            transform:  headerInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: badgeBg, border:`1px solid ${badgeBorder}` }}>
            <span className="tech-dot" style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background:"#3b82f6" }} />
            <span className="tech-font-body text-[12.5px] font-semibold tracking-wide" style={{ color: badgeText }}>
              MY TECH STACK
            </span>
          </div>

          <h2
            className="tech-font-display font-bold mb-4"
            style={{ fontSize:"clamp(30px,4vw,48px)", color:headingCol, letterSpacing:"-0.02em", transition:"color 0.4s ease" }}
          >
            Technologies & Tools
          </h2>

          <div style={{ width:"52px", height:"4px", borderRadius:"2px",
            background:"linear-gradient(90deg,#2563eb,#0ea5e9)", margin:"0 auto 14px" }} />

          <p className="tech-font-body text-[15.5px] max-w-[480px] mx-auto leading-relaxed"
            style={{ color:subCol, transition:"color 0.4s ease" }}>
            Tools and technologies I use daily to build scalable,
            production-ready web and mobile applications.
          </p>
        </div>

        {/* ══ PILLS — centered wrapping flex ══ */}
        <div
          ref={pillsRef}
          style={{
            display:        "flex",
            flexWrap:       "wrap",
            justifyContent: "center",
            gap:            "12px",
            opacity:    pillsInView ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          {TECHS.map((tech, i) => (
            <TechPill
              key={tech.name}
              tech={tech}
              dark={dark}
              index={i}
              inView={pillsInView}
            />
          ))}
        </div>

        {/* ══ BOTTOM CTA ══ */}
        <div
          className="text-center mt-14 flex flex-wrap justify-center gap-3"
          style={{
            opacity:    pillsInView ? 1 : 0,
            transform:  pillsInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
          }}
        >
          <Link
            to="/contact"
            className="tech-font-body inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[14px] no-underline text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-xl active:scale-[0.97]"
            style={{ background:"linear-gradient(135deg,#2563eb,#3b82f6)", boxShadow:"0 4px 18px rgba(37,99,235,0.35)" }}
          >
            Work With Me →
          </Link>
          <Link
            to="/projects"
            className="tech-font-body inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[14px] no-underline transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
            style={{
              background: dark ? "rgba(255,255,255,0.07)" : "#ffffff",
              border: `1.5px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
              color: dark ? "#e2e8f0" : "#1e293b",
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#2563eb"}
            onMouseLeave={e => e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}
          >
            View Projects →
          </Link>
        </div>

      </div>
    </section>
  );
}