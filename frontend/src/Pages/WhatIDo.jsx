import { useTheme } from "../App";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/* ── Inject Fonts ── */
function injectFont() {
  if (document.getElementById("wid-fonts")) return;
  const l = document.createElement("link");
  l.id = "wid-fonts";
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap";
  document.head.appendChild(l);
}

/* ── Icons ── */
const CodeIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);
const ServerIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/>
    <line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
);
const MobileIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ── Card Data ── */
const CARDS = [
  {
    icon: <CodeIcon />,
    iconBg:    { light: "rgba(219,234,254,0.8)", dark: "rgba(30,58,138,0.5)"  },
    iconColor: { light: "#2563eb",               dark: "#93c5fd"               },
    title: "Full-Stack Development",
    desc:  "Building scalable and responsive web applications using modern technologies like React, Node.js, and MongoDB. Focused on clean architecture, performance, and seamless user experience.",
    accent: "#2563eb",
    slideFrom: "left",
  },
  {
    icon: <ServerIcon />,
    iconBg:    { light: "rgba(209,250,229,0.8)", dark: "rgba(6,78,59,0.5)"    },
    iconColor: { light: "#059669",               dark: "#6ee7b7"               },
    title: "Backend & APIs",
    desc:  "Designing secure and efficient backend systems with RESTful APIs, authentication, and optimized data handling to ensure reliable and high-performance applications.",
    accent: "#059669",
    slideFrom: "bottom",
  },
  {
    icon: <MobileIcon />,
    iconBg:    { light: "rgba(237,233,254,0.8)", dark: "rgba(46,16,101,0.5)"  },
    iconColor: { light: "#7c3aed",               dark: "#c4b5fd"               },
    title: "App Development",
    desc:  "Developing cross-platform mobile applications using React Native, delivering smooth UI, real-time features, and a consistent user experience across devices.",
    accent: "#7c3aed",
    slideFrom: "right",
  },
];

/* ── useInView — resets when out of view so animation replays every time ── */
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

