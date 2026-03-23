// src/components/FAQ.jsx
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../App";
import { useNavigate } from "react-router-dom";

function useInView(threshold = 0.1) {
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
   FAQ DATA — add/edit freely
══════════════════════════════════════════ */
const FAQS = [
  {
    q: "What do you specialize in?",
    a: "I specialize in full-stack web development using the MERN stack (MongoDB, Express, React, Node.js), cross-platform mobile apps with React Native, and building secure REST APIs. I focus on writing clean, scalable code that delivers real-world impact.",
    accent: "#2563eb",
  },
  {
    q: "What kind of projects do you work on?",
    a: "I work on full-stack web applications, mobile apps, REST API backends, authentication systems, and SaaS platforms. I enjoy projects that combine modern frontend design with robust backend architecture — from idea to deployment.",
    accent: "#0ea5e9",
  },
  {
    q: "Are you available for freelance work?",
    a: "Yes! I'm open to freelance projects and collaborations alongside my current role. Whether it's a new product, an existing codebase that needs improvement, or a mobile app — feel free to reach out and we can discuss the details.",
    accent: "#10b981",
  },
  {
    q: "What is your typical response time?",
    a: "I usually respond to messages and inquiries within 24 hours. For urgent collaboration opportunities or time-sensitive projects, I try to respond much faster. The best way to reach me is through the contact form or directly on LinkedIn.",
    accent: "#7c3aed",
  },
  {
    q: "What technologies do you use for mobile development?",
    a: "I use React Native with Expo for cross-platform mobile development, targeting both Android and iOS from a single codebase. For backend integration, I use Node.js APIs, Firebase for real-time features, and Clerk for authentication.",
    accent: "#f59e0b",
  },
  {
    q: "How do you ensure code quality?",
    a: "I follow clean code principles, use TypeScript for type safety, write modular and reusable components, and use Git with meaningful commit messages. I also do thorough API testing with Postman and ensure responsive design on all screen sizes.",
    accent: "#ef4444",
  },
  {
    q: "Can you work with an existing codebase?",
    a: "Absolutely. I'm comfortable jumping into existing projects, understanding the architecture, and contributing effectively. I've worked on legacy code, refactoring projects, and adding new features to live applications.",
    accent: "#06b6d4",
  },
  {
    q: "What is your development process?",
    a: "I start by understanding requirements clearly, then plan the architecture, break work into milestones, and build iteratively with regular updates. I prioritize clean UI, solid backend logic, and thorough testing before delivery.",
    accent: "#8b5cf6",
  },
];

/* ── Plus / Minus Icon ── */
const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const MinusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

/* ── Single FAQ Item ── */
function FAQItem({ faq, index, dark, openIndex, setOpenIndex }) {
  const [ref, inView] = useInView(0.1);
  const isOpen = openIndex === index;
  const answerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (answerRef.current) {
      setHeight(isOpen ? answerRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  const delay = (index % 4) * 60;

  const cardBg      = dark ? "#111827" : "#ffffff";
  const cardBorderC = isOpen
    ? `${faq.accent}55`
    : (dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)");
  const questionCol = dark ? "#f1f5f9" : "#0f172a";
  const answerCol   = dark ? "#94a3b8" : "#475569";
  const iconBg      = isOpen
    ? faq.accent
    : (dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)");
  const iconColor   = isOpen ? "#ffffff" : (dark ? "#94a3b8" : "#64748b");
  const dividerCol  = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  return (
    <div
      ref={ref}
      style={{
        background:   cardBg,
        border:       `1.5px solid ${cardBorderC}`,
        borderRadius: "16px",
        overflow:     "hidden",
        boxShadow: isOpen
          ? (dark
              ? `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${faq.accent}22`
              : `0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px ${faq.accent}18`)
          : (dark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.04)"),
        opacity:   inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `
          opacity      0.5s ease ${delay}ms,
          transform    0.5s ease ${delay}ms,
          border-color 0.3s ease,
          box-shadow   0.3s ease
        `,
      }}
    >
      {/* ── Question Row ── */}
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        style={{
          width: "100%", padding: "22px 24px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "16px",
          background: "transparent", border: "none",
          cursor: "pointer", textAlign: "left",
        }}
      >
        {/* Left — number + question */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
          {/* Number badge */}
          <span style={{
            width: "28px", height: "28px", borderRadius: "8px",
            background: isOpen ? faq.accent : (dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"),
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontSize: "11px", fontWeight: 800,
            color: isOpen ? "#ffffff" : (dark ? "#64748b" : "#94a3b8"),
            flexShrink: 0,
            transition: "all 0.3s ease",
          }}>
            {String(index + 1).padStart(2, "0")}
          </span>

          <h3 style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif",
            fontSize: "clamp(15px,1.5vw,17px)",
            fontWeight: 700,
            color: isOpen ? (dark ? "#ffffff" : "#0f172a") : questionCol,
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
            margin: 0,
            transition: "color 0.3s ease",
          }}>
            {faq.q}
          </h3>
        </div>

        {/* Icon */}
        <div style={{
          width: "34px", height: "34px", borderRadius: "10px",
          background: iconBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: iconColor,
          flexShrink: 0,
          transition: "all 0.3s ease",
          transform: isOpen ? "rotate(0deg)" : "rotate(0deg)",
          boxShadow: isOpen ? `0 4px 12px ${faq.accent}44` : "none",
        }}>
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </div>
      </button>

      {/* ── Answer — animated height ── */}
      <div style={{
        height: `${height}px`,
        overflow: "hidden",
        transition: "height 0.4s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div ref={answerRef}>
          <div style={{
            height: "1px",
            background: dividerCol,
            margin: "0 24px",
          }} />
          <p style={{
            fontFamily: "'Outfit',sans-serif",
            fontSize: "clamp(14px,1.4vw,15.5px)",
            lineHeight: 1.8,
            color: answerCol,
            padding: "18px 24px 22px",
            margin: 0,
            transition: "color 0.3s ease",
          }}>
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN FAQ SECTION
══════════════════════════════════════════ */
export default function FAQ() {
  const { dark } = useTheme();
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);
  const [headerRef, headerInView] = useInView(0.2);
  const [ctaRef,    ctaInView]    = useInView(0.2);

  /* ── Navigate to contact + scroll to top ── */
  const goToContact = () => {
    navigate("/contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (document.getElementById("faq-styles")) return;
    const s = document.createElement("style");
    s.id = "faq-styles";
    s.textContent = `
      .faq-font-display { font-family:'Plus Jakarta Sans',sans-serif !important; }
      .faq-font-body    { font-family:'Outfit',sans-serif !important; }
    `;
    document.head.appendChild(s);
    if (!document.getElementById("faq-fonts")) {
      const l = document.createElement("link");
      l.id = "faq-fonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  const sectionBg  = dark
    ? "linear-gradient(180deg,#0d1117 0%,#0b0b10 100%)"
    : "linear-gradient(180deg,#f0f7ff 0%,#f8fbff 100%)";
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
        position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
        width: "700px", height: "350px", borderRadius: "50%", pointerEvents: "none",
        background: dark
          ? "radial-gradient(ellipse,rgba(37,99,235,0.07) 0%,transparent 65%)"
          : "radial-gradient(ellipse,rgba(37,99,235,0.05) 0%,transparent 65%)",
      }} />

      <div className="relative max-w-3xl mx-auto px-6 sm:px-10 lg:px-8">

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
            style={{ background: badgeBg, border: `1px solid ${badgeBorder}` }}>
            <span style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background:"#3b82f6" }} />
            <span className="faq-font-body text-[12.5px] font-semibold tracking-wide" style={{ color: badgeText }}>
              FAQ
            </span>
          </div>

          <h2
            className="faq-font-display font-bold mb-4"
            style={{
              fontSize: "clamp(30px,4vw,48px)",
              color: headingCol,
              letterSpacing: "-0.02em",
              transition: "color 0.4s ease",
            }}
          >
            Frequently Asked Questions
          </h2>

          <div style={{
            width: "52px", height: "4px", borderRadius: "2px",
            background: "linear-gradient(90deg,#2563eb,#0ea5e9)",
            margin: "0 auto 16px",
          }} />

          <p
            className="faq-font-body text-[16px] max-w-[480px] mx-auto leading-relaxed"
            style={{ color: subCol, transition: "color 0.4s ease" }}
          >
            Everything you need to know about working with me.
            Can't find your answer?{" "}
            <button
              onClick={goToContact}
              style={{ color:"#2563eb", background:"none", border:"none", cursor:"pointer", fontFamily:"'Outfit',sans-serif", fontSize:"inherit", fontWeight:600, padding:0 }}>
              Feel free to ask!
            </button>
          </p>
        </div>

        {/* ══ FAQ ACCORDION ══ */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              dark={dark}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </div>

        {/* ══ BOTTOM CTA ══ */}
        <div
          ref={ctaRef}
          className="text-center mt-14"
          style={{
            opacity:    ctaInView ? 1 : 0,
            transform:  ctaInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="faq-font-body text-[15px] mb-4"
            style={{ color: subCol }}>
            Still have questions?
          </p>
          <button
            onClick={goToContact}
            className="faq-font-body inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[14px] text-white border-none cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg,#2563eb,#3b82f6)",
              boxShadow: "0 4px 18px rgba(37,99,235,0.35)",
            }}
          >
            Contact Me →
          </button>
        </div>

      </div>
    </section>
  );
}