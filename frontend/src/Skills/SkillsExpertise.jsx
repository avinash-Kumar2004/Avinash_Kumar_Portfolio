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
   SKILLS DATA
══════════════════════════════════════════ */
const SKILLS = [
  {
    icon: "</>",
    iconBg: "linear-gradient(135deg,#2563eb,#0ea5e9)",
    title: "Full-Stack Development",
    accent: "#2563eb",
    items: [
      "MERN Stack (MongoDB, Express.js, React, Node.js)",
      "React Native & Expo Mobile Apps",
      "RESTful API Development & Integration",
      "TypeScript & Modern JavaScript (ES6+)",
      "Responsive Web & Mobile Design",
      "State Management with Redux & Context API",
    ],
  },
  {
    icon: "◈",
    iconBg: "linear-gradient(135deg,#7c3aed,#ec4899)",
    title: "Database & Backend",
    accent: "#7c3aed",
    items: [
      "MongoDB & Mongoose ODM",
      "PostgreSQL & SQL Databases",
      "JWT Authentication & Role-Based Access Control",
      "RESTful & Scalable Backend APIs",
      "Data Modelling & Schema Design",
      "Node.js & Express Server Architecture",
    ],
  },
  {
    icon: "☁",
    iconBg: "linear-gradient(135deg,#10b981,#0ea5e9)",
    title: "Tools & Deployment",
    accent: "#10b981",
    items: [
      "Git & GitHub Version Control",
      "Tailwind CSS & Modern Styling",
      "Expo Go & Mobile App Testing",
      "Vercel & Netlify Cloud Deployment",
      "Docker Basics & Containerization",
      "Postman & API Testing",
    ],
  },
  {
    icon: "⚙",
    iconBg: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    title: "Technical Leadership",
    accent: "#6366f1",
    items: [
      "Team Building & Mentorship",
      "Code Review & Quality Assurance",
      "Technical Documentation",
      "Cross-functional Collaboration",
      "Performance Optimization",
      
    ],
  },
  {
    icon: "💡",
    iconBg: "linear-gradient(135deg,#f59e0b,#f97316)",
    title: "Innovation & Strategy",
    accent: "#f59e0b",
    items: [
      "Problem Solving & Critical Thinking",
      "Strategic Technology Planning",
      "Process Improvement & Automation",
      "Technology Research & Exploration",
      "Business Strategy Alignment",
      "Continuous Learning & Upskilling",
    ],
  },
];

/* ── Dot icon ── */
const Dot = ({ color }) => (
  <span style={{
    display: "inline-block",
    width: "6px", height: "6px",
    borderRadius: "50%",
    background: color,
    flexShrink: 0,
    marginTop: "7px",
  }} />
);