/* ── Single Card ── */
function Card({ card, dark, index }) {
  const [ref, inView] = useInView(0.12);

  const iconBg     = dark ? card.iconBg.dark    : card.iconBg.light;
  const iconColor  = dark ? card.iconColor.dark : card.iconColor.light;
  const cardBg     = dark ? "#111827"                    : "#ffffff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)"     : "rgba(0,0,0,0.07)";
  const titleCol   = dark ? "#f1f5f9"                    : "#0f172a";
  const descCol    = dark ? "#94a3b8"                    : "#64748b";

  const initialTransform =
    card.slideFrom === "left"  ? "translateX(-80px)" :
    card.slideFrom === "right" ? "translateX(80px)"  :
                                  "translateY(50px)";

  const delay = index * 90;

  return (
    <div
      ref={ref}
      className="group relative flex flex-col rounded-2xl p-8 cursor-default"
      style={{
        /* ✅ h-full makes all cards stretch to tallest card's height */
        height: "100%",
        background:  cardBg,
        border:      `1.5px solid ${cardBorder}`,
        boxShadow:   dark ? "0 2px 16px rgba(0,0,0,0.4)" : "0 2px 16px rgba(0,0,0,0.06)",
        /* Scroll-triggered slide animation */
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
        e.currentTarget.style.borderColor = card.accent + "55";
        e.currentTarget.style.boxShadow   = dark
          ? `0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px ${card.accent}33`
          : `0 20px 48px rgba(0,0,0,0.12), 0 0 0 1px ${card.accent}22`;
        e.currentTarget.style.transform   = "translateY(-6px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = cardBorder;
        e.currentTarget.style.boxShadow   = dark
          ? "0 2px 16px rgba(0,0,0,0.4)"
          : "0 2px 16px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform   = "translate(0,0)";
      }}
    >
      {/* Top glow line on hover */}
      <div
        className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)` }}
      />

      {/* Icon box */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
        style={{ background: iconBg, color: iconColor }}
      >
        {card.icon}
      </div>

      {/* Title */}
      <h3
        className="wid-font-display text-[19px] font-bold mb-3"
        style={{ color: titleCol, letterSpacing: "-0.01em" }}
      >
        {card.title}
      </h3>

      {/* Description — flex-1 pushes link to bottom always */}
      <p
        className="wid-font-body text-[14.5px] leading-relaxed mb-6 flex-1"
        style={{ color: descCol }}
      >
        {card.desc}
      </p>

      {/* View Projects */}
      <Link
        to="/projects"
        className="wid-font-body inline-flex items-center gap-1.5 text-[14px] font-semibold no-underline w-fit transition-all duration-200"
        style={{ color: card.accent }}
        onMouseEnter={e => { e.currentTarget.style.gap = "10px"; }}
        onMouseLeave={e => { e.currentTarget.style.gap = "6px"; }}
      >
        View Projects <ArrowIcon />
      </Link>
    </div>
  );
}

/* ── Main Section ── */
export default function WhatIDo() {
  const { dark } = useTheme();
  const [headingRef, headingInView] = useInView(0.2);
  injectFont();

  useEffect(() => {
    if (document.getElementById("wid-styles")) return;
    const s = document.createElement("style");
    s.id = "wid-styles";
    s.textContent = `
      .wid-font-display { font-family: 'Plus Jakarta Sans', sans-serif !important; }
      .wid-font-body    { font-family: 'Outfit', sans-serif !important; }
    `;
    document.head.appendChild(s);
  }, []);

  const sectionBg   = dark
    ? "linear-gradient(180deg, #0b0b10 0%, #0d1117 100%)"
    : "linear-gradient(180deg, #f0f7ff 0%, #f8fbff 100%)";
  const headingCol  = dark ? "#f1f5f9" : "#0f172a";
  const subCol      = dark ? "#64748b" : "#94a3b8";
  const badgeBg     = dark ? "rgba(30,58,138,0.3)"   : "rgba(219,234,254,0.7)";
  const badgeText   = dark ? "#93c5fd"               : "#1d4ed8";
  const badgeBorder = dark ? "rgba(59,130,246,0.25)" : "rgba(147,197,253,0.6)";

  return (
    <section
      className="relative w-full py-10 overflow-hidden"
      style={{ background: sectionBg, transition: "background 0.4s ease" }}
    >
      {/* Bg glow */}
      <div style={{
        position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
        width: "700px", height: "300px", borderRadius: "50%", pointerEvents: "none",
        background: dark
          ? "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)"
          : "radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 70%)",
      }} />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Header ── */}
        <div
          ref={headingRef}
          className="text-center mb-16"
          style={{
            opacity:    headingInView ? 1 : 0,
            transform:  headingInView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: badgeBg, border: `1px solid ${badgeBorder}` }}>
            <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#3b82f6" }} />
            <span className="wid-font-body text-[12.5px] font-semibold tracking-wide" style={{ color: badgeText }}>
              WHAT I DO
            </span>
          </div>

          <h2
            className="wid-font-display text-[clamp(32px,4vw,48px)] font-bold mb-4"
            style={{ color: headingCol, letterSpacing: "-0.02em", transition: "color 0.4s ease" }}
          >
What I Do
          </h2>

          <p
            className="wid-font-body text-[16px] max-w-[520px] mx-auto leading-relaxed"
            style={{ color: subCol, transition: "color 0.4s ease" }}
          >
            Combining technical depth with modern tools to build fast,
            reliable, and scalable digital products.
          </p>
        </div>

        {/* ── Cards Grid
              items-stretch = row ki height sab cards pe barabar hogi
              Each Card has height:100% so it fills the row
        ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
          {CARDS.map((card, i) => (
            <Card key={card.title} card={card} dark={dark} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}