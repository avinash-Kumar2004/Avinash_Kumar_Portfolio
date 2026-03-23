import { useEffect, useRef, useState } from "react";
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
   COMPETENCIES DATA — add/edit freely
══════════════════════════════════════════ */
const COMPETENCIES = [
  {
    icon: "⚡",
    title: "Full-Stack Web Development",
    subtitle: "MERN Stack",
    desc: "Building end-to-end web applications with MongoDB, Express, React, and Node.js. Focused on clean architecture, performance, and scalability.",
    accent: "#2563eb",
    tags: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    subtitle: "React Native",
    desc: "Building cross-platform mobile apps with React Native and Expo. Delivering smooth UI, real-time features, and native-feel experiences on Android & iOS.",
    accent: "#7c3aed",
    tags: ["React Native", "Expo", "Mobile UI", "Cross-Platform"],
  },
  {
    icon: "🔧",
    title: "Backend & API Development",
    subtitle: "Server & Database",
    desc: "RESTful API design, JWT authentication, Convex real-time data, and efficient database management with MongoDB and PostgreSQL.",
    accent: "#10b981",
    tags: ["REST APIs", "JWT", "Convex", "PostgreSQL"],
  },
  {
    icon: "🎨",
    title: "Frontend & UI Development",
    subtitle: "Design & Interface",
    desc: "Creating responsive, pixel-perfect interfaces with React, Tailwind CSS, and modern design principles. Focus on clean UX and smooth interactions.",
    accent: "#0ea5e9",
    tags: ["React", "Tailwind CSS", "Responsive", "Figma"],
  },
  {
    icon: "🔐",
    title: "Authentication & Security",
    subtitle: "Auth & Access Control",
    desc: "Implementing secure authentication using Clerk and JWT, role-based access control, and best practices for protecting user data.",
    accent: "#f59e0b",
    tags: ["Clerk", "JWT", "RBAC", "Security"],
  },
  {
    icon: "🚀",
    title: "Deployment & Version Control",
    subtitle: "CI/CD & Git",
    desc: "Deploying production-ready apps on Vercel and Netlify, managing codebases with Git & GitHub, and maintaining clean development workflows.",
    accent: "#ef4444",
    tags: ["Vercel", "Netlify", "Git", "GitHub"],
  },
];

