import { useState, useEffect, useRef } from "react";
import { useTheme } from "../App";

/* ── DATA ── */
const experiences = [
  {
  id: 1,
  title: "Full Stack Web Developer Intern",
  company: "Simtrak Solution ",
  location: "Uttar Pradesh, India (Remote)",
  period: "February 2026 – Present",
  category: "Full Stack",
  badge: "Internship",
  badgeColor: "bg-blue-600 text-white",

  responsibilities: [
    "Developed and maintained full-stack web applications using MERN stack (MongoDB, Express.js, React.js, Node.js)",
    "Built responsive and user-friendly frontend interfaces with React.js and modern UI practices",
    "Designed and integrated RESTful APIs for seamless communication between frontend and backend",
    "Implemented authentication and authorization using JWT and secure session handling",
    "Collaborated with team members to debug, optimize, and deploy scalable web applications",
  ],

  projects: [
    {
      name: "Full Stack Web Applications",
      desc: "Worked on real-world web applications, handling both frontend and backend development, including API integration, authentication, and performance optimization.",
      tags: ["React.js", "Node.js", "MongoDB", "Express.js", "JWT Auth", "REST API"],
    },
  ],
},
{
  id: 2,
  title: "Project Lead (Intern)",
  company: "Simtrak Solution",
  location: "Remote",
  period: "2026",
  category: "Leadership",
  badge: "Leadership",
  badgeColor: "bg-orange-500 text-white",

  responsibilities: [
    "Led a small development team to successfully deliver a web-based project within deadlines",
    "Coordinated task distribution, progress tracking, and team communication",
    "Collaborated with developers to resolve technical challenges and ensure smooth workflow",
    "Monitored project requirements and ensured proper implementation of features",
    "Maintained documentation and reported progress updates to mentors",
  ],

  projects: [
    {
      name: "Team-Based Web Project",
      desc: "Managed and contributed to a collaborative web development project, focusing on task management, teamwork, and timely delivery.",
      tags: ["Team Leadership", "Project Management", "Collaboration", "Agile Basics"],
    },
  ],
},
  {
    id:3,
      title: "Web Developer Intern",
    company: "Zidio Development",
    location: "Remote",
    period: "June 2025 - August 2025",
    category: "Full Stack",
    badge: "Internship",
    badgeColor: "bg-green-600 text-white",

    responsibilities: [
      "Developing and maintaining full-stack web applications using MERN stack (MongoDB, Express.js, React.js, Node.js)",
      "Building responsive and reusable UI components with React.js and modern CSS frameworks",
      "Designing and integrating RESTful APIs for seamless frontend-backend communication",
      "Implementing authentication and authorization using JWT",
      "Debugging issues and optimizing application performance for better user experience",
    ],

    projects: [
      {
        name: "Full Stack Web Applications",
        desc: "Worked on real-world applications involving frontend UI development, backend API creation, and database integration.",
        tags: ["React.js", "Node.js", "MongoDB", "Express.js", "JWT", "REST API"],
      },
    ],
},

{
  id: 4,
  title: "Full Stack Development Learner",
  company: "Self-Learning",
  location: "Remote",
  period: "2025 – Present",
  category: "Learning",
  badge: "Learning",
  badgeColor: "bg-indigo-500 text-white",

  responsibilities: [
    "Learned full-stack web development through hands-on project building",
    "Built multiple applications to understand frontend, backend, and database integration",
    "Practiced REST API development, authentication, and CRUD operations",
    "Improved problem-solving and debugging skills through real-world scenarios",
  ],

  projects: [
    {
      name: "Todo App",
      desc: "A task management application with add, update, and delete features to manage daily activities.",
      tags: ["React.js", "Node.js", "MongoDB", "CRUD"],
    },
    {
      name: "Recipe Finder App",
      desc: "A web app that allows users to search and explore recipes using external APIs.",
      tags: ["React.js", "API Integration", "JavaScript", "CSS"],
    },
    {
      name: "Instagram Clone",
      desc: "A social media app clone with features like user authentication, posts, and feed system.",
      tags: ["React.js", "Node.js", "MongoDB", "JWT", "Full Stack"],
    },
  ],
}

];

const CATEGORIES = ["All", "Leadership", "Full Stack", "Learning"];