/* ── Single Skill Card ── */
function SkillCard({ skill, dark, index }) {
  const [ref, inView] = useInView(0.12);
  const [hovered, setHovered] = useState(false);

  const col = index % 3;
  const delay = col * 100;
  const initialTransform =
    col === 0 ? "translateX(-55px)" :
    col === 2 ? "translateX(55px)"  : "translateY(45px)";

  /* ── Theme colors ── */
  const cardBg     = dark
    ? (hovered ? "#1a2235" : "#131b2e")
    : (hovered ? "#ffffff" : "#f8fafc");
  const cardBorder = hovered
    ? `${skill.accent}60`
    : (dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)");
  const titleCol   = dark ? "#f1f5f9"  : "#0f172a";
  const itemCol    = dark ? "#94a3b8"  : "#475569";
  const divCol     = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)";
  const shadowHov  = dark
    ? `0 20px 56px rgba(0,0,0,0.55), 0 0 0 1px ${skill.accent}33`
    : `0 20px 56px rgba(0,0,0,0.1), 0 0 0 1px ${skill.accent}25`;
  const shadowDef  = dark
    ? "0 4px 20px rgba(0,0,0,0.4)"
    : "0 4px 20px rgba(0,0,0,0.06)";

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:   cardBg,
        border:       `1.5px solid ${cardBorder}`,
        borderRadius: "20px",
        padding:      "32px 28px",
        height:       "100%",
        display:      "flex",
        flexDirection:"column",
        cursor:       "default",
        boxShadow:    hovered ? shadowHov : shadowDef,
        /* Scroll animation */
        opacity:   inView ? 1 : 0,
        transform: inView
          ? (hovered ? "translateY(-6px)" : "translate(0,0)")
          : initialTransform,
        transition: `
          opacity   0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
          transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
          background   0.3s ease,
          border-color 0.3s ease,
          box-shadow   0.3s ease
        `,
      }}
    >
      {/* Top accent line on hover */}
      <div style={{
        height: "3px",
        borderRadius: "0 0 3px 3px",
        background: `linear-gradient(90deg,transparent,${skill.accent},transparent)`,
        position: "absolute",
        top: 0, left: "24px", right: "24px",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        marginTop: 0,
      }} />

      {/* Icon */}
      <div style={{
        width: "52px", height: "52px",
        borderRadius: "14px",
        background: skill.iconBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "22px", fontWeight: 800,
        color: "#ffffff",
        fontFamily: "monospace",
        marginBottom: "20px",
        boxShadow: `0 6px 20px ${skill.accent}40`,
        transform: hovered ? "scale(1.08) rotate(-3deg)" : "scale(1)",
        transition: "transform 0.3s ease",
        flexShrink: 0,
      }}>
        {skill.icon}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans',sans-serif",
        fontSize: "clamp(17px,1.6vw,19px)",
        fontWeight: 800,
        color: titleCol,
        letterSpacing: "-0.01em",
        marginBottom: "16px",
        transition: "color 0.3s ease",
      }}>
        {skill.title}
      </h3>

      {/* Divider */}
      <div style={{
        height: "1px",
        background: divCol,
        marginBottom: "18px",
        transition: "background 0.3s ease",
      }} />

      {/* Skills list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
        {skill.items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <Dot color={skill.accent} />
            <span style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "15px",
              lineHeight: 1.75,
              color: itemCol,
              transition: "color 0.3s ease",
            }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════ */
export default function SkillsExpertise() {
  const { dark } = useTheme();
  const [headerRef, headerInView] = useInView(0.2);

  useEffect(() => {
    if (document.getElementById("skills-exp-styles")) return;
    const s = document.createElement("style");
    s.id = "skills-exp-styles";
    s.textContent = `
      .se-font-display { font-family:'Plus Jakarta Sans',sans-serif !important; }
      .se-font-body    { font-family:'Outfit',sans-serif !important; }
    `;
    document.head.appendChild(s);
    if (!document.getElementById("se-fonts")) {
      const l = document.createElement("link");
      l.id = "se-fonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  /* ── Section background — properly different for dark/light ── */
  const sectionBg = dark
    ? "linear-gradient(180deg,#0b0f1a 0%,#0d1117 100%)"
    : "linear-gradient(180deg,#f0f7ff 0%,#f8fbff 100%)";

  const headingCol = dark ? "#f1f5f9" : "#0f172a";
  const subCol     = dark ? "#64748b" : "#64748b";
  const badgeBg    = dark ? "rgba(30,58,138,0.3)"    : "rgba(219,234,254,0.8)";
  const badgeText  = dark ? "#93c5fd"                : "#1d4ed8";
  const badgeBorder= dark ? "rgba(59,130,246,0.25)"  : "rgba(147,197,253,0.6)";

  return (
    <section
      className="relative w-full py-20 sm:py-28 overflow-hidden"
      style={{ background: sectionBg, transition: "background 0.4s ease" }}
    >
      {/* Bg glow — light is subtle, dark is more visible */}
      <div style={{
        position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)",
        width: "800px", height: "400px", borderRadius: "50%", pointerEvents: "none",
        background: dark
          ? "radial-gradient(ellipse,rgba(37,99,235,0.08) 0%,transparent 65%)"
          : "radial-gradient(ellipse,rgba(37,99,235,0.05) 0%,transparent 65%)",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "5%",
        width: "300px", height: "300px", borderRadius: "50%", pointerEvents: "none",
        background: dark
          ? "radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)"
          : "radial-gradient(circle,rgba(124,58,237,0.04) 0%,transparent 70%)",
      }} />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ══ HEADER ══ */}
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity:    headerInView ? 1 : 0,
            transform:  headerInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: badgeBg, border: `1px solid ${badgeBorder}` }}>
            <span style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background:"#3b82f6" }} />
            <span className="se-font-body text-[12.5px] font-semibold tracking-wide"
              style={{ color: badgeText }}>
              SKILLS & EXPERTISE
            </span>
          </div>

          <h2
            className="se-font-display font-bold mb-4"
            style={{
              fontSize: "clamp(32px,4vw,52px)",
              color: headingCol,
              letterSpacing: "-0.02em",
              transition: "color 0.4s ease",
            }}
          >
            Skills & Expertise
          </h2>

          <div style={{
            width: "52px", height: "4px", borderRadius: "2px",
            background: "linear-gradient(90deg,#2563eb,#0ea5e9)",
            margin: "0 auto 16px",
          }} />

          <p
            className="se-font-body text-[16px] max-w-[560px] mx-auto leading-relaxed"
            style={{ color: subCol, transition: "color 0.4s ease" }}
          >
            A comprehensive overview of my technical skills and the
            technologies I use to build scalable, production-ready applications.
          </p>
        </div>

        {/* ══ CARDS — top row 3, bottom row 2 centered ══ */}
        {/* Top 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mb-6">
          {SKILLS.slice(0, 3).map((skill, i) => (
            <div key={skill.title} style={{ position: "relative" }}>
              <SkillCard skill={skill} dark={dark} index={i} />
            </div>
          ))}
        </div>
        {/* Bottom 2 — centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch lg:w-2/3 lg:mx-auto">
          {SKILLS.slice(3).map((skill, i) => (
            <div key={skill.title} style={{ position: "relative" }}>
              <SkillCard skill={skill} dark={dark} index={i + 3} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}  