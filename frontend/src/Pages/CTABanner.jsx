import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../App";

/* ── useInView hook ── */
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

/* ── Icons ── */
const MailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

export default function CTABanner() {
  const { dark } = useTheme();
  const [ref, inView] = useInView(0.2);

  useEffect(() => {
    if (document.getElementById("cta-styles")) return;
    const s = document.createElement("style");
    s.id = "cta-styles";
    s.textContent = `
      .cta-font-display { font-family: 'Plus Jakarta Sans', sans-serif !important; }
      .cta-font-body    { font-family: 'Outfit', sans-serif !important; }

      /* Animated shimmer on gradient bg */
      @keyframes ctaShimmer {
        0%   { background-position: 0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .cta-gradient-bg {
        background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 40%, #10b981 100%);
        background-size: 200% 200%;
        animation: ctaShimmer 6s ease infinite;
      }

      /* Dot pattern overlay */
      .cta-dots {
        background-image: radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px);
        background-size: 24px 24px;
      }

      /* Button hover glow */
      .cta-btn-primary:hover {
        box-shadow: 0 8px 32px rgba(0,0,0,0.35) !important;
        transform: translateY(-2px) scale(1.03) !important;
      }
      .cta-btn-primary:active {
        transform: translateY(0px) scale(0.98) !important;
      }
      .cta-btn-secondary:hover {
        background: rgba(255,255,255,0.25) !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2) !important;
        transform: translateY(-2px) scale(1.03) !important;
      }
      .cta-btn-secondary:active {
        transform: translateY(0px) scale(0.98) !important;
      }
    `;
    document.head.appendChild(s);

    /* Inject fonts if not already */
    if (!document.getElementById("cta-fonts")) {
      const l = document.createElement("link");
      l.id = "cta-fonts";
      l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&family=Plus+Jakarta+Sans:wght@700;800&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden">

      {/* ── Gradient Background ── */}
      <div className="cta-gradient-bg relative w-full py-20 sm:py-24 px-6">

        {/* Dot pattern overlay */}
        <div className="cta-dots absolute inset-0 pointer-events-none" />

        {/* Subtle radial glow center */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }} />

        {/* ── Content ── */}
        <div
          ref={ref}
          className="relative max-w-3xl mx-auto text-center"
          style={{
            opacity:    inView ? 1 : 0,
            transform:  inView ? "translateY(0)" : "translateY(36px)",
            transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >

          {/* Heading */}
          <h2
            className="cta-font-display font-bold text-white mb-5 leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.02em" }}
          >
            Let's Build Something Together
          </h2>

          {/* Subtext */}
          <p
            className="cta-font-body text-white/75 leading-relaxed mb-10 mx-auto"
            style={{ fontSize: "clamp(15px, 1.6vw, 17px)", maxWidth: "560px" }}
          >
            Interested in collaborating on innovative solutions or discussing technology
            strategy? I'm always open to meaningful conversations and partnerships.
          </p>

          {/* ── Buttons ── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            {/* Get in Touch → /contact */}
            <Link
              to="/contact"
              className="cta-btn-primary cta-font-body inline-flex items-center gap-2.5
                px-7 py-3.5 rounded-xl font-semibold text-[15px] no-underline text-white
                w-full sm:w-auto justify-center"
              style={{
                background: "rgba(15,23,42,0.85)",
                backdropFilter: "blur(8px)",
                border: "1.5px solid rgba(255,255,255,0.15)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <MailIcon />
              Get in Touch
            </Link>

            {/* View Projects → /projects */}
            <Link
              to="/projects"
              className="cta-btn-secondary cta-font-body inline-flex items-center gap-2.5
                px-7 py-3.5 rounded-xl font-semibold text-[15px] no-underline text-white
                w-full sm:w-auto justify-center"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <FolderIcon />
              View Projects
            </Link>

          </div>
        </div>
      </div>

    </section>
  );
}