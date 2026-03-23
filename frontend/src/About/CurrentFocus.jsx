import { useRef, useState, useEffect } from "react";
import { useTheme } from "../App";

function useInView(threshold = 0.2) {
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

export default function CurrentFocus() {
  const { dark } = useTheme();
  const [ref, inView] = useInView(0.2);

  const sectionBg  = dark
    ? "linear-gradient(180deg,#0d1117 0%,#0b0b10 100%)"
    : "linear-gradient(180deg,#f8fbff 0%,#f0f7ff 100%)";
  const headingCol = dark ? "#f1f5f9" : "#0f172a";
  const textCol    = dark ? "#94a3b8" : "#475569";
  const badgeBg    = dark ? "rgba(30,58,138,0.3)"   : "rgba(219,234,254,0.8)";
  const badgeText  = dark ? "#93c5fd"               : "#1d4ed8";
  const badgeBorder= dark ? "rgba(59,130,246,0.25)" : "rgba(147,197,253,0.6)";
  const cardBg     = dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  return (
    <section
      className="relative w-full py-10 overflow-hidden"
      style={{ background: sectionBg, transition: "background 0.4s ease" }}
    >
      {/* Subtle center glow */}
      <div style={{
        position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)",
        width: "600px", height: "300px", borderRadius: "50%", pointerEvents: "none",
        background: dark
          ? "radial-gradient(ellipse,rgba(37,99,235,0.07) 0%,transparent 70%)"
          : "radial-gradient(ellipse,rgba(37,99,235,0.05) 0%,transparent 70%)",
      }} />

      <div
        ref={ref}
        className="relative max-w-5xl mx-auto px-6 sm:px-10 text-center"
        style={{
          opacity:    inView ? 1 : 0,
          transform:  inView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
          style={{ background: badgeBg, border: `1px solid ${badgeBorder}` }}>
          {/* Pulsing dot */}
          <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
            <span style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "#22c55e", opacity: 0.6,
              animation: "cfPulse 1.8s ease-in-out infinite",
            }} />
            <span style={{
              position: "relative", display: "inline-block",
              width: 8, height: 8, borderRadius: "50%", background: "#22c55e",
            }} />
          </span>
          <span style={{
            fontFamily: "'Outfit',sans-serif",
            fontSize: "12px", fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: badgeText,
          }}>
            Currently Active
          </span>
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: "clamp(28px,3.5vw,42px)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: headingCol,
          marginBottom: "20px",
          transition: "color 0.4s ease",
        }}>
          Current Focus
        </h2>

        {/* Underline */}
        <div style={{
          width: "48px", height: "4px", borderRadius: "2px",
          background: "linear-gradient(90deg,#2563eb,#0ea5e9)",
          margin: "0 auto 28px",
        }} />

        {/* Card */}
        <div style={{
          background: cardBg,
          border: `1.5px solid ${cardBorder}`,
          borderRadius: "20px",
          padding: "32px 36px",
          backdropFilter: "blur(8px)",
          boxShadow: dark
            ? "0 4px 32px rgba(0,0,0,0.3)"
            : "0 4px 32px rgba(0,0,0,0.06)",
          transition: "all 0.4s ease",
        }}>
          {/* Company highlight */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5"
            style={{
              background: dark ? "rgba(37,99,235,0.2)" : "rgba(219,234,254,0.9)",
              border: `1px solid ${dark ? "rgba(59,130,246,0.35)" : "rgba(147,197,253,0.8)"}`,
            }}>
            <span style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "13px", fontWeight: 700,
              color: dark ? "#93c5fd" : "#1d4ed8",
            }}>
              🏢 Adore Simtrak — Full Stack Developer Intern
            </span>
          </div>

          {/* Text */}
          <p style={{
            fontFamily: "'Outfit',sans-serif",
            fontSize: "clamp(15px,1.5vw,17px)",
            lineHeight: 1.8,
            color: textCol,
            transition: "color 0.4s ease",
          }}>
            Currently, I'm working as a{" "}
            <span style={{ color: dark ? "#60a5fa" : "#2563eb", fontWeight: 600 }}>
              Full Stack Developer Intern at Adore Simtrak
            </span>
            , where I'm building and maintaining scalable web applications,
            designing RESTful APIs, and delivering smooth user experiences.
            My focus is on growing as a developer — writing clean code,
            learning modern practices, and contributing to impactful
            real-world products every day.
          </p>
        </div>

      </div>

      {/* Keyframe style */}
      <style>{`
        @keyframes cfPulse {
          0%,100% { transform: scale(1); opacity: 0.6; }
          50%      { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}