/* ══════════════════════════════════════════
   SINGLE COMPETENCY CARD
══════════════════════════════════════════ */
function CompCard({ item, dark, index }) {
  const [ref, inView] = useInView(0.15);

  // Alternate slide direction — left cols from left, right cols from right
  const col = index % 3;
  const initialTransform =
    col === 0 ? "translateX(-50px)" :
    col === 2 ? "translateX(50px)"  :
                "translateY(40px)";
  const delay = (index % 3) * 80 + Math.floor(index / 3) * 60;

  const cardBg     = dark ? "#111827" : "#ffffff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const titleCol   = dark ? "#f1f5f9" : "#0f172a";
  const subCol     = dark ? "#64748b" : "#94a3b8";
  const descCol    = dark ? "#94a3b8" : "#475569";
  const tagBg      = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
  const tagBorder  = dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)";
  const tagText    = dark ? "#94a3b8" : "#64748b";

  return (
    <div
      ref={ref}
      className="group relative flex flex-col rounded-2xl p-7 h-full cursor-default"
      style={{
        background:  cardBg,
        border:      `1.5px solid ${cardBorder}`,
        boxShadow:   dark ? "0 2px 12px rgba(0,0,0,0.35)" : "0 2px 12px rgba(0,0,0,0.05)",
        opacity:   inView ? 1 : 0,
        transform: inView ? "translate(0,0)" : initialTransform,
        transition: `
          opacity   0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
          transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
          border-color 0.25s ease,
          box-shadow   0.25s ease
        `,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = item.accent + "60";
        e.currentTarget.style.boxShadow   = dark
          ? `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px ${item.accent}30`
          : `0 16px 48px rgba(0,0,0,0.1), 0 0 0 1px ${item.accent}25`;
        e.currentTarget.style.transform   = "translateY(-5px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = cardBorder;
        e.currentTarget.style.boxShadow   = dark ? "0 2px 12px rgba(0,0,0,0.35)" : "0 2px 12px rgba(0,0,0,0.05)";
        e.currentTarget.style.transform   = "translate(0,0)";
      }}
    >
      {/* Top glow line on hover */}
      <div
        className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg,transparent,${item.accent},transparent)` }}
      />

      {/* Icon + subtitle row */}
      <div className="flex items-center justify-between mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-[22px] transition-transform duration-300 group-hover:scale-110"
          style={{ background: dark ? `${item.accent}22` : `${item.accent}15` }}
        >
          {item.icon}
        </div>
        <span
          className="comp-font-body text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{
            background: dark ? `${item.accent}20` : `${item.accent}12`,
            color: item.accent,
          }}
        >
          {item.subtitle}
        </span>
      </div>

      {/* Title */}
      <h3
        className="comp-font-display font-bold mb-2"
        style={{ fontSize: "clamp(15px,1.4vw,17px)", color: titleCol, letterSpacing: "-0.01em", transition: "color 0.4s ease" }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p
        className="comp-font-body text-[13.5px] leading-relaxed mb-5 flex-1"
        style={{ color: descCol, transition: "color 0.4s ease" }}
      >
        {item.desc}
      </p>

      {/* Divider */}
      <div style={{ height: "1px", background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", marginBottom: "14px" }} />

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {item.tags.map(tag => (
          <span
            key={tag}
            className="comp-font-body text-[11.5px] font-medium px-2.5 py-1 rounded-lg"
            style={{ background: tagBg, border: `1px solid ${tagBorder}`, color: tagText }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════ */
export default function CoreCompetencies() {
  const { dark } = useTheme();
  const [headerRef, headerInView] = useInView(0.2);

  useEffect(() => {
    if (document.getElementById("comp-styles")) return;
    const s = document.createElement("style");
    s.id = "comp-styles";
    s.textContent = `
      .comp-font-display { font-family: 'Plus Jakarta Sans', sans-serif !important; }
      .comp-font-body    { font-family: 'Outfit', sans-serif !important; }
    `;
    document.head.appendChild(s);
    if (!document.getElementById("comp-fonts")) {
      const l = document.createElement("link");
      l.id = "comp-fonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  const sectionBg  = dark
    ? "linear-gradient(180deg,#0d1117 0%,#0b0b10 100%)"
    : "linear-gradient(180deg,#f0f7ff 0%,#f8fbff 100%)";
  const headingCol = dark ? "#f1f5f9" : "#0f172a";
  const subCol     = dark ? "#64748b" : "#94a3b8";
  const badgeBg    = dark ? "rgba(30,58,138,0.3)"   : "rgba(219,234,254,0.7)";
  const badgeText  = dark ? "#93c5fd"               : "#1d4ed8";
  const badgeBorder= dark ? "rgba(59,130,246,0.25)" : "rgba(147,197,253,0.6)";

  return (
    <section
      className="relative w-full py-20 sm:py-28 overflow-hidden"
      style={{ background: sectionBg, transition: "background 0.4s ease" }}
    >
      {/* Bg glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "700px", height: "300px", borderRadius: "50%", pointerEvents: "none",
        background: dark
          ? "radial-gradient(ellipse,rgba(37,99,235,0.06) 0%,transparent 70%)"
          : "radial-gradient(ellipse,rgba(37,99,235,0.04) 0%,transparent 70%)",
      }} />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ══ HEADER — centered ══ */}
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity:    headerInView ? 1 : 0,
            transform:  headerInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: badgeBg, border: `1px solid ${badgeBorder}` }}>
            <span style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background:"#3b82f6" }} />
            <span className="comp-font-body text-[12.5px] font-semibold tracking-wide" style={{ color: badgeText }}>
              CORE SKILLS
            </span>
          </div>

          <h2
            className="comp-font-display font-bold mb-4"
            style={{ fontSize:"clamp(32px,4vw,48px)", color:headingCol, letterSpacing:"-0.02em", transition:"color 0.4s ease" }}
          >
            Core Competencies
          </h2>

          {/* Centered underline */}
          <div style={{ width:"52px", height:"4px", borderRadius:"2px",
            background:"linear-gradient(90deg,#2563eb,#0ea5e9)", margin:"0 auto 16px" }} />

          <p
            className="comp-font-body text-[16px] max-w-[540px] mx-auto leading-relaxed"
            style={{ color:subCol, transition:"color 0.4s ease" }}
          >
            Key areas of expertise that drive my approach to building
            modern, scalable, and impactful digital products.
          </p>
        </div>

        {/* ══ CARDS GRID — items-stretch for equal height ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {COMPETENCIES.map((item, i) => (
            <CompCard key={i} item={item} dark={dark} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}