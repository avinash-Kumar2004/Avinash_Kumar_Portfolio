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
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ══════════════════════════════════════════
   PROJECTS DATA — add/edit freely
══════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 1,
    title: "Management_Software",
    category: "Full-Stack",
    date: "January 2026",
    short:
      "A complete franchise management system with full admin control, user management, real-time updates, and responsive design.",
    image: "/projects/project-2.png",
    github: "https://github.com/piyush9452/managementsoftware",
    live: "https://managementsoftware.vercel.app/",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    accent: "#2563eb",
    detail: {
      overview:
        "A comprehensive franchise management software providing full administrative control. Admins can monitor, update, approve, reject, or remove user data and requests, ensuring smooth operations. The system is fully responsive and designed for efficiency across web and mobile devices.",
      features: [
        "Admin dashboard with complete authority over franchise operations",
        "User management: approve, reject, revoke, or delete user access",
        "Data monitoring and real-time updates for franchise activities",
        "Request and notification management for seamless communication",
        "Fully responsive design across desktop, tablet, and mobile",
        "Secure authentication and role-based access control",
      ],
      tech: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "JWT",
        "Tailwind CSS",
        "React Query",
      ],
    },
  },
  {
    id: 2,
    title: "DataBase_Management",
    category: "Full-Stack",
    date: "November 2025",
    short:
      "A robust database management dashboard with admin control, real-time updates, and efficient handling of large datasets.",
    image: "/projects/project-4.png",
    github: "https://github.com/piyush9452/databasemanagement",
    live: "https://your-live-link.com",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    accent: "#0ea5e9",
    detail: {
      overview:
        "A powerful organizational database management system allowing storage of 100,000+ records with advanced filtering, pagination, and real-time updates. Admins have full authority to manage data, users, and system operations, ensuring secure and efficient data handling.",
      features: [
        "Store and manage large datasets (100,000+ records) efficiently",
        "Advanced filtering, sorting, and pagination for easy data access",
        "Real-time updates across all users and workspaces",
        "Admin control: approve, edit, revoke, or delete data and users",
        "Role-based access management and activity logging",
        "Fully responsive design across web and mobile devices",
      ],
      tech: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "JWT",
        "Tailwind CSS",
        "React Query",
      ],
    },
  },
  {
    id: 3,
    title: "Ak-Chat-Web",
    category: "Full-Stack",
    date: "September 2025",
    short:
      "A real-time chat app with private rooms, file sharing, and online status indicators.",
    image: "/projects/project-3.png",
    github: "https://github.com/avinash-Kumar2004/AK-Chat-Web",
    live: "https://ak-chat-web-10.onrender.com/",
    tags: ["React Native", "Socket.io", "Node.js"],
    accent: "#ef4444",
    detail: {
      overview:
        "A real-time mobile chat application built with React Native and Socket.io. Supports private and group chats, file/image sharing, online/offline status, and push notifications.",
      features: [
        "Real-time messaging with Socket.io",
        "Private and group chat rooms",
        "Image and file sharing",
        "Online/offline user status",
        "Push notifications",
        "Message read receipts",
      ],
      tech: ["React Native", "Socket.io", "Node.js", "MongoDB", "Firebase"],
    },
  },
    {
      id: 4,
      title: "AK-Website",
      category: "Full-Stack",
      date: "September 2024",
      short:
        "A cross-platform mobile fitness tracker with workout plans, progress charts, and notifications.",
      image: "/projects/project-1.png",
      github: "https://github.com/avinash-Kumar2004/Ak-Technologies",
      live: "https://ak-technologies-pi.vercel.app/",
      tags: ["React", "Express", "Node.js"],
      accent: "#7c3aed",
    detail: {
  overview:
    "A practice React web application built to strengthen front-end and back-end skills using React and Node.js/Express. Focused on responsive design, reusable components, and showcasing various web development techniques.",
  features: [
    "Built with React for interactive UI components",
    "Reusable components to optimize development",
    "Responsive layout across devices",
    "Node.js & Express backend for API practice",
    "Showcase of multiple React patterns and practices",
    "Learning-focused project demonstrating hands-on skills",
  ],
  tech: ["React", "Node.js", "Express", "Tailwind CSS", "JavaScript"],
}
    },
  {
    id: 5,
    title: "Todo_APP",
    category: "Mobile App",
    date: "Feb 2026",
    short:
      "A production-ready RESTful API with authentication, rate limiting, and full CRUD operations.",
    image: "/projects/project-5.png",
    github: "https://github.com/avinash-Kumar2004/Todo_App",
    live: "https://your-live-link.com",
    tags: ["React-Native", "Clerk", "Convex", "Expo", "Type-Script"],
    accent: "#10b981",
    detail: {
      overview:
        "A feature-rich, real-time Todo app built with React Native, Expo, and TypeScript. Supports creating, updating, deleting, and resetting tasks, with dark & light mode, progress tracking, and user authentication via Clerk and Convex.",
      features: [
        "Create, update, delete, and reset tasks in real-time",
        "Dark and light mode for enhanced UX",
        "Track remaining vs completed tasks with progress percentage",
        "User authentication and management via Clerk",
        "Backend powered by Convex for real-time updates",
        "Built with TypeScript for type-safe development",
      ],
      tech: [
        "React Native",
        "Expo",
        "TypeScript",
        "Clerk",
        "Convex",
        "Tailwind CSS",
      ],
    },
  },
  {
    id: 6,
    title: "Portfolio Website",
    category: "Full-Stack",
    date: "March 2026",
    short:
      "This portfolio — built with React, Tailwind CSS, featuring dark mode, animations, and routing.",
    image: "/projects/project-6.png",
    github: "https://github.com/avinash-Kumar2004",
    live: "https://avinash-kumar-portfolio-zts1.vercel.app/",
    tags: ["React", "Tailwind CSS", "Vite"],
    accent: "#f59e0b",
    detail: {
      overview:
        "A fully responsive personal portfolio website built from scratch using React and Tailwind CSS. Features dark/light mode, smooth scroll animations, React Router navigation, and a clean, modern design.",
      features: [
        "Dark/Light mode with localStorage persistence",
        "Scroll-triggered animations using IntersectionObserver",
        "React Router for single-page navigation",
        "Fully responsive across all screen sizes",
        "Production-optimized with Vite",
        "SEO-friendly meta tags and Open Graph",
      ],
      tech: ["React", "Tailwind CSS", "Vite", "React Router", "JavaScript"],
    },
  },
];

