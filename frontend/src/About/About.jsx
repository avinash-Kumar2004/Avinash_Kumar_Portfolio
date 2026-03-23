import { useEffect, useRef, useState } from "react";
import { useTheme } from "../App";

/* ── useInView — replays every time ── */
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

/* ── Paragraphs ── */
const PARAGRAPHS = [
  "Hi, I'm Avinash — a passionate Full Stack Developer focused on building modern, scalable, and user-friendly web and mobile applications.",
  "I specialize in technologies like React, Node.js, and MongoDB, along with React Native for mobile app development. I enjoy creating clean and efficient solutions that solve real-world problems while ensuring a smooth user experience.",
  "I have hands-on experience in developing full-stack applications, working with APIs, authentication systems, and handling dynamic data efficiently.",
  "I'm continuously learning and exploring new technologies to improve my skills and stay updated with modern development practices.",
  "I believe great development is not just about writing code — it's about building meaningful, efficient, and impactful digital experiences.",
];

/* ── Tech Badges ── */
const TECHS = ["React", "Node.js", "MongoDB", "React Native", "Express", "PostgreSQL", "REST APIs", "Git"];

export default function About() {
  const { dark } = useTheme();
  const [imgRef, imgInView]   = useInView(0.15);
  const [textRef, textInView] = useInView(0.15);

  useEffect(() => {
    if (document.getElementById("about-styles")) return;
    const s = document.createElement("style");
    s.id = "about-styles";
    s.textContent = `
      .about-font-display { font-family: 'Plus Jakarta Sans', sans-serif !important; }
      .about-font-body    { font-family: 'Outfit', sans-serif !important; }
      @keyframes aboutPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.3); }
        50%       { box-shadow: 0 0 0 10px rgba(37,99,235,0); }
      }
      .about-img-pulse { animation: aboutPulse 3s ease-in-out infinite; }
    `;
    document.head.appendChild(s);

    if (!document.getElementById("about-fonts")) {
      const l = document.createElement("link");
      l.id = "about-fonts";
      l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  /* ── Colors ── */
  const sectionBg  = dark ? "linear-gradient(180deg,#0d1117 0%,#0b0b10 100%)" : "linear-gradient(180deg,#ffffff 0%,#f8fbff 100%)";
  const headingCol = dark ? "#f1f5f9"  : "#0f172a";
  const accentCol  = "#2563eb";
  const paraCol    = dark ? "#94a3b8"  : "#475569";
  const imgBorder  = dark ? "#1e3a8a"  : "#2563eb";
  const imgBg      = dark ? "#1e293b"  : "#e2e8f0";
  const badgeBg    = dark ? "rgba(30,58,138,0.35)" : "rgba(219,234,254,0.8)";
  const badgeBorder= dark ? "rgba(59,130,246,0.3)" : "rgba(147,197,253,0.7)";
  const badgeText  = dark ? "#93c5fd"  : "#1d4ed8";
  const dividerCol = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  return (
    <section
      className="relative w-full py-2 sm:py-28 overflow-hidden"
      style={{ background: sectionBg, transition: "background 0.4s ease" }}
    >
      {/* Bg glow */}
      <div style={{
        position: "absolute", top: "20%", left: "0",
        width: "350px", height: "350px", borderRadius: "50%", pointerEvents: "none",
        background: dark
          ? "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)",
      }} />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Section Title ── */}
        <div className="mb-14">
          <h2
            className="about-font-display font-bold"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              color: headingCol,
              letterSpacing: "-0.02em",
              transition: "color 0.4s ease",
            }}
          >
            About Me
          </h2>
          {/* Underline accent */}
          <div style={{
            width: "52px", height: "4px", borderRadius: "2px",
            background: `linear-gradient(90deg, ${accentCol}, #0ea5e9)`,
            marginTop: "5px",
          }} />
        </div>

        {/* ── Main Content: Image + Text ── */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

          {/* ── LEFT — Image slides in from left ── */}
          <div
            ref={imgRef}
            className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-start"
            style={{
              opacity:    imgInView ? 1 : 0,
              transform:  imgInView ? "translateX(0)" : "translateX(-70px)",
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Image wrapper */}
            <div
              className="about-img-pulse relative"
              style={{
                width:  "clamp(240px, 28vw, 320px)",
                height: "clamp(280px, 33vw, 380px)",
                borderRadius: "18px",
                padding: "4px",
                background: `linear-gradient(135deg, ${imgBorder}, #0ea5e9)`,
                flexShrink: 0,
              }}
            >
              <div style={{
                width: "100%", height: "100%",
                borderRadius: "14px",
                overflow: "hidden",
                background: imgBg,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <img
                  src="/assets/profile1.png"
                  alt="Avinash Kumar"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  onError={e => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback */}
                <div style={{
                  display: "none", alignItems: "center", justifyContent: "center",
                  width: "100%", height: "100%",
                  background: dark ? "linear-gradient(135deg,#1e3a8a,#1e40af)" : "linear-gradient(135deg,#dbeafe,#bfdbfe)",
                  fontSize: "56px", fontWeight: 800, color: dark ? "#93c5fd" : "#2563eb",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  AK
                </div>
              </div>

              {/* Floating badge — experience */}
              <div
                style={{
                  position: "absolute", bottom: "-16px", right: "-16px",
                  background: accentCol,
                  borderRadius: "14px",
                  padding: "10px 16px",
                  boxShadow: "0 8px 24px rgba(37,99,235,0.4)",
                  border: "3px solid " + (dark ? "#0b0b10" : "#ffffff"),
                }}
              >
                <div className="about-font-display text-white font-bold text-[22px] leading-none">6+</div>
                <div className="about-font-body text-white/80 text-[11px] font-medium mt-0.5">Months Exp.</div>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Text slides in from right ── */}
          <div
            ref={textRef}
            className="flex-1 min-w-0"
            style={{
              opacity:    textInView ? 1 : 0,
              transform:  textInView ? "translateX(0)" : "translateX(70px)",
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s",
            }}
          >
            {/* Paragraphs */}
            <div className="flex flex-col gap-4 mb-8">
              {PARAGRAPHS.map((para, i) => (
                <p
                  key={i}
                  className="about-font-body leading-relaxed"
                  style={{
                    fontSize: i === 0 ? "clamp(16px, 1.6vw, 18px)" : "clamp(14px, 1.4vw, 16px)",
                    color: i === 0 ? (dark ? "#e2e8f0" : "#1e293b") : paraCol,
                    fontWeight: i === 0 ? 600 : 400,
                    transition: "color 0.4s ease",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: dividerCol, marginBottom: "20px" }} />

            {/* Tech Badges */}
            <div>
              <p
                className="about-font-body text-[12px] font-semibold tracking-widest uppercase mb-3"
                style={{ color: dark ? "#475569" : "#94a3b8" }}
              >
                Technologies I Work With
              </p>
              <div className="flex flex-wrap gap-2">
                {TECHS.map(tech => (
                  <span
                    key={tech}
                    className="about-font-body text-[13px] font-medium px-3 py-1.5 rounded-lg"
                    style={{
                      background: badgeBg,
                      border: `1px solid ${badgeBorder}`,
                      color: badgeText,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}