/* ── CARD COMPONENT ── */
function ExperienceCard({ exp, index, dark }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: 0,
        transform: "translateY(32px)",
        transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s`,
        background: dark ? "#111827" : "#ffffff",
        border: `1.5px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.06)",
        transition2: "all 0.3s ease",
      }}
    >
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-bold leading-tight" style={{ color: dark ? "#f1f5f9" : "#0f172a" }}>
            {exp.title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${exp.badgeColor}`}>
            {exp.badge}
          </span>
        </div>

        <div className="flex flex-col gap-1 text-sm mb-4" style={{ color: dark ? "#94a3b8" : "#64748b" }}>
          <span className="flex items-center gap-2"><span className="text-base">🏢</span> {exp.company}</span>
          <span className="flex items-center gap-2"><span className="text-base">📍</span> {exp.location}</span>
          <span className="flex items-center gap-2"><span className="text-base">📅</span> {exp.period}</span>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm uppercase tracking-wider" style={{ color: dark ? "#e2e8f0" : "#374151" }}>
            Responsibilities
          </h4>
          <ul className="space-y-1.5">
            {(expanded ? exp.responsibilities : exp.responsibilities.slice(0, 3)).map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: dark ? "#cbd5e1" : "#4b5563" }}>
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>
          {exp.responsibilities.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-xs font-medium transition-colors"
              style={{ color: "#3b82f6" }}
            >
              {expanded ? "Show less ▲" : `+${exp.responsibilities.length - 3} more ▼`}
            </button>
          )}
        </div>
      </div>

      {exp.projects?.length > 0 && (
        <div className="px-6 pb-6 pt-4" style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` }}>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider" style={{ color: dark ? "#e2e8f0" : "#374151" }}>
            Key Projects
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exp.projects.map((proj, pi) => (
              <div key={pi} style={{
                borderRadius: "12px", padding: "16px",
                background: dark ? "rgba(255,255,255,0.04)" : "#f8fafc",
                border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
              }}>
                <p className="font-semibold text-sm mb-1" style={{ color: dark ? "#f1f5f9" : "#1e293b" }}>{proj.name}</p>
                <p className="text-xs mb-3 leading-relaxed" style={{ color: dark ? "#94a3b8" : "#64748b" }}>{proj.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tag, ti) => (
                    <span key={ti} className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ background: dark ? "rgba(255,255,255,0.1)" : "#e2e8f0", color: dark ? "#cbd5e1" : "#475569" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



/* ── MAIN COMPONENT ── */
export default function Experienceing() {
  const { dark } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(-20px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  const filtered =
    activeCategory === "All"
      ? experiences
      : experiences.filter((e) => e.category === activeCategory);

  const stats = [
    { label: "Month Experience", value: "6+" },
    { label: "Companies", value: "2"},
    { label: "Projects Shipped", value: "5+" },
    { label: "Domains Covered", value: "3" },
  ];

  return (
    <section
      className="min-h-screen transition-colors duration-300 py-20 px-4"
      style={{
        background: dark
          ? "linear-gradient(180deg,#0b0b10 0%,#0d1117 100%)"
          : "linear-gradient(180deg,#f8fbff 0%,#f0f7ff 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight" style={{ color: dark ? "#f1f5f9" : "#0f172a" }}>
            My Experience
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: dark ? "#64748b" : "#64748b" }}>
From building projects during my learning phase to working as a full-stack intern, I focus on developing real-world applications, improving my skills, and growing as a developer.          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {stats.map((s, i) => (
            <div key={i} style={{
              borderRadius: "16px", padding: "16px", textAlign: "center",
              background: dark ? "#111827" : "#ffffff",
              border: `1.5px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
              boxShadow: dark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 2px 10px rgba(0,0,0,0.05)",
            }}>
              <p className="text-2xl font-black" style={{ color: "#3b82f6" }}>{s.value}</p>
              <p className="text-xs mt-1 font-medium" style={{ color: dark ? "#94a3b8" : "#64748b" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 p-2 w-fit mx-auto" style={{
          borderRadius: "16px",
          background: dark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
          border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
        }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 18px", borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                border: "none", cursor: "pointer", transition: "all 0.2s ease",
                background: activeCategory === cat ? "#2563eb" : "transparent",
                color: activeCategory === cat ? "#ffffff" : (dark ? "#94a3b8" : "#64748b"),
                boxShadow: activeCategory === cat ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {filtered.length > 0 ? (
            filtered.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} dark={dark} />
            ))
          ) : (
            <div className="text-center py-16 text-gray-400 dark:text-gray-600 text-base">
              No experiences in this category.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}