// src/components/BlogPost.jsx
import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../App";

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

const BLOG_POSTS = {
  "getting-started-react": {
    title: "Getting Started with React: A Beginner's Complete Guide",
    category: "Frontend",
    date: "March 10, 2026",
    readTime: "8 min read",
    image: "/blog/img1.png",
    accent: "#2563eb",
    content: [
      {
        type: "intro",
        text: "React is one of the most popular JavaScript libraries for building user interfaces. Created by Facebook, it allows developers to build fast, scalable, and simple web applications using a component-based architecture.",
      },
      {
        type: "heading",
        text: "What is React?",
      },
      {
        type: "paragraph",
        text: "React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components. React only updates what needs to be changed, making it incredibly fast.",
      },
      {
        type: "heading",
        text: "Setting Up Your First React Project",
      },
      {
        type: "code",
        lang: "bash",
        text: `# Using Vite (recommended)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev`,
      },
      {
        type: "heading",
        text: "Understanding Components",
      },
      {
        type: "paragraph",
        text: "Components are the building blocks of React. Think of them as custom HTML elements. There are two types — functional components (modern, recommended) and class components (legacy).",
      },
      {
        type: "code",
        lang: "jsx",
        text: `// Functional Component
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Using it
<Greeting name="Avinash" />`,
      },
      {
        type: "heading",
        text: "State & useState Hook",
      },
      {
        type: "paragraph",
        text: "State is data that can change over time. When state changes, React re-renders the component. The useState hook lets you add state to functional components.",
      },
      {
        type: "code",
        lang: "jsx",
        text: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
      },
      {
        type: "heading",
        text: "useEffect Hook",
      },
      {
        type: "paragraph",
        text: "useEffect lets you perform side effects in function components — like fetching data, directly updating the DOM, and timers.",
      },
      {
        type: "code",
        lang: "jsx",
        text: `import { useState, useEffect } from "react";

function UserData() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []); // empty array = run once on mount

  return <div>{user?.name}</div>;
}`,
      },
      {
        type: "heading",
        text: "Key Takeaways",
      },
      {
        type: "list",
        items: [
          "React uses a virtual DOM for fast UI updates",
          "Components are reusable, isolated pieces of UI",
          "useState manages local component state",
          "useEffect handles side effects like API calls",
          "Props pass data from parent to child components",
          "Always use Vite for new React projects in 2026",
        ],
      },
    ],
  },

  "nodejs-express-rest-api": {
    title: "Building RESTful APIs with Node.js & Express",
    category: "Backend",
    date: "February 20, 2026",
    readTime: "10 min read",
    image: "/blog/img2.png",
    accent: "#10b981",
    content: [
      {
        type: "intro",
        text: "Node.js and Express together form one of the most popular stacks for building fast, scalable backend APIs. In this guide, we'll build a complete REST API with authentication from scratch.",
      },
      {
        type: "heading",
        text: "Project Setup",
      },
      {
        type: "code",
        lang: "bash",
        text: `mkdir my-api && cd my-api
npm init -y
npm install express mongoose dotenv jsonwebtoken bcryptjs cors
npm install --save-dev nodemon`,
      },
      {
        type: "heading",
        text: "Basic Express Server",
      },
      {
        type: "code",
        lang: "js",
        text: `import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running ✅" });
});

app.listen(5000, () => console.log("Server on port 5000"));`,
      },
      {
        type: "heading",
        text: "Creating Routes & Controllers",
      },
      {
        type: "code",
        lang: "js",
        text: `// routes/users.js
import express from "express";
import { getUsers, createUser } from "../controllers/userController.js";

const router = express.Router();
router.get("/", getUsers);
router.post("/", createUser);

export default router;`,
      },
      {
        type: "heading",
        text: "JWT Authentication",
      },
      {
        type: "code",
        lang: "js",
        text: `import jwt from "jsonwebtoken";

// Generate token
const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

// Middleware to verify
export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};`,
      },
      {
        type: "list",
        items: [
          "Use express.Router() to organize routes by feature",
          "Always validate request body with express-validator",
          "Hash passwords with bcryptjs before saving",
          "Use JWT for stateless authentication",
          "Add rate limiting to prevent abuse",
          "Always use environment variables for secrets",
        ],
      },
    ],
  },

  "new-tech-2026": {
    title: "Top New Technologies Every Developer Should Learn in 2026",
    category: "Technology",
    date: "January 15, 2026",
    readTime: "6 min read",
    image: "/blog/img3.png",
    accent: "#7c3aed",
    content: [
      {
        type: "intro",
        text: "The tech landscape is evolving faster than ever. From AI-powered development tools to edge computing and real-time databases, 2026 brings exciting new technologies every developer should explore.",
      },
      {
        type: "heading",
        text: "1. AI-Powered Development Tools",
      },
      {
        type: "paragraph",
        text: "Tools like GitHub Copilot, Cursor, and Claude are transforming how developers write code. AI can now generate boilerplate, suggest fixes, write tests, and even architect systems. Learning to work with AI tools is no longer optional.",
      },
      {
        type: "heading",
        text: "2. Convex — Real-Time Backend",
      },
      {
        type: "paragraph",
        text: "Convex is a revolutionary backend platform that gives you a real-time database, serverless functions, and file storage in one package. No more setting up Express servers — just write TypeScript functions and deploy instantly.",
      },
      {
        type: "code",
        lang: "ts",
        text: `// Convex mutation — as simple as this
export const createPost = mutation({
  args: { title: v.string(), body: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("posts", args);
  },
});`,
      },
      {
        type: "heading",
        text: "3. Edge Computing & Serverless",
      },
      {
        type: "paragraph",
        text: "Platforms like Vercel Edge Functions and Cloudflare Workers run your code at the network edge — milliseconds from your users worldwide. This dramatically improves performance without managing servers.",
      },
      {
        type: "heading",
        text: "4. TypeScript Everywhere",
      },
      {
        type: "paragraph",
        text: "TypeScript has become the default for serious JavaScript projects. Full-stack TypeScript with shared types between frontend and backend eliminates an entire category of bugs at compile time.",
      },
      {
        type: "list",
        items: [
          "AI coding tools — Cursor, GitHub Copilot, Claude",
          "Convex — real-time serverless backend",
          "Edge functions — Vercel, Cloudflare Workers",
          "TypeScript — full-stack type safety",
          "React Server Components — Next.js 14+",
          "Bun — faster Node.js alternative runtime",
        ],
      },
    ],
  },

  "react-native-vs-flutter": {
    title: "React Native vs Flutter: Which to Choose in 2026?",
    category: "Frontend",
    date: "December 28, 2025",
    readTime: "9 min read",
    image: "/blog/img4.png",
    accent: "#0ea5e9",
    content: [
      {
        type: "intro",
        text: "Both React Native and Flutter are excellent choices for cross-platform mobile development. But which one is right for your project in 2026? Let's compare them across key factors.",
      },
      {
        type: "heading",
        text: "React Native — JavaScript Power",
      },
      {
        type: "paragraph",
        text: "React Native uses JavaScript and React to build native mobile apps. If you already know React, the learning curve is minimal. It has a massive ecosystem, excellent community support, and is used by Meta, Microsoft, and Shopify.",
      },
      {
        type: "heading",
        text: "Flutter — Dart Performance",
      },
      {
        type: "paragraph",
        text: "Flutter uses Dart and renders UI components itself using the Skia graphics engine — it doesn't rely on native components. This gives pixel-perfect consistency across platforms and excellent performance.",
      },
      {
        type: "heading",
        text: "Side by Side Comparison",
      },
      {
        type: "list",
        items: [
          "Language: React Native uses JS/TS — Flutter uses Dart",
          "Performance: Flutter is slightly faster for complex UIs",
          "Learning curve: React Native easier if you know React",
          "Ecosystem: React Native has larger npm ecosystem",
          "UI consistency: Flutter wins — renders its own widgets",
          "Job market: React Native has more job opportunities currently",
        ],
      },
      {
        type: "heading",
        text: "My Recommendation",
      },
      {
        type: "paragraph",
        text: "Choose React Native if you're already a JavaScript developer or building a web+mobile product. Choose Flutter if you need pixel-perfect UI consistency or are starting fresh with no JS background.",
      },
    ],
  },

  "mongodb-vs-postgresql": {
    title: "MongoDB vs PostgreSQL: Choosing the Right Database",
    category: "Backend",
    date: "November 18, 2025",
    readTime: "7 min read",
    image: "/blog/img5.png",
    accent: "#f59e0b",
    content: [
      {
        type: "intro",
        text: "MongoDB and PostgreSQL are both excellent databases — but they serve different use cases. Choosing the wrong one can cause major headaches down the road. Let's break down when to use each.",
      },
      {
        type: "heading",
        text: "MongoDB — Flexible NoSQL",
      },
      {
        type: "paragraph",
        text: "MongoDB stores data as JSON-like documents. It's schema-flexible, horizontally scalable, and perfect for rapidly evolving data structures. Great for content management, real-time apps, and catalogs.",
      },
      {
        type: "code",
        lang: "js",
        text: `// MongoDB — flexible schema
const user = {
  name: "Avinash",
  skills: ["React", "Node.js"],     // arrays easy
  address: { city: "Delhi" },       // nested objects easy
  createdAt: new Date()
};
await User.create(user);`,
      },
      {
        type: "heading",
        text: "PostgreSQL — Reliable SQL",
      },
      {
        type: "paragraph",
        text: "PostgreSQL is a powerful relational database with ACID compliance, complex queries, and strong data integrity. Perfect for financial data, e-commerce, analytics, and any app needing complex relationships.",
      },
      {
        type: "list",
        items: [
          "Use MongoDB for flexible schemas, rapid prototyping",
          "Use PostgreSQL for relational data, complex queries",
          "MongoDB excels at horizontal scaling",
          "PostgreSQL wins for data integrity & ACID transactions",
          "Both support JSON — PostgreSQL has JSONB too",
          "For most MERN apps, MongoDB is the natural choice",
        ],
      },
    ],
  },

  "typescript-advanced": {
    title: "Mastering TypeScript: From Basics to Advanced Patterns",
    category: "Technology",
    date: "October 5, 2025",
    readTime: "12 min read",
    image: "/blog/img6.png",
    accent: "#ef4444",
    content: [
      {
        type: "intro",
        text: "TypeScript has become the standard for serious JavaScript development. Moving beyond basic types to advanced patterns like generics, utility types, and conditional types will make your code dramatically safer and more maintainable.",
      },
      {
        type: "heading",
        text: "Generics — Reusable Type-Safe Code",
      },
      {
        type: "code",
        lang: "ts",
        text: `// Generic function
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const num = getFirst([1, 2, 3]);       // type: number
const str = getFirst(["a", "b"]);      // type: string`,
      },
      {
        type: "heading",
        text: "Utility Types",
      },
      {
        type: "code",
        lang: "ts",
        text: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type PublicUser  = Omit<User, "password">;     // remove password
type PartialUser = Partial<User>;              // all optional
type ReadOnly    = Readonly<User>;             // immutable
type UserPreview = Pick<User, "id" | "name">; // pick only these`,
      },
      {
        type: "heading",
        text: "Discriminated Unions",
      },
      {
        type: "code",
        lang: "ts",
        text: `type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error";   message: string }
  | { status: "loading" };

function handle(res: ApiResponse<User>) {
  if (res.status === "success") console.log(res.data);
  if (res.status === "error")   console.log(res.message);
}`,
      },
      {
        type: "list",
        items: [
          "Always enable strict mode in tsconfig.json",
          "Use generics for reusable, type-safe functions",
          "Utility types — Partial, Pick, Omit, Readonly",
          "Discriminated unions for exhaustive type checking",
          "Use unknown instead of any wherever possible",
          "Type your API responses with interfaces",
        ],
      },
    ],
  },
};

