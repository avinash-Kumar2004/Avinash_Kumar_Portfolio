import { useEffect, useRef, useState } from "react";
import { useTheme } from "../App";

/* ── useInView hook — replays every time ── */
function useInView(threshold = 0.3) {
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
   TIMELINE DATA
══════════════════════════════════════════ */
const TIMELINE = [
  {
    year: "2026 – Present",
    role: "Full Stack Developer",
    company: "Adore Simtrak",
    type: "Full-Time",
    desc: "Building and maintaining scalable full-stack web applications using React, Node.js, and MongoDB. Responsible for REST API design, authentication systems, and delivering smooth user experiences.",
    tags: ["React", "Node.js", "MongoDB", "REST APIs"],
    accent: "#2563eb",
  },
  {
    year: "2025",
    role: "MERN Stack Intern",
    company: "Zidio Development",
    type: "Full-Time",
    desc: "Developing full-stack applications with REST APIs, authentication systems, and efficient data handling using modern technologies like React and Node.js.",
    tags: ["React", "JavaScript", "Tailwind CSS"],
    accent: "#0ea5e9",
  },
  {
    year: "2023",
    role: "Full Stack Developer (Self-Learning)",
    company: "Self-Initiated Projects",
    type: "Learning",
    desc: "Worked on multiple full-stack projects using the MERN stack, focusing on building responsive user interfaces and scalable backend systems. Gained hands-on experience in REST API development, JWT authentication, state management, and deploying applications on cloud platforms.",
    tags: ["MongoDB", "Express", "React", "Node.js", "JWT", "Redux"],
    accent: "#7c3aed",
  },
  {
    year: "2023 - Present",
    role: "Bachelor of Computer Applications (BCA)",
    company: "Glocal University",
    type: "Education",
    desc: "Currently pursuing a Bachelor of Computer Applications, focusing on software development, data structures, and modern web technologies. Actively building projects and gaining hands-on experience in full-stack development alongside academic learning.",
    tags: ["BCA", "Programming", "Web Development", "Data Structures"],
    accent: "#06b6d4",
  },
  {
    year: "Up to 2023",
    role: "Senior Secondary (12th) - Science Stream",
    company: "PT. Salagram Jr. High School",
    type: "Education",
    desc: "Completed 12th grade with a focus on Science, gaining foundational knowledge in Mathematics, Physics, Chemistry, and Computer Science.",
    tags: ["12th", "Science", "Mathematics", "Physics", "Chemistry"],
    accent: "#0ff8e1",
  },
];

/* ══════════════════════════════════════════
   EXTRA CURRICULAR DATA
   ✅ Sirf yahan add karo — card automatically ban jaayega
══════════════════════════════════════════ */
const EXTRACURRICULAR = [
  {
    icon: "🏆",
    title: "Hackathon Participant",
    org: "College Tech Fest",
    year: "2024",
    desc: "Participated in a 24-hour hackathon and built a full-stack solution for a real-world problem.",
    accent: "#f59e0b",
  },
  {
    icon: "💡",
    title: "Open Source Contributor",
    org: "GitHub",
    year: "2024",
    desc: "Actively contributing to open source projects, fixing bugs and adding features to community libraries.",
    accent: "#10b981",
  },
  {
    icon: "🎨",
    title: "Graphic Designer",
    org: "Udayan Care IT Center",
    year: "2025",
    desc: "Designed digital graphics and promotional materials for community initiatives and IT Center events.",
    accent: "#6366f1",
  },
  {
    icon: "🖥️",
    title: "ITES Computer Course",
    org: "Nirmaan Organisation",
    year: "2024",
    desc: "Completed an ITES computer course covering office tools, basic programming, and IT fundamentals.",
    accent: "#f97316",
  },
  {
    icon: "💻",
    title: "DEO Course",
    org: "Udayan Care IT Center",
    year: "2023",
    desc: "Learned data entry operations and office software skills, gaining hands-on experience in administrative tasks.",
    accent: "#14b8a6",
  },
];

/* ══════════════════════════════════════════
   SINGLE TIMELINE CARD
══════════════════════════════════════════ */
function TimelineCard({ item, index, dark }) {
  const [cardRef, inView] = useInView(0.3);
  const isLeft = index % 2 === 0;

  const cardBg     = dark ? "#111827" : "#ffffff";
  const cardBorder = inView
    ? (dark ? `${item.accent}55` : `${item.accent}40`)
    : (dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)");
  const titleCol   = dark ? "#f1f5f9" : "#0f172a";
  const companyCol = dark ? "#64748b" : "#94a3b8";
  const descCol    = dark ? "#94a3b8" : "#475569";
  const tagBg      = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const tagBorder  = dark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.1)";
  const tagText    = dark ? "#94a3b8" : "#64748b";
  const typeBg     = dark ? `${item.accent}25` : `${item.accent}15`;

  return (
    <div
      ref={cardRef}
      className={`relative flex w-full flex-col lg:flex-row items-center lg:items-start gap-0
        ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
    >
      {/* Card */}
      <div className={`w-full lg:w-[45%] ${isLeft ? "lg:pr-10" : "lg:pl-10"}`}>
        <div style={{
          background:   cardBg,
          border:       `1.5px solid ${cardBorder}`,
          borderRadius: "16px",
          padding:      "28px",
          boxShadow: inView
            ? (dark
                ? `0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px ${item.accent}22`
                : `0 8px 40px rgba(0,0,0,0.1), 0 0 0 1px ${item.accent}18`)
            : (dark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.05)"),
          opacity:   inView ? 1 : 0,
          transform: inView ? "translateX(0)" : isLeft ? "translateX(-60px)" : "translateX(60px)",
          transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1),
                       transform 0.65s cubic-bezier(0.22,1,0.36,1),
                       border-color 0.4s ease, box-shadow 0.4s ease`,
        }}>

          <div className="flex items-center justify-between mb-3">
            <span className="exp-font-body text-[13px] font-bold tracking-wide" style={{ color: item.accent }}>
              {item.year}
            </span>
            <span className="exp-font-body text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: typeBg, color: item.accent }}>
              {item.type}
            </span>
          </div>

          <h3 className="exp-font-display font-bold mb-1"
            style={{ fontSize: "clamp(17px,1.8vw,20px)", color: titleCol, letterSpacing: "-0.01em", transition: "color 0.4s ease" }}>
            {item.role}
          </h3>

          <p className="exp-font-body text-[14px] font-medium mb-4"
            style={{ color: companyCol, transition: "color 0.4s ease" }}>
            {item.company}
          </p>

          <div style={{ height: "1px", marginBottom: "14px", background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />

          <p className="exp-font-body text-[14px] leading-relaxed mb-5"
            style={{ color: descCol, transition: "color 0.4s ease" }}>
            {item.desc}
          </p>

          <div className="flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <span key={tag} className="exp-font-body text-[12px] font-medium px-2.5 py-1 rounded-md"
                style={{ background: tagBg, border: `1px solid ${tagBorder}`, color: tagText }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Center dot */}
      <div className="hidden lg:flex w-[10%] justify-center items-start pt-7 z-10">
        <div style={{
          width:        inView ? "20px" : "14px",
          height:       inView ? "20px" : "14px",
          borderRadius: "50%",
          background:   inView ? item.accent : (dark ? "#334155" : "#cbd5e1"),
          boxShadow:    inView ? `0 0 0 5px ${item.accent}25, 0 0 20px ${item.accent}50` : "none",
          transition:   "all 0.5s cubic-bezier(0.22,1,0.36,1)",
          flexShrink:   0,
        }} />
      </div>

      <div className="hidden lg:block w-[45%]" />
    </div>
  );
}

/* ══════════════════════════════════════════
   EXTRA CURRICULAR CARD
══════════════════════════════════════════ */
function ExtraCard({ item, dark, index }) {
  const [ref, inView] = useInView(0.15);
  const delay = index * 100;

  const cardBg     = dark ? "#111827" : "#ffffff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const titleCol   = dark ? "#f1f5f9" : "#0f172a";
  const orgCol     = dark ? "#64748b" : "#94a3b8";
  const descCol    = dark ? "#94a3b8" : "#475569";

  return (
    <div
      ref={ref}
      className="group relative flex flex-col rounded-2xl p-6 cursor-default h-full"
      style={{
        background:  cardBg,
        border:      `1.5px solid ${cardBorder}`,
        boxShadow:   dark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.05)",
        opacity:   inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     border-color 0.25s ease, box-shadow 0.25s ease`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = item.accent + "55";
        e.currentTarget.style.boxShadow   = dark
          ? `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${item.accent}33`
          : `0 12px 40px rgba(0,0,0,0.1), 0 0 0 1px ${item.accent}22`;
        e.currentTarget.style.transform   = "translateY(-4px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = cardBorder;
        e.currentTarget.style.boxShadow   = dark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.05)";
        e.currentTarget.style.transform   = "translateY(0)";
      }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-5 right-5 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg,transparent,${item.accent},transparent)` }} />

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl transition-transform duration-300 group-hover:scale-110"
        style={{ background: dark ? `${item.accent}20` : `${item.accent}15` }}>
        {item.icon}
      </div>

      <span className="exp-font-body text-[11px] font-bold tracking-wide mb-2" style={{ color: item.accent }}>
        {item.year}
      </span>

      <h4 className="exp-font-display font-bold text-[16px] mb-1"
        style={{ color: titleCol, letterSpacing: "-0.01em", transition: "color 0.4s ease" }}>
        {item.title}
      </h4>

      <p className="exp-font-body text-[13px] font-medium mb-3"
        style={{ color: orgCol, transition: "color 0.4s ease" }}>
        {item.org}
      </p>

      <p className="exp-font-body text-[13.5px] leading-relaxed flex-1"
        style={{ color: descCol, transition: "color 0.4s ease" }}>
        {item.desc}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN EXPERIENCE SECTION
══════════════════════════════════════════ */
export default function Experience() {
  const { dark } = useTheme();
  const [extraRef, extraInView] = useInView(0.1);

  useEffect(() => {
    if (document.getElementById("exp-styles")) return;
    const s = document.createElement("style");
    s.id = "exp-styles";
    s.textContent = `
      .exp-font-display { font-family: 'Plus Jakarta Sans', sans-serif !important; }
      .exp-font-body    { font-family: 'Outfit', sans-serif !important; }
    `;
    document.head.appendChild(s);
    if (!document.getElementById("exp-fonts")) {
      const l = document.createElement("link");
      l.id = "exp-fonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  const sectionBg  = dark ? "linear-gradient(180deg,#0b0b10 0%,#0d1117 100%)" : "linear-gradient(180deg,#f8fbff 0%,#f0f7ff 100%)";
  const headingCol = dark ? "#f1f5f9" : "#0f172a";
  const subCol     = dark ? "#64748b" : "#94a3b8";
  const lineCol    = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const dividerCol = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const badgeBg    = dark ? "rgba(30,58,138,0.3)"   : "rgba(219,234,254,0.7)";
  const badgeText  = dark ? "#93c5fd"               : "#1d4ed8";
  const badgeBorder= dark ? "rgba(59,130,246,0.25)" : "rgba(147,197,253,0.6)";

  return (
    <section className="relative w-full py-20 sm:py-28 overflow-hidden"
      style={{ background: sectionBg, transition: "background 0.4s ease" }}>

      {/* Bg glow */}
      <div style={{
        position: "absolute", top: "15%", right: "0",
        width: "400px", height: "400px", borderRadius: "50%", pointerEvents: "none",
        background: dark
          ? "radial-gradient(circle,rgba(37,99,235,0.05) 0%,transparent 70%)"
          : "radial-gradient(circle,rgba(37,99,235,0.04) 0%,transparent 70%)",
      }} />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ══ HEADER — CENTER ══ */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: badgeBg, border: `1px solid ${badgeBorder}` }}>
            <span style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background:"#3b82f6" }} />
            <span className="exp-font-body text-[12.5px] font-semibold tracking-wide" style={{ color: badgeText }}>
              EXPERIENCE & EDUCATION
            </span>
          </div>

          <h2 className="exp-font-display font-bold mb-3"
            style={{ fontSize:"clamp(32px,4vw,48px)", color:headingCol, letterSpacing:"-0.02em", transition:"color 0.4s ease" }}>
            My Journey
          </h2>

          {/* Centered underline */}
          <div style={{ width:"52px", height:"4px", borderRadius:"2px",
            background:"linear-gradient(90deg,#2563eb,#0ea5e9)", margin:"0 auto 14px" }} />

          <p className="exp-font-body text-[15px] max-w-md mx-auto"
            style={{ color:subCol, transition:"color 0.4s ease" }}>
            My professional experience and growth over the years.
          </p>
        </div>

        {/* ══ TIMELINE ══ */}
        <div className="relative mb-24">
          <div className="hidden lg:block absolute top-0 bottom-0 z-0"
            style={{ left:"50%", transform:"translateX(-50%)", width:"2px", background:lineCol, transition:"background 0.4s ease" }} />
          <div className="flex flex-col gap-10 lg:gap-14">
            {TIMELINE.map((item, i) => (
              <TimelineCard key={i} item={item} index={i} dark={dark} />
            ))}
          </div>
        </div>

        {/* ══ DIVIDER ══ */}
        <div style={{ height:"1px", background:dividerCol, marginBottom:"64px" }} />

        {/* ══ EXTRA CURRICULAR — CENTER HEADER ══ */}
        <div>
          <div ref={extraRef} className="text-center mb-12"
            style={{
              opacity:    extraInView ? 1 : 0,
              transform:  extraInView ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: dark ? "rgba(120,53,15,0.3)" : "rgba(254,243,199,0.8)",
                       border: `1px solid ${dark ? "rgba(245,158,11,0.25)" : "rgba(251,191,36,0.5)"}` }}>
              <span style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background:"#f59e0b" }} />
              <span className="exp-font-body text-[12.5px] font-semibold tracking-wide"
                style={{ color: dark ? "#fcd34d" : "#b45309" }}>
                BEYOND WORK
              </span>
            </div>

            <h3 className="exp-font-display font-bold mb-3"
              style={{ fontSize:"clamp(26px,3vw,38px)", color:headingCol, letterSpacing:"-0.02em", transition:"color 0.4s ease" }}>
Extra-Curricular Activities            </h3>

            <div style={{ width:"40px", height:"4px", borderRadius:"2px",
              background:"linear-gradient(90deg,#f59e0b,#f97316)", margin:"0 auto 12px" }} />

            <p className="exp-font-body text-[15px] max-w-md mx-auto"
              style={{ color:subCol, transition:"color 0.4s ease" }}>
              Activities and contributions outside of professional work.
            </p>
          </div>

          {/* ✅ Dynamic grid — auto adjusts as you add cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {EXTRACURRICULAR.map((item, i) => (
              <ExtraCard key={i} item={item} dark={dark} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}