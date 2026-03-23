import { useEffect, useRef, useState } from "react";
import { useTheme } from "../App";
import { API } from "../utils/api";

/* ── useInView ── */
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
   BLOG DATA — add more posts here freely
   Images from: public/blog/img1.png, img2.png ...
══════════════════════════════════════════ */
const POSTS = [
  {
    id: 1,
    title: "Getting Started with React: A Beginner's Complete Guide",
    category: "Frontend",
    date: "March 10, 2026",
    readTime: "8 min read",
    excerpt: "Learn how to set up your first React project, understand components, props, state, and hooks — everything you need to start building modern UIs.",
    image: "/blog/img1.webp",
    accent: "#2563eb",
    slug: "getting-started-react",
  },
  {
    id: 2,
    title: "Building RESTful APIs with Node.js & Express",
    category: "Backend",
    date: "February 20, 2026",
    readTime: "10 min read",
    excerpt: "A comprehensive guide to building scalable REST APIs using Node.js, Express, JWT authentication, and MongoDB as the database.",
    image: "/blog/img2.png",
    accent: "#10b981",
    slug: "nodejs-express-rest-api",
  },
  {
    id: 3,
    title: "Top New Technologies Every Developer Should Learn in 2026",
    category: "Technology",
    date: "January 15, 2026",
    readTime: "6 min read",
    excerpt: "Exploring the latest trends — from AI-powered dev tools, edge computing, Convex real-time databases, to the rise of full-stack TypeScript.",
    image: "/blog/img3.webp",
    accent: "#7c3aed",
    slug: "new-tech-2026",
  },
  {
    id: 4,
    title: "React Native vs Flutter: Which to Choose in 2026?",
    category: "Frontend",
    date: "December 28, 2025",
    readTime: "9 min read",
    excerpt: "A detailed comparison of React Native and Flutter — performance, ecosystem, developer experience, and which one suits your next mobile project.",
    image: "/blog/img4.jpg",
    accent: "#0ea5e9",
    slug: "react-native-vs-flutter",
  },
  {
    id: 5,
    title: "MongoDB vs PostgreSQL: Choosing the Right Database",
    category: "Backend",
    date: "November 18, 2025",
    readTime: "7 min read",
    excerpt: "When should you use NoSQL vs SQL? A practical guide comparing MongoDB and PostgreSQL with real use cases, performance insights, and schema design tips.",
    image: "/blog/img5.jpg",
    accent: "#f59e0b",
    slug: "mongodb-vs-postgresql",
  },
  {
    id: 6,
    title: "Mastering TypeScript: From Basics to Advanced Patterns",
    category: "Technology",
    date: "October 5, 2025",
    readTime: "12 min read",
    excerpt: "Deep dive into TypeScript — generics, utility types, decorators, and advanced patterns to write safer, more maintainable JavaScript applications.",
    image: "/blog/img6.jpeg",
    accent: "#ef4444",
    slug: "typescript-advanced",
  },
];

const FILTERS = ["All Posts", "Frontend", "Backend", "Technology"];

/* ── Icons ── */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const CalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