/* ── Content Renderer ── */
function ContentBlock({ block, accent, dark }) {
  const codeRef = useRef(null);
  const textCol = dark ? "#94a3b8" : "#475569";
  const headCol = dark ? "#f1f5f9" : "#0f172a";
  const codeBg  = dark ? "#0d1117" : "#f8fafc";
  const codeBorder = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const listDot = accent;

  switch (block.type) {
    case "intro":
      return (
        <p style={{
          fontFamily: "'Outfit',sans-serif",
          fontSize: "clamp(16px,1.6vw,18px)",
          lineHeight: 1.85,
          color: dark ? "#e2e8f0" : "#1e293b",
          fontWeight: 500,
          borderLeft: `4px solid ${accent}`,
          paddingLeft: "20px",
          marginBottom: "32px",
        }}>
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: "clamp(19px,2vw,23px)",
          fontWeight: 800,
          color: headCol,
          letterSpacing: "-0.01em",
          marginTop: "36px",
          marginBottom: "14px",
          transition: "color 0.3s ease",
        }}>
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p style={{
          fontFamily: "'Outfit',sans-serif",
          fontSize: "clamp(14.5px,1.4vw,16px)",
          lineHeight: 1.85,
          color: textCol,
          marginBottom: "20px",
          transition: "color 0.3s ease",
        }}>
          {block.text}
        </p>
      );
    case "code":
      return (
        <div style={{
          background: codeBg,
          border: `1.5px solid ${codeBorder}`,
          borderRadius: "12px",
          marginBottom: "24px",
          overflow: "hidden",
        }}>
          <div style={{
            background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            padding: "8px 16px",
            borderBottom: `1px solid ${codeBorder}`,
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            {["#ef4444","#f59e0b","#10b981"].map((c,i) => (
              <span key={i} style={{ width:10, height:10, borderRadius:"50%", background:c, display:"inline-block" }} />
            ))}
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"11.5px", color: dark?"#64748b":"#94a3b8", marginLeft:"6px" }}>
              {block.lang}
            </span>
          </div>
          <pre ref={codeRef} style={{
            margin: 0, padding: "20px",
            overflowX: "auto",
            fontFamily: "'Courier New', monospace",
            fontSize: "13.5px",
            lineHeight: 1.7,
            color: dark ? "#e2e8f0" : "#1e293b",
            whiteSpace: "pre",
          }}>
            {block.text}
          </pre>
        </div>
      );
    case "list":
      return (
        <ul style={{ margin: "0 0 24px", padding: 0, listStyle: "none" }}>
          {block.items.map((item, i) => (
            <li key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "10px",
              marginBottom: "10px",
            }}>
              <span style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: listDot, flexShrink: 0, marginTop: "8px",
              }} />
              <span style={{
                fontFamily: "'Outfit',sans-serif",
                fontSize: "clamp(14px,1.4vw,15.5px)",
                lineHeight: 1.7,
                color: textCol,
                transition: "color 0.3s ease",
              }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

/* ══════════════════════════════════════════
   MAIN BLOG POST PAGE
══════════════════════════════════════════ */
export default function BlogPost() {
  const { slug }   = useParams();
  const { dark }   = useTheme();
  const navigate   = useNavigate();
  const [ref, inView] = useInView(0.05);

  const post = BLOG_POSTS[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (document.getElementById("blogpost-styles")) return;
    const s = document.createElement("style");
    s.id = "blogpost-styles";
    s.textContent = `
      .bp-font-display { font-family:'Plus Jakarta Sans',sans-serif !important; }
      .bp-font-body    { font-family:'Outfit',sans-serif !important; }
    `;
    document.head.appendChild(s);
    if (!document.getElementById("bp-fonts")) {
      const l = document.createElement("link");
      l.id = "bp-fonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap";
      document.head.appendChild(l);
    }
  }, [slug]);

  const sectionBg  = dark ? "linear-gradient(180deg,#0b0b10 0%,#0d1117 100%)" : "#ffffff";
  const headingCol = dark ? "#f1f5f9"  : "#0f172a";

  /* 404 — post not found */
  if (!post) {
    return (
      <div style={{
        minHeight: "60vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: sectionBg, padding: "40px 20px", textAlign: "center",
      }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>📄</div>
        <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"28px", fontWeight:800, color:headingCol, marginBottom:"12px" }}>
          Post Not Found
        </h2>
        <p style={{ fontFamily:"'Outfit',sans-serif", color: dark?"#64748b":"#94a3b8", marginBottom:"24px" }}>
          This blog post doesn't exist yet.
        </p>
        <Link to="/blog" style={{
          background: "#2563eb", color: "#fff", padding: "12px 24px",
          borderRadius: "10px", textDecoration: "none",
          fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: "14px",
        }}>
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <section
      className="relative w-full min-h-screen"
      style={{ background: sectionBg, transition: "background 0.4s ease" }}
    >
      {/* ── Hero Image ── */}
      <div style={{ width: "100%", height: "clamp(220px,35vw,420px)", overflow: "hidden", position: "relative" }}>
        <img
          src={post.image}
          alt={post.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div style={{
          display: "none", position: "absolute", inset: 0,
          background: `linear-gradient(135deg,${post.accent}44,${post.accent}11)`,
          alignItems: "center", justifyContent: "center", fontSize: "80px",
        }}>
          {post.category === "Frontend" ? "🎨" : post.category === "Backend" ? "⚙️" : "🚀"}
        </div>
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }} />
      </div>

      {/* ── Content ── */}
      <div
        ref={ref}
        className="max-w-3xl mx-auto px-6 sm:px-10"
        style={{
          paddingTop: "40px", paddingBottom: "80px",
          opacity:   inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/blog")}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontFamily: "'Outfit',sans-serif", fontSize: "13.5px", fontWeight: 600,
            color: post.accent, background: "transparent", border: "none",
            cursor: "pointer", padding: "0", marginBottom: "24px",
            transition: "gap 0.2s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.gap = "10px"}
          onMouseLeave={e => e.currentTarget.style.gap = "6px"}
        >
          ← Back to Blog
        </button>

        {/* Category + Meta */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <span style={{
            background: post.accent, color: "#fff",
            fontFamily: "'Outfit',sans-serif", fontSize: "11.5px", fontWeight: 700,
            padding: "4px 12px", borderRadius: "20px",
          }}>
            {post.category}
          </span>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"13px", color: dark?"#64748b":"#94a3b8" }}>
            📅 {post.date}
          </span>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"13px", color: dark?"#64748b":"#94a3b8" }}>
            ⏱ {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: "clamp(24px,3.5vw,38px)",
          fontWeight: 800,
          color: headingCol,
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
          marginBottom: "32px",
          transition: "color 0.3s ease",
        }}>
          {post.title}
        </h1>

        {/* Divider */}
        <div style={{
          height: "2px", borderRadius: "2px", marginBottom: "32px",
          background: `linear-gradient(90deg, ${post.accent}, transparent)`,
        }} />

        {/* Content blocks */}
        {post.content.map((block, i) => (
          <ContentBlock key={i} block={block} accent={post.accent} dark={dark} />
        ))}

        {/* Bottom nav */}
        <div style={{
          marginTop: "48px", paddingTop: "32px",
          borderTop: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
          display: "flex", justifyContent: "center",
        }}>
          <Link
            to="/blog"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: post.accent, color: "#fff",
              fontFamily: "'Outfit',sans-serif", fontSize: "14px", fontWeight: 700,
              padding: "12px 28px", borderRadius: "10px", textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            ← Back to All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}