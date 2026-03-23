// src/components/Contact.jsx
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../App";
import { API } from "../utils/api";
import { href } from "react-router-dom";

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

/* ── Icons ── */
const MailIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const PhoneIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const LocationIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);
const SendIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

/* ── Contact Info ── */
const CONTACT_INFO = [
  { icon: <MailIcon />,     label: "Email",    value: "www.kumaravinash3898@gmail.com", href: "https://mail.google.com/mail/?view=cm&to=kumaravinash3898@gmail.com", color: "#2563eb" },
  { icon: <PhoneIcon />,    label: "Phone",    value: "+91 7703843898",              href: "tel:+91XXXXXXXXXX", color: "#10b981" },
  { icon: <LocationIcon />, label: "Location", value: "Noida Uttar Pradesh, India",        href: null, color: "#7c3aed" },
 
];

const SOCIALS = [
  { icon: <LinkedinIcon />, href: "https://www.linkedin.com/in/avinash-kumar-a226932a4", label: "LinkedIn", color: "#0ea5e9" },
  { icon: <GithubIcon />,   href: "https://github.com/avinash-Kumar2004",                label: "GitHub",   color: "#475569" },
  { icon: <MailIcon />,     href: "https://mail.google.com/mail/?view=cm&to=www/kumaravinash3898@gmail.com", label: "Email", color: "#ef4444" },
//   {icon:</>, href:"https://www.linkedin.com/in/avinash-kumar-a226932a4/", label:"Linkedin",color:"#0ea5e9"}
];