/* ── Single Blog Card ── */
function BlogCard({ post, dark, index }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const col = index % 3;
  const delay = col * 90;
  const initialTransform =
    col === 0 ? "translateX(-50px)" :
    col === 2 ? "translateX(50px)"  : "translateY(40px)";

  const cardBg     = dark ? "#111827" : "#ffffff";
  const cardBorder = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const titleCol   = dark ? "#f1f5f9" : "#0f172a";
  const metaCol    = dark ? "#64748b" : "#94a3b8";
  const descCol    = dark ? "#94a3b8" : "#475569";
  const divCol     = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:   cardBg,
        border:       `1.5px solid ${hovered ? post.accent + "55" : cardBorder}`,
        borderRadius: "18px",
        overflow:     "hidden",
        display:      "flex",
        flexDirection:"column",
        height:       "100%",
        cursor:       "default",
        boxShadow: hovered
          ? (dark ? `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px ${post.accent}22` : `0 16px 48px rgba(0,0,0,0.1), 0 0 0 1px ${post.accent}18`)
          : (dark ? "0 2px 14px rgba(0,0,0,0.4)" : "0 2px 14px rgba(0,0,0,0.06)"),
        opacity:   inView ? 1 : 0,
        transform: inView
          ? (hovered ? "translateY(-5px)" : "translate(0,0)")
          : initialTransform,
        transition: `
          opacity   0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
          transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
          border-color 0.25s ease, box-shadow 0.25s ease
        `,
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden", flexShrink: 0 }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback */}
        <div style={{
          display: "none", position: "absolute", inset: 0,
          background: `linear-gradient(135deg,${post.accent}33,${post.accent}11)`,
          alignItems: "center", justifyContent: "center",
          fontSize: "52px",
        }}>
          {post.category === "Frontend" ? "🎨" : post.category === "Backend" ? "⚙️" : "🚀"}
        </div>

        {/* Category badge */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          background: post.accent,
          borderRadius: "8px", padding: "4px 10px",
          boxShadow: `0 2px 8px ${post.accent}55`,
        }}>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"11px", fontWeight:700, color:"#fff" }}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "22px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Meta */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"5px", color: metaCol }}>
            <CalIcon />
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"12px" }}>{post.date}</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"5px", color: metaCol }}>
            <ClockIcon />
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"12px" }}>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: "clamp(15px,1.4vw,17px)",
          fontWeight: 800,
          color: titleCol,
          letterSpacing: "-0.01em",
          lineHeight: 1.35,
          marginBottom: "10px",
          transition: "color 0.3s ease",
        }}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p style={{
          fontFamily: "'Outfit',sans-serif",
          fontSize: "13.5px",
          lineHeight: 1.7,
          color: descCol,
          flex: 1,
          marginBottom: "16px",
          transition: "color 0.3s ease",
        }}>
          {post.excerpt}
        </p>

        <div style={{ height:"1px", background: divCol, marginBottom:"16px" }} />

        {/* Read More */}
        <a
          href={`/blog/${post.slug}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontFamily: "'Outfit',sans-serif", fontSize: "13.5px", fontWeight: 700,
            color: post.accent, textDecoration: "none",
            transition: "gap 0.2s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.gap = "10px"; }}
          onMouseLeave={e => { e.currentTarget.style.gap = "6px"; }}
        >
          Read more <ArrowIcon />
        </a>
      </div>
    </div>
  );
}

/* ── Subscribe Section ── */
function SubscribeSection({ dark }) {
  const [ref, inView] = useInView(0.2);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [msg, setMsg] = useState("");

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMsg("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    try {
     const res = await fetch(API.subscribe, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});
      
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMsg("🎉 Subscribed! You'll receive updates soon.");
        setEmail("");
      } else {
        setStatus("error");
        setMsg(data.message || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMsg("Server error. Please try again later.");
    }
    setTimeout(() => { setStatus("idle"); setMsg(""); }, 4000);
  };

  return (
    <div
      ref={ref}
      style={{
        marginTop: "80px",
        borderRadius: "24px",
        overflow: "hidden",
        background: "linear-gradient(135deg,#2563eb 0%,#0ea5e9 50%,#10b981 100%)",
        backgroundSize: "200% 200%",
        padding: "64px 32px",
        textAlign: "center",
        position: "relative",
        opacity:   inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* Dot pattern */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.1) 1px,transparent 1px)",
        backgroundSize:"24px 24px",
      }} />

      <div style={{ position:"relative", maxWidth:"520px", margin:"0 auto" }}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:"8px",
          background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)",
          border:"1px solid rgba(255,255,255,0.25)", borderRadius:"50px",
          padding:"6px 16px", marginBottom:"20px",
        }}>
          <MailIcon />
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"12px", fontWeight:700, color:"#fff", letterSpacing:"0.06em", textTransform:"uppercase" }}>
            Newsletter
          </span>
        </div>

        <h3 style={{
          fontFamily:"'Plus Jakarta Sans',sans-serif",
          fontSize:"clamp(24px,3vw,36px)", fontWeight:800,
          color:"#ffffff", letterSpacing:"-0.02em", marginBottom:"12px",
        }}>
          Stay Updated
        </h3>

        <p style={{
          fontFamily:"'Outfit',sans-serif",
          fontSize:"clamp(14px,1.4vw,16px)",
          color:"rgba(255,255,255,0.8)", lineHeight:1.7, marginBottom:"28px",
        }}>
          Subscribe to get notified when I publish new articles about
          React, Node.js, mobile development, and the latest in tech.
        </p>

        {/* Input row */}
        <div style={{
          display:"flex", gap:"10px",
          flexDirection: "row",
          justifyContent:"center", flexWrap:"wrap",
        }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubscribe()}
            placeholder="Enter your email"
            style={{
              flex:"1", minWidth:"220px", maxWidth:"340px",
              padding:"12px 18px", borderRadius:"12px",
              background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)",
              border:"1.5px solid rgba(255,255,255,0.3)",
              color:"#ffffff", outline:"none",
              fontFamily:"'Outfit',sans-serif", fontSize:"14px",
              transition:"border-color 0.2s ease",
            }}
            onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.7)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.3)"}
          />
          <button
            onClick={handleSubscribe}
            disabled={status === "loading"}
            style={{
              padding:"12px 28px", borderRadius:"12px",
              background: status === "loading" ? "rgba(15,23,42,0.5)" : "rgba(15,23,42,0.85)",
              backdropFilter:"blur(8px)",
              border:"1.5px solid rgba(255,255,255,0.2)",
              color:"#ffffff", fontFamily:"'Outfit',sans-serif",
              fontSize:"14px", fontWeight:700, cursor: status === "loading" ? "not-allowed" : "pointer",
              transition:"all 0.2s ease", whiteSpace:"nowrap",
            }}
            onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.background="rgba(37,99,235,0.9)"; }}
            onMouseLeave={e => { if (status !== "loading") e.currentTarget.style.background="rgba(15,23,42,0.85)"; }}
          >
            {status === "loading" ? "Sending..." : "Subscribe"}
          </button>
        </div>

        {/* Status message */}
        {msg && (
          <p style={{
            marginTop:"14px",
            fontFamily:"'Outfit',sans-serif", fontSize:"13.5px", fontWeight:600,
            color: status === "success" ? "#ffffff" : "#fca5a5",
          }}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN BLOG PAGE
══════════════════════════════════════════ */
export default function Blogs() {
  const { dark } = useTheme();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Posts");
  const [headerRef, headerInView] = useInView(0.2);

  useEffect(() => {
    if (document.getElementById("blog-styles")) return;
    const s = document.createElement("style");
    s.id = "blog-styles";
    s.textContent = `
      .blog-font-display { font-family:'Plus Jakarta Sans',sans-serif !important; }
      .blog-font-body    { font-family:'Outfit',sans-serif !important; }
      ::placeholder { color: rgba(148,163,184,0.6) !important; }
    `;
    document.head.appendChild(s);
    if (!document.getElementById("blog-fonts")) {
      const l = document.createElement("link");
      l.id = "blog-fonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  /* Filter + Search */
  const filtered = POSTS.filter(p => {
    const matchCat = activeFilter === "All Posts" || p.category === activeFilter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const sectionBg  = dark ? "linear-gradient(180deg,#0b0b10 0%,#0d1117 100%)" : "linear-gradient(180deg,#f8fbff 0%,#f0f7ff 100%)";
  const headingCol = dark ? "#f1f5f9" : "#0f172a";
  const subCol     = dark ? "#64748b" : "#64748b";
  const badgeBg    = dark ? "rgba(30,58,138,0.3)"   : "rgba(219,234,254,0.8)";
  const badgeText  = dark ? "#93c5fd"               : "#1d4ed8";
  const badgeBorder= dark ? "rgba(59,130,246,0.25)" : "rgba(147,197,253,0.6)";
  const searchBg   = dark ? "rgba(255,255,255,0.05)" : "#ffffff";
  const searchBorder = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const searchText = dark ? "#e2e8f0" : "#0f172a";
  const filterInactiveBg = dark ? "rgba(255,255,255,0.05)" : "#ffffff";
  const filterInactiveBorder = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const filterInactiveText = dark ? "#94a3b8" : "#475569";
  const emptyCol   = dark ? "#475569" : "#94a3b8";

  return (
    <section
      className="relative w-full py-20 sm:py-28 overflow-hidden"
      style={{ background: sectionBg, transition: "background 0.4s ease" }}
    >
      {/* Bg glow */}
      <div style={{
        position:"absolute", top:"5%", left:"50%", transform:"translateX(-50%)",
        width:"700px", height:"350px", borderRadius:"50%", pointerEvents:"none",
        background: dark
          ? "radial-gradient(ellipse,rgba(37,99,235,0.07) 0%,transparent 65%)"
          : "radial-gradient(ellipse,rgba(37,99,235,0.04) 0%,transparent 65%)",
      }} />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ══ HEADER ══ */}
        <div
          ref={headerRef}
          className="text-center mb-12"
          style={{
            opacity:    headerInView ? 1 : 0,
            transform:  headerInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: badgeBg, border:`1px solid ${badgeBorder}` }}>
            <span style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background:"#3b82f6" }} />
            <span className="blog-font-body text-[12.5px] font-semibold tracking-wide" style={{ color: badgeText }}>
              BLOG & ARTICLES
            </span>
          </div>

          <h2 className="blog-font-display font-bold mb-4"
            style={{ fontSize:"clamp(32px,4vw,52px)", color:headingCol, letterSpacing:"-0.02em", transition:"color 0.4s ease" }}>
            Blog & Articles
          </h2>

          <div style={{ width:"52px", height:"4px", borderRadius:"2px",
            background:"linear-gradient(90deg,#2563eb,#0ea5e9)", margin:"0 auto 16px" }} />

          <p className="blog-font-body text-[16px] max-w-[520px] mx-auto leading-relaxed"
            style={{ color:subCol, transition:"color 0.4s ease" }}>
            Sharing insights, tutorials, and best practices in React,
            Node.js, mobile development, and new technologies.
          </p>

          {/* Search */}
          <div style={{
            display:"flex", alignItems:"center", gap:"10px",
            maxWidth:"480px", margin:"28px auto 0",
            background: searchBg,
            border:`1.5px solid ${searchBorder}`,
            borderRadius:"12px", padding:"10px 16px",
            boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.06)",
            transition:"all 0.3s ease",
          }}>
            <span style={{ color: dark ? "#64748b" : "#94a3b8", flexShrink:0 }}><SearchIcon /></span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              style={{
                flex:1, background:"transparent", border:"none", outline:"none",
                fontFamily:"'Outfit',sans-serif", fontSize:"14px",
                color: searchText,
              }}
            />
          </div>
        </div>

        {/* ══ FILTER TABS ══ */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                fontFamily:"'Outfit',sans-serif", fontSize:"13.5px", fontWeight:600,
                padding:"8px 20px", borderRadius:"10px", cursor:"pointer",
                transition:"all 0.2s ease",
                background: activeFilter === f ? "#2563eb" : filterInactiveBg,
                border:`1.5px solid ${activeFilter === f ? "#2563eb" : filterInactiveBorder}`,
                color: activeFilter === f ? "#ffffff" : filterInactiveText,
                boxShadow: activeFilter === f ? "0 4px 16px rgba(37,99,235,0.35)" : "none",
              }}
              onMouseEnter={e => { if (activeFilter !== f) e.currentTarget.style.borderColor="#2563eb"; }}
              onMouseLeave={e => { if (activeFilter !== f) e.currentTarget.style.borderColor=filterInactiveBorder; }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ══ CARDS ══ */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filtered.map((post, i) => (
              <BlogCard key={post.id} post={post} dark={dark} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div style={{ fontSize:"48px", marginBottom:"16px" }}>🔍</div>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"16px", color:emptyCol }}>
              No articles found for "<strong>{search}</strong>"
            </p>
          </div>
        )}

        {/* ══ SUBSCRIBE ══ */}
        <SubscribeSection dark={dark} />

      </div>
    </section>
  );
}