const FILTERS = ["All Projects", "Full-Stack", "Mobile App"];

/* ── Icons ── */
const GithubIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ── Project Card ── */
function ProjectCard({ project, dark, index, onViewDetail }) {
  const [ref, inView] = useInView(0.1);
  const [imgHovered, setImgHovered] = useState(false);
  const col = index % 3;
  const delay = col * 90;

  const cardBg = dark ? "#111827" : "#ffffff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const titleCol = dark ? "#f1f5f9" : "#0f172a";
  const dateCol = dark ? "#64748b" : "#94a3b8";
  const descCol = dark ? "#94a3b8" : "#475569";
  const tagBg = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const tagBorder = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const tagText = dark ? "#94a3b8" : "#64748b";
  const catBg = dark ? `${project.accent}25` : `${project.accent}15`;
  const divCol = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const btnBg = dark ? "rgba(255,255,255,0.04)" : "#f8fafc";
  const btnBorder = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const btnText = dark ? "#94a3b8" : "#475569";

  const initialTransform =
    col === 0
      ? "translateX(-50px)"
      : col === 2
        ? "translateX(50px)"
        : "translateY(40px)";

  return (
    <div
      ref={ref}
      className="group flex flex-col rounded-2xl overflow-hidden cursor-default"
      style={{
        background: cardBg,
        border: `1.5px solid ${cardBorder}`,
        boxShadow: dark
          ? "0 2px 16px rgba(0,0,0,0.4)"
          : "0 2px 16px rgba(0,0,0,0.06)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0,0)" : initialTransform,
        transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                     box-shadow 0.25s ease`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = dark
          ? `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}33`
          : `0 16px 48px rgba(0,0,0,0.12), 0 0 0 1px ${project.accent}22`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = dark
          ? "0 2px 16px rgba(0,0,0,0.4)"
          : "0 2px 16px rgba(0,0,0,0.06)";
      }}
    >
      {/* ── Image with hover icons ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: "200px" }}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: imgHovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback bg */}
        <div
          style={{
            display: "none",
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${project.accent}33, ${project.accent}11)`,
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
          }}
        >
          💻
        </div>

        {/* Dark overlay on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            opacity: imgHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* GitHub + Live icons */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            opacity: imgHovered ? 1 : 0,
            transform: imgHovered ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.28)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <GithubIcon />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            title="Live Demo"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.28)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <ExternalIcon />
          </a>
        </div>

        {/* Category badge */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: catBg,
            border: `1px solid ${project.accent}44`,
            borderRadius: "8px",
            padding: "4px 10px",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            style={{
              fontFamily: "'Outfit',sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: project.accent,
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title + date */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: "clamp(16px,1.5vw,18px)",
              fontWeight: 700,
              color: titleCol,
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
              transition: "color 0.4s ease",
            }}
          >
            {project.title}
          </h3>
        </div>

        <div
          className="flex items-center gap-1.5 mb-3"
          style={{ color: dateCol }}
        >
          <CalendarIcon />
          <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: "12px" }}>
            {project.date}
          </span>
        </div>

        <p
          style={{
            fontFamily: "'Outfit',sans-serif",
            fontSize: "13.5px",
            lineHeight: 1.7,
            color: descCol,
            marginBottom: "16px",
            flex: 1,
            transition: "color 0.4s ease",
          }}
        >
          {project.short}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "11.5px",
                fontWeight: 500,
                padding: "3px 10px",
                borderRadius: "6px",
                background: tagBg,
                border: `1px solid ${tagBorder}`,
                color: tagText,
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "11.5px",
                fontWeight: 500,
                padding: "3px 10px",
                borderRadius: "6px",
                background: tagBg,
                border: `1px solid ${tagBorder}`,
                color: tagText,
              }}
            >
              +{project.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Divider */}
        <div
          style={{ height: "1px", background: divCol, marginBottom: "16px" }}
        />

        {/* View Details button */}
        <button
          onClick={() => onViewDetail(project)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            background: btnBg,
            border: `1.5px solid ${btnBorder}`,
            color: btnText,
            fontFamily: "'Outfit',sans-serif",
            fontSize: "13.5px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = project.accent;
            e.currentTarget.style.borderColor = project.accent;
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = btnBg;
            e.currentTarget.style.borderColor = btnBorder;
            e.currentTarget.style.color = btnText;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

/* ── Detail Panel ── */
function DetailPanel({ project, dark, onClose }) {
  const [imgRef, imgInView] = useInView(0.1);
  const [textRef, textInView] = useInView(0.1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 10);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const overlayBg = dark ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)";
  const panelBg = dark ? "#0d1117" : "#ffffff";
  const headCol = dark ? "#f1f5f9" : "#0f172a";
  const subCol = dark ? "#94a3b8" : "#475569";
  const featureBg = dark ? "rgba(255,255,255,0.04)" : "#f8fafc";
  const featureBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const tagBg = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const tagBorder = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const tagText = dark ? "#94a3b8" : "#64748b";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: overlayBg,
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.3s ease",
        overflowY: "auto",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px 16px 40px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          background: panelBg,
          borderRadius: "24px",
          overflow: "hidden",
          transform: mounted ? "translateY(0)" : "translateY(40px)",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          boxShadow: dark
            ? "0 32px 80px rgba(0,0,0,0.7)"
            : "0 32px 80px rgba(0,0,0,0.2)",
        }}
      >
        {/* Close btn */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 10,
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
            border: "none",
            cursor: "pointer",
            color: dark ? "#e2e8f0" : "#0f172a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = dark
              ? "rgba(255,255,255,0.2)"
              : "rgba(0,0,0,0.14)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = dark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.08)";
          }}
        >
          <CloseIcon />
        </button>

        {/* ── Two column layout ── */}
        <div className="flex flex-col lg:flex-row">
          {/* LEFT — Image slides from left */}
          <div
            ref={imgRef}
            className="w-full lg:w-[45%] flex-shrink-0"
            style={{
              opacity: imgInView ? 1 : 0,
              transform: imgInView ? "translateX(0)" : "translateX(-50px)",
              transition:
                "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div
              style={{
                position: "relative",
                height: "100%",
                minHeight: "300px",
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  minHeight: "300px",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                style={{
                  display: "none",
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(135deg,${project.accent}44,${project.accent}11)`,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "80px",
                }}
              >
                💻
              </div>

              {/* Overlay info */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent,rgba(0,0,0,0.75))",
                  padding: "24px 20px 20px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#ffffff",
                    marginBottom: "6px",
                  }}
                >
                  {project.title}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      background: project.accent,
                      color: "#fff",
                      fontFamily: "'Outfit',sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    {project.category}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Outfit',sans-serif",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {project.date}
                  </span>
                </div>

                {/* GitHub + Live */}
                <div className="flex gap-2 mt-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      borderRadius: "8px",
                      padding: "6px 12px",
                      color: "#fff",
                      textDecoration: "none",
                      fontFamily: "'Outfit',sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.28)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.15)")
                    }
                  >
                    <GithubIcon /> GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: project.accent,
                      borderRadius: "8px",
                      padding: "6px 12px",
                      color: "#fff",
                      textDecoration: "none",
                      fontFamily: "'Outfit',sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.85")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    <ExternalIcon /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Text slides from right */}
          <div
            ref={textRef}
            className="flex-1 p-8 overflow-y-auto"
            style={{
              opacity: textInView ? 1 : 0,
              transform: textInView ? "translateX(0)" : "translateX(50px)",
              transition:
                "opacity 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s",
            }}
          >
            {/* Overview */}
            <div className="mb-6">
              <h4
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: project.accent,
                  marginBottom: "10px",
                }}
              >
                Overview
              </h4>
              <p
                style={{
                  fontFamily: "'Outfit',sans-serif",
                  fontSize: "14.5px",
                  lineHeight: 1.75,
                  color: subCol,
                  transition: "color 0.4s ease",
                }}
              >
                {project.detail.overview}
              </p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: project.accent,
                  marginBottom: "10px",
                }}
              >
                Key Features
              </h4>
              <div className="flex flex-col gap-2">
                {project.detail.features.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      background: featureBg,
                      border: `1px solid ${featureBorder}`,
                      borderRadius: "10px",
                      padding: "10px 14px",
                    }}
                  >
                    <span
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "6px",
                        background: project.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      <CheckIcon />
                    </span>
                    <span
                      style={{
                        fontFamily: "'Outfit',sans-serif",
                        fontSize: "13.5px",
                        color: subCol,
                        lineHeight: 1.5,
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: project.accent,
                  marginBottom: "10px",
                }}
              >
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.detail.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "'Outfit',sans-serif",
                      fontSize: "12.5px",
                      fontWeight: 500,
                      padding: "5px 12px",
                      borderRadius: "8px",
                      background: tagBg,
                      border: `1px solid ${tagBorder}`,
                      color: tagText,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PROJECTS SECTION
══════════════════════════════════════════ */
export default function Project() {
  const { dark } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [selectedProject, setSelectedProject] = useState(null);
  const [headerRef, headerInView] = useInView(0.2);

  useEffect(() => {
    if (document.getElementById("proj-styles")) return;
    const s = document.createElement("style");
    s.id = "proj-styles";
    s.textContent = `
      .proj-font-display { font-family:'Plus Jakarta Sans',sans-serif !important; }
      .proj-font-body    { font-family:'Outfit',sans-serif !important; }
    `;
    document.head.appendChild(s);
    if (!document.getElementById("proj-fonts")) {
      const l = document.createElement("link");
      l.id = "proj-fonts";
      l.rel = "stylesheet";
      l.href =
        "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  const filtered =
    activeFilter === "All Projects"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const sectionBg = dark
    ? "linear-gradient(180deg,#0b0b10 0%,#0d1117 100%)"
    : "linear-gradient(180deg,#ffffff 0%,#f8fbff 100%)";
  const headingCol = dark ? "#f1f5f9" : "#0f172a";
  const subCol = dark ? "#64748b" : "#94a3b8";
  const badgeBg = dark ? "rgba(30,58,138,0.3)" : "rgba(219,234,254,0.7)";
  const badgeText = dark ? "#93c5fd" : "#1d4ed8";
  const badgeBorder = dark ? "rgba(59,130,246,0.25)" : "rgba(147,197,253,0.6)";
  const filterActiveBg = "#2563eb";
  const filterInactiveBg = dark ? "rgba(255,255,255,0.05)" : "#ffffff";
  const filterInactiveBorder = dark
    ? "rgba(255,255,255,0.1)"
    : "rgba(0,0,0,0.1)";
  const filterInactiveText = dark ? "#94a3b8" : "#475569";

  return (
    <section
      className="relative w-full py-10 sm:py-28 overflow-hidden"
      style={{ background: sectionBg, transition: "background 0.4s ease" }}
    >
      {/* Bg glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "300px",
          borderRadius: "50%",
          pointerEvents: "none",
          background: dark
            ? "radial-gradient(ellipse,rgba(37,99,235,0.06) 0%,transparent 70%)"
            : "radial-gradient(ellipse,rgba(37,99,235,0.04) 0%,transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* ══ HEADER ══ */}
        <div
          ref={headerRef}
          className="text-center mb-12"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: badgeBg, border: `1px solid ${badgeBorder}` }}
          >
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#3b82f6",
              }}
            />
            <span
              className="proj-font-body text-[12.5px] font-semibold tracking-wide"
              style={{ color: badgeText }}
            >
              MY WORK
            </span>
          </div>

          <h2
            className="proj-font-display font-bold mb-4"
            style={{
              fontSize: "clamp(32px,4vw,48px)",
              color: headingCol,
              letterSpacing: "-0.02em",
              transition: "color 0.4s ease",
            }}
          >
            My Projects
          </h2>

          <div
            style={{
              width: "52px",
              height: "4px",
              borderRadius: "2px",
              background: "linear-gradient(90deg,#2563eb,#0ea5e9)",
              margin: "0 auto 16px",
            }}
          />

          <p
            className="proj-font-body text-[16px] max-w-lg mx-auto leading-relaxed"
            style={{ color: subCol, transition: "color 0.4s ease" }}
          >
            Here are some of the projects I've built using modern web and mobile
            technologies.
          </p>
        </div>

        {/* ══ FILTER TABS ══ */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "13.5px",
                fontWeight: 600,
                padding: "8px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background:
                  activeFilter === f ? filterActiveBg : filterInactiveBg,
                border: `1.5px solid ${activeFilter === f ? filterActiveBg : filterInactiveBorder}`,
                color: activeFilter === f ? "#ffffff" : filterInactiveText,
                boxShadow:
                  activeFilter === f
                    ? "0 4px 16px rgba(37,99,235,0.35)"
                    : "none",
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== f)
                  e.currentTarget.style.borderColor = "#2563eb";
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== f)
                  e.currentTarget.style.borderColor = filterInactiveBorder;
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ══ CARDS GRID ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              dark={dark}
              index={i}
              onViewDetail={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* ══ DETAIL PANEL ══ */}
      {selectedProject && (
        <DetailPanel
          project={selectedProject}
          dark={dark}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