/* ── Success Popup ── */
function SuccessPopup({ onClose, dark }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
    const t = setTimeout(() => { setVisible(false); setTimeout(onClose, 300); }, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.3s ease",
      padding: "20px",
    }}>
      <div style={{
        background: dark ? "#111827" : "#ffffff",
        borderRadius: "24px",
        padding: "48px 40px",
        maxWidth: "420px", width: "100%",
        textAlign: "center",
        boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
        border: `1.5px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.92) translateY(20px)",
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        position: "relative",
      }}>
        {/* Close */}
        <button onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
          style={{
            position: "absolute", top: "16px", right: "16px",
            background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            border: "none", borderRadius: "8px", width: "32px", height: "32px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: dark ? "#94a3b8" : "#64748b",
          }}>
          <CloseIcon />
        </button>

        {/* Check icon */}
        <div style={{
          width: "72px", height: "72px", borderRadius: "50%",
          background: "linear-gradient(135deg,#10b981,#0ea5e9)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px", color: "#fff",
          boxShadow: "0 8px 32px rgba(16,185,129,0.4)",
        }}>
          <CheckIcon />
        </div>

        <h3 style={{
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontSize: "22px", fontWeight: 800,
          color: dark ? "#f1f5f9" : "#0f172a",
          marginBottom: "10px", letterSpacing: "-0.01em",
        }}>
          Message Sent! 🎉
        </h3>
        <p style={{
          fontFamily: "'Outfit',sans-serif",
          fontSize: "15px", lineHeight: 1.7,
          color: dark ? "#94a3b8" : "#475569",
          marginBottom: "24px",
        }}>
          Thank you for reaching out! I've received your message and will get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
          style={{
            background: "linear-gradient(135deg,#2563eb,#0ea5e9)",
            color: "#fff", border: "none", borderRadius: "12px",
            padding: "12px 32px", cursor: "pointer",
            fontFamily: "'Outfit',sans-serif", fontSize: "14px", fontWeight: 700,
            boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
          }}>
          Great, Thanks!
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN CONTACT PAGE
══════════════════════════════════════════ */
export default function Contacts() {
  const { dark } = useTheme();
  const [headerRef, headerInView] = useInView(0.2);
  const [leftRef,   leftInView]   = useInView(0.1);
  const [rightRef,  rightInView]  = useInView(0.1);
  const [showPopup, setShowPopup] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  /* ── Font inject ── */
  useEffect(() => {
    if (document.getElementById("contact-styles")) return;
    const s = document.createElement("style");
    s.id = "contact-styles";
    s.textContent = `
      .ct-font-display { font-family:'Plus Jakarta Sans',sans-serif !important; }
      .ct-font-body    { font-family:'Outfit',sans-serif !important; }
    `;
    document.head.appendChild(s);
    if (!document.getElementById("ct-fonts")) {
      const l = document.createElement("link");
      l.id = "ct-fonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Name must be at least 2 characters.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email.";
    if (!form.subject.trim() || form.subject.trim().length < 3)
      e.subject = "Subject must be at least 3 characters.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  /* ── Submit ── */
  const handleSubmit = async () => {
    setServerError("");
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setLoading(true);
    try {
      const res = await fetch(API.contact, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
      const data = await res.json();
      if (res.ok) {
        setShowPopup(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setServerError(data.message || "Something went wrong. Try again.");
      }
    } catch {
      setServerError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Colors ── */
  const sectionBg   = dark ? "linear-gradient(180deg,#0b0b10 0%,#0d1117 100%)" : "linear-gradient(180deg,#f8fbff 0%,#f0f7ff 100%)";
  const headingCol  = dark ? "#f1f5f9" : "#0f172a";
  const subCol      = dark ? "#64748b" : "#64748b";
  const badgeBg     = dark ? "rgba(30,58,138,0.3)"   : "rgba(219,234,254,0.8)";
  const badgeText   = dark ? "#93c5fd"               : "#1d4ed8";
  const badgeBorder = dark ? "rgba(59,130,246,0.25)" : "rgba(147,197,253,0.6)";
  const cardBg      = dark ? "#111827"               : "#ffffff";
  const cardBorder  = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const labelCol    = dark ? "#e2e8f0" : "#1e293b";
  const inputBg     = dark ? "rgba(255,255,255,0.05)" : "#f8fafc";
  const inputBorder = dark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.1)";
  const inputFocus  = "#2563eb";
  const inputText   = dark ? "#f1f5f9" : "#0f172a";
  const phCol       = dark ? "#475569" : "#94a3b8";
  const infoTitleCol= dark ? "#f1f5f9" : "#0f172a";
  const infoValCol  = dark ? "#94a3b8" : "#475569";
  const sectionTitleCol = dark ? "#f1f5f9" : "#0f172a";
  const divCol      = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  /* ── Input style helper ── */
  const inputStyle = (field) => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    background: inputBg,
    border: `1.5px solid ${errors[field] ? "#ef4444" : inputBorder}`,
    color: inputText,
    fontFamily: "'Outfit',sans-serif",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
  });

  return (
    <section className="relative w-full py-20 sm:py-28 overflow-hidden"
      style={{ background: sectionBg, transition: "background 0.4s ease" }}>

      {/* Bg glow */}
      <div style={{
        position:"absolute", top:"5%", left:"50%", transform:"translateX(-50%)",
        width:"700px", height:"350px", borderRadius:"50%", pointerEvents:"none",
        background: dark
          ? "radial-gradient(ellipse,rgba(37,99,235,0.07) 0%,transparent 65%)"
          : "radial-gradient(ellipse,rgba(37,99,235,0.05) 0%,transparent 65%)",
      }} />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ══ HEADER ══ */}
        <div ref={headerRef} className="text-center mb-16"
          style={{
            opacity:    headerInView ? 1 : 0,
            transform:  headerInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: badgeBg, border:`1px solid ${badgeBorder}` }}>
            <span style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background:"#3b82f6" }} />
            <span className="ct-font-body text-[12.5px] font-semibold tracking-wide" style={{ color: badgeText }}>
              CONTACT
            </span>
          </div>
          <h2 className="ct-font-display font-bold mb-4"
            style={{ fontSize:"clamp(32px,4vw,52px)", color:headingCol, letterSpacing:"-0.02em", transition:"color 0.4s ease" }}>
            Get in Touch
          </h2>
          <div style={{ width:"52px", height:"4px", borderRadius:"2px",
            background:"linear-gradient(90deg,#2563eb,#0ea5e9)", margin:"0 auto 16px" }} />
          <p className="ct-font-body text-[16px] max-w-[500px] mx-auto leading-relaxed"
            style={{ color:subCol, transition:"color 0.4s ease" }}>
            Have a question or want to work together? Feel free to reach out — I'll get back within 24 hours.
          </p>
        </div>

        {/* ══ TWO COLUMN LAYOUT ══ */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* ── LEFT — Contact Info ── */}
          <div ref={leftRef} className="w-full lg:w-[38%] flex flex-col gap-6"
            style={{
              opacity:    leftInView ? 1 : 0,
              transform:  leftInView ? "translateX(0)" : "translateX(-60px)",
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
            }}>

            {/* Contact Info Card */}
            <div style={{
              background: cardBg, border:`1.5px solid ${cardBorder}`,
              borderRadius:"20px", padding:"28px",
              boxShadow: dark?"0 4px 20px rgba(0,0,0,0.4)":"0 4px 20px rgba(0,0,0,0.06)",
              transition:"all 0.4s ease",
            }}>
              <h3 className="ct-font-display font-bold mb-6"
                style={{ fontSize:"18px", color:sectionTitleCol, letterSpacing:"-0.01em" }}>
                Contact Information
              </h3>

              <div className="flex flex-col gap-5">
                {CONTACT_INFO.map(({ icon, label, value, href, color }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div style={{
                      width:"44px", height:"44px", borderRadius:"12px", flexShrink:0,
                      background: dark ? `${color}22` : `${color}15`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color: color,
                    }}>
                      {icon}
                    </div>
                    <div>
                      <p className="ct-font-body" style={{ fontSize:"12px", fontWeight:700, color:subCol, marginBottom:"2px", textTransform:"uppercase", letterSpacing:"0.06em" }}>
                        {label}
                      </p>
                      {href ? (
                        <a href={href} target="_blank" rel="noreferrer"
                          className="ct-font-body"
                          style={{ fontSize:"14.5px", color:infoValCol, textDecoration:"none", transition:"color 0.2s ease" }}
                          onMouseEnter={e => e.currentTarget.style.color = color}
                          onMouseLeave={e => e.currentTarget.style.color = infoValCol}>
                          {value}
                        </a>
                      ) : (
                        <p className="ct-font-body" style={{ fontSize:"14.5px", color:infoValCol, margin:0 }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials Card */}
            <div style={{
              background: cardBg, border:`1.5px solid ${cardBorder}`,
              borderRadius:"20px", padding:"28px",
              boxShadow: dark?"0 4px 20px rgba(0,0,0,0.4)":"0 4px 20px rgba(0,0,0,0.06)",
              transition:"all 0.4s ease",
            }}>
              <h3 className="ct-font-display font-bold mb-5"
                style={{ fontSize:"18px", color:sectionTitleCol, letterSpacing:"-0.01em" }}>
                Connect with me
              </h3>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ icon, href, label, color }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                    style={{
                      width:"46px", height:"46px", borderRadius:"12px",
                      background: color,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"#ffffff", textDecoration:"none",
                      transition:"all 0.2s ease",
                      boxShadow:`0 4px 14px ${color}44`,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px) scale(1.08)"; e.currentTarget.style.boxShadow=`0 8px 20px ${color}55`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0) scale(1)"; e.currentTarget.style.boxShadow=`0 4px 14px ${color}44`; }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT — Contact Form ── */}
          <div ref={rightRef} className="flex-1"
            style={{
              opacity:    rightInView ? 1 : 0,
              transform:  rightInView ? "translateX(0)" : "translateX(60px)",
              transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s",
            }}>
            <div style={{
              background: cardBg, border:`1.5px solid ${cardBorder}`,
              borderRadius:"20px", padding:"32px",
              boxShadow: dark?"0 4px 20px rgba(0,0,0,0.4)":"0 4px 20px rgba(0,0,0,0.06)",
              height:"100%", transition:"all 0.4s ease",
            }}>
              <h3 className="ct-font-display font-bold mb-6"
                style={{ fontSize:"20px", color:sectionTitleCol, letterSpacing:"-0.01em" }}>
                Send a Message
              </h3>

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Name */}
                <div>
                  <label className="ct-font-body" style={{ fontSize:"13px", fontWeight:600, color:labelCol, display:"block", marginBottom:"6px" }}>
                    Your Name <span style={{ color:"#ef4444" }}>*</span>
                  </label>
                  <input
                    name="name" value={form.name} onChange={handleChange}
                    placeholder="Avinash Kumar"
                    style={{ ...inputStyle("name"), "::placeholder": { color: phCol } }}
                    onFocus={e => { e.target.style.borderColor=inputFocus; e.target.style.boxShadow=`0 0 0 3px rgba(37,99,235,0.15)`; }}
                    onBlur={e => { e.target.style.borderColor=errors.name?"#ef4444":inputBorder; e.target.style.boxShadow="none"; }}
                  />
                  {errors.name && <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"12px", color:"#ef4444", marginTop:"4px" }}>{errors.name}</p>}
                </div>
                {/* Email */}
                <div>
                  <label className="ct-font-body" style={{ fontSize:"13px", fontWeight:600, color:labelCol, display:"block", marginBottom:"6px" }}>
                    Your Email <span style={{ color:"#ef4444" }}>*</span>
                  </label>
                  <input
                    name="email" value={form.email} onChange={handleChange} type="email"
                    placeholder="john@example.com"
                    style={inputStyle("email")}
                    onFocus={e => { e.target.style.borderColor=inputFocus; e.target.style.boxShadow=`0 0 0 3px rgba(37,99,235,0.15)`; }}
                    onBlur={e => { e.target.style.borderColor=errors.email?"#ef4444":inputBorder; e.target.style.boxShadow="none"; }}
                  />
                  {errors.email && <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"12px", color:"#ef4444", marginTop:"4px" }}>{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div className="mb-4">
                <label className="ct-font-body" style={{ fontSize:"13px", fontWeight:600, color:labelCol, display:"block", marginBottom:"6px" }}>
                  Subject <span style={{ color:"#ef4444" }}>*</span>
                </label>
                <input
                  name="subject" value={form.subject} onChange={handleChange}
                  placeholder="How can I help you?"
                  style={inputStyle("subject")}
                  onFocus={e => { e.target.style.borderColor=inputFocus; e.target.style.boxShadow=`0 0 0 3px rgba(37,99,235,0.15)`; }}
                  onBlur={e => { e.target.style.borderColor=errors.subject?"#ef4444":inputBorder; e.target.style.boxShadow="none"; }}
                />
                {errors.subject && <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"12px", color:"#ef4444", marginTop:"4px" }}>{errors.subject}</p>}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="ct-font-body" style={{ fontSize:"13px", fontWeight:600, color:labelCol, display:"block", marginBottom:"6px" }}>
                  Message <span style={{ color:"#ef4444" }}>*</span>
                </label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Your message..."
                  rows={6}
                  style={{ ...inputStyle("message"), resize:"vertical", minHeight:"140px" }}
                  onFocus={e => { e.target.style.borderColor=inputFocus; e.target.style.boxShadow=`0 0 0 3px rgba(37,99,235,0.15)`; }}
                  onBlur={e => { e.target.style.borderColor=errors.message?"#ef4444":inputBorder; e.target.style.boxShadow="none"; }}
                />
                {errors.message && <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"12px", color:"#ef4444", marginTop:"4px" }}>{errors.message}</p>}
              </div>

              {/* Server error */}
              {serverError && (
                <div style={{
                  background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)",
                  borderRadius:"10px", padding:"10px 14px", marginBottom:"16px",
                }}>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"13.5px", color:"#ef4444", margin:0 }}>{serverError}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width:"100%", padding:"14px",
                  borderRadius:"12px", border:"none", cursor: loading?"not-allowed":"pointer",
                  background: loading
                    ? (dark?"rgba(37,99,235,0.4)":"rgba(37,99,235,0.5)")
                    : "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color:"#ffffff",
                  fontFamily:"'Outfit',sans-serif", fontSize:"15px", fontWeight:700,
                  display:"flex", alignItems:"center", justifyContent:"center", gap:"10px",
                  boxShadow: loading ? "none" : "0 4px 20px rgba(37,99,235,0.4)",
                  transition:"all 0.2s ease",
                }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(37,99,235,0.5)"; }}}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=loading?"none":"0 4px 20px rgba(37,99,235,0.4)"; }}
              >
                {loading ? (
                  <>
                    <span style={{ width:"16px", height:"16px", border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin 0.7s linear infinite" }} />
                    Sending...
                  </>
                ) : (
                  <><SendIcon /> Send Message</>
                )}
              </button>

              <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
            </div>
          </div>
        </div>
      </div>

      {/* ══ SUCCESS POPUP ══ */}
      {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} dark={dark} />}
    </section>
  );
}