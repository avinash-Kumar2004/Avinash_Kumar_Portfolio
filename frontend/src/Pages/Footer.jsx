import { useTheme } from "../App";
import { useEffect } from "react";

/* ── Icons ── */
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const SOCIAL_LINKS = [
  {
    icon: <GithubIcon />,
    href: "https://github.com/avinash-Kumar2004",
    label: "GitHub",
  },
  {
    icon: <LinkedinIcon />,
    href: "https://www.linkedin.com/in/avinash-kumar-a226932a4",
    label: "LinkedIn",
  },
  {
    icon: <MailIcon />,
href: "https://mail.google.com/mail/?view=cm&to=www.kumaravinash3898@gmail.com",
    label: "Email",
  },
];

export default function Footer() {
  const { dark } = useTheme();

  useEffect(() => {
    if (document.getElementById("footer-styles")) return;
    const s = document.createElement("style");
    s.id = "footer-styles";
    s.textContent = `
      .footer-font { font-family: 'Outfit', sans-serif !important; }
      .footer-icon-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 9px;
        border: 1.5px solid transparent;
        transition: all 0.2s ease;
        text-decoration: none;
      }
      .footer-icon-btn:hover {
        transform: translateY(-2px) scale(1.1);
      }
    `;
    document.head.appendChild(s);
  }, []);

  /* ── Theme-aware colors ── */
  const footerBg     = dark ? "#0d1117"                    : "#f8fafc";
  const topBorder    = dark ? "rgba(255,255,255,0.06)"     : "rgba(0,0,0,0.07)";
  const textCol      = dark ? "#64748b"                    : "#94a3b8";
  const nameCol      = dark ? "#94a3b8"                    : "#64748b";
  const iconCol      = dark ? "#64748b"                    : "#94a3b8";
  const iconHoverCol = dark ? "#e2e8f0"                    : "#1e293b";
  const iconHoverBg  = dark ? "rgba(255,255,255,0.07)"     : "rgba(0,0,0,0.06)";
  const iconBorder   = dark ? "rgba(255,255,255,0.08)"     : "rgba(0,0,0,0.08)";

  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full"
      style={{
        background:  footerBg,
        borderTop:   `1px solid ${topBorder}`,
        transition:  "background 0.4s ease, border-color 0.4s ease",
      }}
    >
      <div
        className="footer-font max-w-6xl mx-auto px-6 sm:px-10 lg:px-16
          flex flex-col sm:flex-row items-center justify-between
          gap-4 py-5"
      >

        {/* ── Left: Copyright ── */}
        <p
          className="text-[13.5px] text-center sm:text-left"
          style={{ color: textCol, transition: "color 0.4s ease" }}
        >
          © {year}{" "}
          <span
            className="font-semibold"
            style={{ color: nameCol, transition: "color 0.4s ease" }}
          >
            Avinash Kumar
          </span>
          {" "}— All Rights Reserved
        </p>

        {/* ── Right: Social Icons ── */}
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noreferrer"
              aria-label={label}
              title={label}
              className="footer-icon-btn"
              style={{ color: iconCol, borderColor: iconBorder }}
              onMouseEnter={e => {
                e.currentTarget.style.color       = iconHoverCol;
                e.currentTarget.style.background  = iconHoverBg;
                e.currentTarget.style.borderColor = dark
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(0,0,0,0.14)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color       = iconCol;
                e.currentTarget.style.background  = "transparent";
                e.currentTarget.style.borderColor = iconBorder;
              }}
            >
              {icon}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}