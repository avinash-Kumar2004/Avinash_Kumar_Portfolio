import { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../App";

/* ── Google Fonts ── */
function injectFont() {
  if (document.getElementById("ak-fonts")) return;
  const l = document.createElement("link");
  l.id = "ak-fonts";
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap";
  document.head.appendChild(l);
}

const NAV_LINKS = [
  { label: "Home",       to: "/"           },
  { label: "About",      to: "/about"      },
  { label: "Experience", to: "/experience" },
  { label: "Projects",   to: "/projects"   },
  { label: "Skills",     to: "/skills"     },
  { label: "Blog",       to: "/blog"       },
  { label: "Contact",    to: "/contact"    },
];

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

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Navbar() {
  const { dark, setDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  injectFont();

  useEffect(() => {
    if (document.getElementById("ak-styles")) return;
    const s = document.createElement("style");
    s.id = "ak-styles";
    s.textContent = `
      .font-display { font-family: 'Playfair Display', serif !important; }
      .font-body    { font-family: 'Outfit', sans-serif !important; }
      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .animate-slideDown { animation: slideDown 0.22s cubic-bezier(0.4,0,0.2,1) forwards; }
    `;
    document.head.appendChild(s);
  }, []);

  const handleScroll = useCallback(() => setScrolled(window.scrollY > 24), []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const iconBtnCls = `
    flex items-center justify-center w-9 h-9 rounded-[10px]
    border border-black/[0.08] dark:border-white/[0.08]
    text-slate-500 dark:text-slate-400 bg-transparent cursor-pointer
    hover:text-blue-600 dark:hover:text-blue-400
    hover:bg-blue-50 dark:hover:bg-blue-950/60
    hover:border-blue-400 dark:hover:border-blue-500
    hover:scale-105 transition-all duration-200
  `;

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-50
        flex items-center h-[64px]
        px-4 sm:px-6 lg:px-10
        border-b transition-all duration-300
        ${scrolled
          ? "bg-white/85 dark:bg-[#0b0b10]/85 backdrop-blur-xl border-black/[0.08] dark:border-white/[0.08] shadow-lg"
          : "bg-white dark:bg-[#0b0b10] border-black/[0.06] dark:border-white/[0.06] shadow-sm"
        }
      `}>

        {/* Logo */}
        <NavLink to="/" className="flex items-baseline gap-1.5 no-underline select-none group">
          <span className="font-display text-[20px] font-bold tracking-tight text-blue-600 dark:text-blue-400 group-hover:opacity-75 transition-opacity duration-200">
            Avinash
          </span>
          <span className="font-body text-[16px] font-light tracking-[0.12em] uppercase text-slate-600 dark:text-slate-400 group-hover:opacity-75 transition-opacity duration-200">
            Kumar
          </span>
        </NavLink>

        <div className="flex-1" />

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-0.5 list-none m-0 p-0">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => `
                  font-body text-[13px] tracking-wide no-underline
                  px-3 py-[6px] rounded-[8px] transition-all duration-200
                  ${isActive
                    ? "bg-blue-600 dark:bg-blue-500 text-white font-semibold shadow-sm"
                    : "font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-blue-950/50"
                  }
                `}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-3">
          <button
            title="GitHub"
            onClick={() => window.open("https://github.com/avinash-Kumar2004", "_blank")}
            className={`hidden sm:flex ${iconBtnCls}`}
          >
            <GithubIcon />
          </button>
          <button
            title="LinkedIn"
            onClick={() => window.open("https://www.linkedin.com/in/avinash-kumar-a226932a4", "_blank")}
            className={`hidden sm:flex ${iconBtnCls}`}
          >
            <LinkedinIcon />
          </button>

          {/* ✅ Theme toggle — context se */}
          <button
            title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            onClick={() => setDark(d => !d)}
            className={iconBtnCls}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Hamburger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(o => !o)}
            className="lg:hidden flex flex-col gap-[5px] p-1.5 ml-1 rounded-lg bg-transparent border-none cursor-pointer"
          >
            <span className={`block w-[22px] h-[2px] rounded bg-slate-700 dark:bg-slate-300 transition-all duration-200 origin-center ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block w-[22px] h-[2px] rounded bg-slate-700 dark:bg-slate-300 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-[22px] h-[2px] rounded bg-slate-700 dark:bg-slate-300 transition-all duration-200 origin-center ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="
          animate-slideDown
          lg:hidden fixed top-[64px] left-0 right-0 z-40
          flex flex-col gap-1 px-4 py-4
          bg-white dark:bg-[#13131a]
          border-b border-black/[0.07] dark:border-white/[0.07]
          shadow-2xl
        ">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `
                font-body text-[15px] tracking-wide no-underline
                px-4 py-3 rounded-xl transition-all duration-200
                ${isActive
                  ? "bg-blue-600 dark:bg-blue-500 text-white font-semibold"
                  : "font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-blue-950/50"
                }
              `}
            >
              {label}
            </NavLink>
          ))}
          <div className="flex gap-2 pt-3 mt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
            <button title="GitHub"
              onClick={() => window.open("https://github.com/avinash-Kumar2004", "_blank")}
              className={iconBtnCls}>
              <GithubIcon />
            </button>
            <button title="LinkedIn"
              onClick={() => window.open("https://www.linkedin.com/in/avinash-kumar-a226932a4", "_blank")}
              className={iconBtnCls}>
              <LinkedinIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}