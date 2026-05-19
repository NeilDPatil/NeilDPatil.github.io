import { useState, useEffect, useRef, useCallback } from "react";

// --- ACCENT COLOR HELPER
function ac(dark) {
  return {
    solid: dark ? "#f97316" : "#2563eb",
    solid2: dark ? "#fb923c" : "#3b82f6",
    a05: dark ? "rgba(249,115,22,0.05)" : "rgba(37,99,235,0.05)",
    a08: dark ? "rgba(249,115,22,0.08)" : "rgba(37,99,235,0.08)",
    a10: dark ? "rgba(249,115,22,0.10)" : "rgba(37,99,235,0.10)",
    a12: dark ? "rgba(249,115,22,0.12)" : "rgba(37,99,235,0.12)",
    a15: dark ? "rgba(249,115,22,0.15)" : "rgba(37,99,235,0.15)",
    a20: dark ? "rgba(249,115,22,0.20)" : "rgba(37,99,235,0.20)",
    a25: dark ? "rgba(249,115,22,0.25)" : "rgba(37,99,235,0.25)",
    a30: dark ? "rgba(249,115,22,0.30)" : "rgba(37,99,235,0.30)",
    a40: dark ? "rgba(249,115,22,0.40)" : "rgba(37,99,235,0.40)",
    a60: dark ? "rgba(249,115,22,0.60)" : "rgba(37,99,235,0.60)",
    grad: dark
      ? "linear-gradient(90deg,#f97316,#fb923c)"
      : "linear-gradient(90deg,#2563eb,#3b82f6)",
    avatarGrad: dark
      ? "linear-gradient(135deg,#f97316 0%,#1a1a1a 100%)"
      : "linear-gradient(135deg,#2563eb 0%,#0f172a 100%)",
  };
}

// --- ICONS
const Icon = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const SunIcon = () => <Icon d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z" />;
const MoonIcon = () => <Icon d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const EmailIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// --- DEFAULT DATA
const DEFAULT_DATA = {
  bio: {
    name: "Alex Chen",
    title: "Software Engineer",
    description: "I build scalable systems and elegant interfaces. Passionate about clean architecture, developer tooling, and solving hard problems with simple solutions.",
    status: "Open to opportunities",
    skills: ["TypeScript", "React", "Node.js", "Python", "Go", "PostgreSQL", "AWS", "Docker", "Kubernetes", "GraphQL"],
    resumeUrl: "#",
    avatar: null,
  },
  projects: [
    { id: 1, title: "Nexus API Gateway", description: "High-performance API gateway with rate limiting, auth middleware, and real-time analytics.", fullDescription: "Built with Go and Redis, this gateway handles 10k+ req/s with sub-5ms p99 latency. Features JWT auth, per-client rate limiting, request/response transformation, and a live metrics dashboard.", github: "https://github.com", date: "2024-11", image: null, tags: ["Go", "Redis", "gRPC"] },
    { id: 2, title: "Obsidian Compiler", description: "A lightweight JIT compiler for a statically-typed scripting language with LLVM backend.", fullDescription: "Implements lexer, parser, semantic analyzer, and LLVM IR codegen from scratch. Supports closures, generics, and WASM compilation target. 40% faster than reference interpreter benchmarks.", github: "https://github.com", date: "2024-07", image: null, tags: ["Rust", "LLVM", "WASM"] },
    { id: 3, title: "Strata Dashboard", description: "Real-time infrastructure monitoring with anomaly detection and intelligent alerting.", fullDescription: "React frontend with WebSocket-driven live graphs. ML-based anomaly detection flags infrastructure issues before they cascade. Integrates with Prometheus, Datadog, and custom metric sources.", github: "https://github.com", date: "2024-03", image: null, tags: ["React", "Python", "WebSockets"] },
  ],
  certificates: [
    { id: 1, title: "AWS Solutions Architect – Professional", org: "Amazon Web Services", date: "2024-09", image: null },
    { id: 2, title: "Certified Kubernetes Administrator", org: "Cloud Native Computing Foundation", date: "2024-04", image: null },
    { id: 3, title: "Google Cloud Professional Data Engineer", org: "Google Cloud", date: "2023-11", image: null },
  ],
  socials: { github: "https://github.com", linkedin: "https://linkedin.com", instagram: "https://instagram.com", email: "mailto:alex@example.com" },
};

// --- STORAGE
const STORAGE_KEY = "portfolio_data_v2";
const PASS_KEY = "portfolio_admin_pass";
const DEFAULT_PASS = "admin123";

function getStoredPassword() { try { return localStorage.getItem(PASS_KEY) || DEFAULT_PASS; } catch { return DEFAULT_PASS; } }
function setStoredPassword(pw) { try { localStorage.setItem(PASS_KEY, pw); } catch {} }
function loadData() { try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : DEFAULT_DATA; } catch { return DEFAULT_DATA; } }
function saveData(data) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {} }

// --- HOOKS
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setProgress(Math.min(1, Math.max(0, el.scrollTop / (el.scrollHeight - el.clientHeight))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useFadeIn(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// --- COMPONENTS
function ProgressBar({ dark }) {
  const progress = useScrollProgress();
  const c = ac(dark);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 1000, background: dark ? "#1a1a1a" : "#f0f0f0" }}>
      <div style={{ height: "100%", width: `${progress * 100}%`, background: c.grad, transition: "width 0.1s linear", boxShadow: `0 0 8px ${c.a60}` }} />
    </div>
  );
}

function Avatar({ src, name, size = 120, dark }) {
  const c = ac(dark);
  const initials = name ? name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "AC";
  return (
    <div style={{ width: size, height: size, borderRadius: 16, overflow: "hidden", flexShrink: 0, border: `2px solid ${c.a30}`, background: c.avatarGrad, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {src
        ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : <span style={{ fontSize: size * 0.3, fontWeight: 700, color: "#fff", fontFamily: "inherit", letterSpacing: "-0.02em" }}>{initials}</span>
      }
    </div>
  );
}

function StatusBadge({ text, dark }) {
  const c = ac(dark);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: c.a10, border: `1px solid ${c.a25}`, fontSize: 12, fontWeight: 500, color: c.solid }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", display: "inline-block", animation: "pulse 2s infinite" }} />
      {text}
    </span>
  );
}

function SkillTag({ skill, dark }) {
  return (
    <span style={{ padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)", border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)", color: dark ? "#d1d5db" : "#374151", cursor: "default" }}>
      {skill}
    </span>
  );
}

function ProjectCard({ project, dark, onEdit, onDelete, isAdmin }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const c = ac(dark);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => !isAdmin && setExpanded(!expanded)}
      style={{
        borderRadius: 14,
        border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
        background: dark ? (hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)") : (hovered ? "rgba(0,0,0,0.015)" : "#fff"),
        transition: "all 0.25s cubic-bezier(.25,.8,.25,1)",
        boxShadow: hovered ? (dark ? "0 12px 40px rgba(0,0,0,0.5)" : "0 12px 40px rgba(0,0,0,0.1)") : (dark ? "0 4px 16px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.05)"),
        transform: hovered ? "translateY(-3px)" : "none",
        cursor: isAdmin ? "default" : "pointer",
        overflow: "hidden",
      }}
    >
      <div style={{ height: 160, background: dark ? "#1e1e1e" : "#f8f8f8", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
        {project.image
          ? <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <div style={{ fontSize: 40, opacity: 0.15, fontFamily: "monospace", fontWeight: 700, color: dark ? "#fff" : "#000", userSelect: "none" }}>{"{}"}</div>
        }
        <div style={{ position: "absolute", top: 10, right: 10, background: dark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)", padding: "2px 8px", borderRadius: 6, fontSize: 11, color: dark ? "#9ca3af" : "#6b7280", backdropFilter: "blur(4px)" }}>{project.date}</div>
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: dark ? "#f3f4f6" : "#111827", fontFamily: "inherit" }}>{project.title}</h3>
          {!isAdmin && <Icon d={expanded ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} size={16} />}
        </div>
        <p style={{ margin: "0 0 12px", fontSize: 13, color: dark ? "#9ca3af" : "#6b7280", lineHeight: 1.6 }}>{project.description}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {(project.tags || []).map(t => (
            <span key={t} style={{ padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 500, background: c.a10, color: c.solid, border: `1px solid ${c.a20}` }}>{t}</span>
          ))}
        </div>
        <div style={{ maxHeight: expanded ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(.25,.8,.25,1)" }}>
          <div style={{ paddingTop: 12, borderTop: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)", marginTop: 4 }}>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: dark ? "#d1d5db" : "#374151", lineHeight: 1.7 }}>{project.fullDescription}</p>
            <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", color: dark ? "#f3f4f6" : "#111827", textDecoration: "none", border: "none", transition: "all 0.2s" }}>
              <GithubIcon size={15} /> View on GitHub
            </a>
          </div>
        </div>
        {isAdmin && (
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button onClick={() => onEdit(project)} style={{ flex: 1, padding: "6px 0", borderRadius: 7, fontSize: 12, fontWeight: 500, background: c.a10, color: c.solid, border: `1px solid ${c.a20}`, cursor: "pointer" }}>Edit</button>
            <button onClick={() => onDelete(project.id)} style={{ flex: 1, padding: "6px 0", borderRadius: 7, fontSize: 12, fontWeight: 500, background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer" }}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

function CertCard({ cert, dark, index, onEdit, onDelete, isAdmin }) {
  const [ref, visible] = useFadeIn(0.1);
  const c = ac(dark);
  return (
    <div ref={ref} style={{ display: "flex", gap: 20, alignItems: "flex-start", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-20px)", transition: `all 0.5s ease ${index * 0.1}s`, padding: "20px 0", borderBottom: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.solid, boxShadow: `0 0 10px ${c.a40}`, flexShrink: 0 }} />
        <div style={{ width: 1, flex: 1, minHeight: 40, background: c.a20, marginTop: 6 }} />
      </div>
      {cert.image
        ? <img src={cert.image} alt="" style={{ width: 52, height: 52, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
        : <div style={{ width: 52, height: 52, borderRadius: 8, flexShrink: 0, background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏅</div>
      }
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 4 }}>
          <h4 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: dark ? "#f3f4f6" : "#111827" }}>{cert.title}</h4>
          <span style={{ fontSize: 12, color: c.solid, fontWeight: 500 }}>{cert.date}</span>
        </div>
        <p style={{ margin: "2px 0 0", fontSize: 13, color: dark ? "#9ca3af" : "#6b7280" }}>{cert.org}</p>
        {isAdmin && (
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <button onClick={() => onEdit(cert)} style={{ padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500, background: c.a10, color: c.solid, border: `1px solid ${c.a20}`, cursor: "pointer" }}>Edit</button>
            <button onClick={() => onDelete(cert.id)} style={{ padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500, background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer" }}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

function SocialButton({ href, icon, label, dark }) {
  const [hovered, setHovered] = useState(false);
  const c = ac(dark);
  return (
    <a href={href} target={href?.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", borderRadius: 12, textDecoration: "none", background: hovered ? c.a10 : (dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"), border: hovered ? `1px solid ${c.a30}` : (dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)"), color: dark ? "#f3f4f6" : "#111827", transition: "all 0.2s", transform: hovered ? "translateX(4px)" : "none" }}>
      {icon}
      <span style={{ fontSize: 14, fontWeight: 500 }}>{label}</span>
      <Icon d="M5 12h14M12 5l7 7-7 7" size={15} />
    </a>
  );
}

function Section({ title, open, onToggle, children, dark }) {
  const [ref, visible] = useFadeIn(0.05);
  const c = ac(dark);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "all 0.5s ease", marginBottom: 8 }}>
      <button onClick={onToggle} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderRadius: open ? "14px 14px 0 0" : 14, background: dark ? "rgba(255,255,255,0.03)" : "#fff", border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)", borderBottom: open ? "none" : undefined, cursor: "pointer", transition: "all 0.2s" }}>
        <span style={{ fontSize: 18, fontWeight: 600, color: dark ? "#f3f4f6" : "#111827", fontFamily: "inherit" }}>{title}</span>
        <span style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.3s", color: c.solid, display: "flex" }}>
          <Icon d="M6 9l6 6 6-6" size={20} />
        </span>
      </button>
      <div style={{ maxHeight: open ? 2000 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(.25,.8,.25,1)", borderRadius: "0 0 14px 14px", border: open ? (dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)") : "none", borderTop: "none", background: dark ? "rgba(255,255,255,0.02)" : "#fafafa" }}>
        <div style={{ padding: "24px 28px 28px" }}>{children}</div>
      </div>
    </div>
  );
}

// --- MODAL
function Modal({ title, onClose, children, dark }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 520, borderRadius: 16, overflow: "hidden", background: dark ? "#111" : "#fff", border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", boxShadow: "0 40px 100px rgba(0,0,0,0.4)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: dark ? "#f3f4f6" : "#111827" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: dark ? "#9ca3af" : "#6b7280", padding: 4, borderRadius: 6 }}>
            <Icon d="M18 6L6 18M6 6l12 12" size={18} />
          </button>
        </div>
        <div style={{ padding: "22px" }}>{children}</div>
      </div>
    </div>
  );
}

function FormField({ label, dark, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: dark ? "#9ca3af" : "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, dark, multiline = false, rows = 3 }) {
  const style = { width: "100%", padding: "9px 12px", borderRadius: 8, fontSize: 14, background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", color: dark ? "#f3f4f6" : "#111827", outline: "none", boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" };
  return multiline
    ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={style} />
    : <input value={value} onChange={onChange} placeholder={placeholder} style={style} />;
}

function Btn({ onClick, children, variant = "primary", dark, style: s = {} }) {
  const c = ac(dark);
  const base = { padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", transition: "all 0.2s", fontFamily: "inherit" };
  const variants = {
    primary: { background: c ? c.solid : "#f97316", color: "#fff" },
    ghost: { background: "transparent", color: c ? c.solid : "#f97316", border: `1px solid ${c ? c.a30 : "rgba(249,115,22,0.3)"}` },
    danger: { background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" },
  };
  return <button onClick={onClick} style={{ ...base, ...variants[variant], ...s }}>{children}</button>;
}

function Toast({ message, type }) {
  const colors = { success: "#22c55e", error: "#ef4444", info: "#3b82f6" };
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, background: "#1a1a1a", border: `1px solid ${colors[type] || colors.info}`, borderLeft: `4px solid ${colors[type] || colors.info}`, padding: "12px 18px", borderRadius: 10, boxShadow: "0 10px 30px rgba(0,0,0,0.2)", fontSize: 13, fontWeight: 500, color: "#f3f4f6", animation: "slideInRight 0.3s ease", maxWidth: 280 }}>
      {message}
    </div>
  );
}

// --- IMAGE UPLOAD
function ImageUpload({ value, onChange, dark, label = "Upload Image" }) {
  const inputRef = useRef(null);
  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onChange(ev.target.result);
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <div onClick={() => inputRef.current.click()} style={{ border: dark ? "2px dashed rgba(255,255,255,0.12)" : "2px dashed rgba(0,0,0,0.12)", borderRadius: 10, padding: "16px", textAlign: "center", cursor: "pointer", background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)", transition: "all 0.2s", marginBottom: value ? 10 : 0 }}>
        {value
          ? <img src={value} alt="" style={{ maxHeight: 80, borderRadius: 6, objectFit: "cover" }} />
          : <div style={{ color: dark ? "#6b7280" : "#9ca3af", fontSize: 13 }}><div style={{ fontSize: 22, marginBottom: 4 }}>📎</div>{label}</div>
        }
      </div>
      {value && <button onClick={() => onChange(null)} style={{ background: "none", border: "none", color: "#ef4444", fontSize: 12, cursor: "pointer", padding: 0 }}>Remove image</button>}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
    </div>
  );
}

// --- ADMIN LOGIN
function AdminLogin({ onLogin, dark }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const c = ac(dark);
  const handle = () => {
    if (password === getStoredPassword()) { onLogin(); setError(""); }
    else setError("Incorrect password.");
  };
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: dark ? "#0a0a0a" : "#f8f8f8", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 360, padding: 32, borderRadius: 18, background: dark ? "#111" : "#fff", border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)", boxShadow: dark ? "0 40px 80px rgba(0,0,0,0.5)" : "0 20px 60px rgba(0,0,0,0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔒</div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: dark ? "#f3f4f6" : "#111827" }}>Admin Access</h2>
          <p style={{ margin: "6px 0 0", fontSize: 12, color: dark ? "#9ca3af" : "#6b7280" }}>Default password: <code style={{ background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", padding: "1px 6px", borderRadius: 4 }}>admin123</code></p>
        </div>
        <FormField label="Password" dark={dark}>
          <div style={{ position: "relative" }}>
            <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handle()} placeholder="Enter password"
              style={{ width: "100%", padding: "9px 40px 9px 12px", borderRadius: 8, fontSize: 14, background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", color: dark ? "#f3f4f6" : "#111827", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
            <button onClick={() => setShowPw(v => !v)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: dark ? "#6b7280" : "#9ca3af", padding: 0, display: "flex" }}>
              <Icon d={showPw ? "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" : "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"} size={16} />
            </button>
          </div>
        </FormField>
        {error && <p style={{ color: "#ef4444", fontSize: 13, margin: "-8px 0 12px" }}>{error}</p>}
        <Btn onClick={handle} dark={dark} style={{ width: "100%" }}>Login</Btn>
      </div>
    </div>
  );
}

// --- SECURITY TAB
function SecurityTab({ dark, showToast, onLogout }) {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [errors, setErrors] = useState({});
  const c = ac(dark);

  const validate = () => {
    const e = {};
    if (!form.current) e.current = "Required";
    else if (form.current !== getStoredPassword()) e.current = "Incorrect current password";
    if (!form.next) e.next = "Required";
    else if (form.next.length < 6) e.next = "Must be at least 6 characters";
    if (!form.confirm) e.confirm = "Required";
    else if (form.next !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStoredPassword(form.next);
    setForm({ current: "", next: "", confirm: "" });
    showToast("Password updated — you'll be logged out now", "success");
    setTimeout(() => onLogout(), 1800);
  };

  const strength = pw => {
    if (!pw) return null;
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return { label: "Weak", color: "#ef4444", width: "25%" };
    if (score <= 2) return { label: "Fair", color: "#f59e0b", width: "50%" };
    if (score <= 3) return { label: "Good", color: "#3b82f6", width: "75%" };
    return { label: "Strong", color: "#22c55e", width: "100%" };
  };

  const str = strength(form.next);

  const PwInput = ({ value, onChange, show, onToggle, placeholder, error }) => (
    <div>
      <div style={{ position: "relative" }}>
        <input type={show ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder}
          style={{ width: "100%", padding: "9px 40px 9px 12px", borderRadius: 8, fontSize: 14, background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", border: error ? "1px solid rgba(239,68,68,0.5)" : (dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)"), color: dark ? "#f3f4f6" : "#111827", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
        <button onClick={onToggle} type="button" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: dark ? "#6b7280" : "#9ca3af", padding: 0, display: "flex" }}>
          <Icon d={show ? "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" : "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"} size={15} />
        </button>
      </div>
      {error && <p style={{ margin: "4px 0 0", fontSize: 12, color: "#ef4444" }}>{error}</p>}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ background: dark ? "#111" : "#fff", borderRadius: 14, padding: 24, border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: c.a10, border: `1px solid ${c.a20}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🔑</div>
          <div>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: dark ? "#f3f4f6" : "#111827" }}>Change Admin Password</h3>
            <p style={{ margin: 0, fontSize: 12, color: dark ? "#6b7280" : "#9ca3af" }}>You'll be logged out after changing</p>
          </div>
        </div>
        <FormField label="Current Password" dark={dark}>
          <PwInput value={form.current} onChange={e => setForm({ ...form, current: e.target.value })} show={showCurrent} onToggle={() => setShowCurrent(v => !v)} placeholder="Your current password" error={errors.current} />
        </FormField>
        <div style={{ height: 1, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", margin: "4px 0 16px" }} />
        <FormField label="New Password" dark={dark}>
          <PwInput value={form.next} onChange={e => setForm({ ...form, next: e.target.value })} show={showNext} onToggle={() => setShowNext(v => !v)} placeholder="At least 6 characters" error={errors.next} />
          {str && (
            <div style={{ marginTop: 8 }}>
              <div style={{ height: 4, borderRadius: 2, background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: str.width, background: str.color, borderRadius: 2, transition: "width 0.3s, background 0.3s" }} />
              </div>
              <p style={{ margin: "4px 0 0", fontSize: 11, color: str.color, fontWeight: 500 }}>{str.label} password</p>
            </div>
          )}
        </FormField>
        <FormField label="Confirm New Password" dark={dark}>
          <PwInput value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} show={showNext} onToggle={() => setShowNext(v => !v)} placeholder="Repeat new password" error={errors.confirm} />
        </FormField>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 4 }}>
          <Btn onClick={handleSave} dark={dark}>Update Password</Btn>
          <button onClick={() => { setForm({ current: "", next: "", confirm: "" }); setErrors({}); }} style={{ background: "none", border: "none", cursor: "pointer", color: dark ? "#6b7280" : "#9ca3af", fontSize: 13, padding: "9px 4px" }}>Clear</button>
        </div>
      </div>
      <div style={{ background: c.a05, border: `1px solid ${c.a15}`, borderRadius: 12, padding: "14px 18px" }}>
        <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 600, color: c.solid }}>💡 Password tips</p>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: dark ? "#9ca3af" : "#6b7280", lineHeight: 1.8 }}>
          <li>Use at least 8 characters for a good password</li>
          <li>Mix uppercase, numbers, and symbols for strength</li>
          <li>Avoid reusing passwords from other services</li>
          <li>Your password is stored locally in this browser</li>
        </ul>
      </div>
    </div>
  );
}

// --- ADMIN DASHBOARD
function AdminDashboard({ data, onUpdate, onLogout, dark }) {
  const [tab, setTab] = useState("bio");
  const [toast, setToast] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [editingCert, setEditingCert] = useState(null);
  const [bioForm, setBioForm] = useState({ ...data.bio, skills: data.bio.skills.join(", ") });
  const [socialsForm, setSocialsForm] = useState({ ...data.socials });
  const c = ac(dark);

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };
  const saveBio = () => { onUpdate({ bio: { ...bioForm, skills: bioForm.skills.split(",").map(s => s.trim()).filter(Boolean) } }); showToast("Bio saved successfully"); };
  const saveSocials = () => { onUpdate({ socials: socialsForm }); showToast("Socials saved successfully"); };
  const deleteProject = id => { onUpdate({ projects: data.projects.filter(p => p.id !== id) }); showToast("Project deleted", "info"); };
  const saveProject = proj => {
    const isNew = !proj.id;
    onUpdate({ projects: isNew ? [...data.projects, { ...proj, id: Date.now() }] : data.projects.map(p => p.id === proj.id ? proj : p) });
    setEditingProject(null);
    showToast(isNew ? "Project added" : "Project updated");
  };
  const deleteCert = id => { onUpdate({ certificates: data.certificates.filter(c => c.id !== id) }); showToast("Certificate deleted", "info"); };
  const saveCert = cert => {
    const isNew = !cert.id;
    onUpdate({ certificates: isNew ? [...data.certificates, { ...cert, id: Date.now() }] : data.certificates.map(c => c.id === cert.id ? cert : c) });
    setEditingCert(null);
    showToast(isNew ? "Certificate added" : "Certificate updated");
  };

  const tabs = [
    { key: "bio", label: "Bio & Skills" },
    { key: "projects", label: "Projects" },
    { key: "certs", label: "Certificates" },
    { key: "socials", label: "Socials" },
    { key: "security", label: "🔒 Security" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: dark ? "#0a0a0a" : "#f4f4f5", fontFamily: "inherit" }}>
      <div style={{ background: dark ? "#111" : "#fff", borderBottom: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 32, height: 32, borderRadius: 8, background: c.solid, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚙️</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: dark ? "#f3f4f6" : "#111827" }}>Admin Dashboard</div>
            <div style={{ fontSize: 11, color: dark ? "#6b7280" : "#9ca3af" }}>Portfolio CMS</div>
          </div>
        </div>
        <Btn onClick={onLogout} variant="ghost" dark={dark}>Logout</Btn>
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 20px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 24, flexWrap: "wrap", background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", padding: 4, borderRadius: 10, border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ flex: "1 1 auto", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "none", transition: "all 0.2s", fontFamily: "inherit", background: tab === t.key ? c.solid : "transparent", color: tab === t.key ? "#fff" : (dark ? "#9ca3af" : "#6b7280") }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "bio" && (
          <div style={{ background: dark ? "#111" : "#fff", borderRadius: 14, padding: 24, border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 600, color: dark ? "#f3f4f6" : "#111827" }}>Edit Bio & Profile</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <FormField label="Name" dark={dark}><Input value={bioForm.name} onChange={e => setBioForm({ ...bioForm, name: e.target.value })} dark={dark} /></FormField>
              <FormField label="Title" dark={dark}><Input value={bioForm.title} onChange={e => setBioForm({ ...bioForm, title: e.target.value })} dark={dark} /></FormField>
            </div>
            <FormField label="Description" dark={dark}><Input value={bioForm.description} onChange={e => setBioForm({ ...bioForm, description: e.target.value })} dark={dark} multiline rows={3} /></FormField>
            <FormField label="Status" dark={dark}><Input value={bioForm.status} onChange={e => setBioForm({ ...bioForm, status: e.target.value })} dark={dark} /></FormField>
            <FormField label="Skills (comma-separated)" dark={dark}><Input value={bioForm.skills} onChange={e => setBioForm({ ...bioForm, skills: e.target.value })} dark={dark} /></FormField>
            <FormField label="Resume URL" dark={dark}><Input value={bioForm.resumeUrl} onChange={e => setBioForm({ ...bioForm, resumeUrl: e.target.value })} dark={dark} /></FormField>
            <FormField label="Profile Photo" dark={dark}><ImageUpload value={bioForm.avatar} onChange={v => setBioForm({ ...bioForm, avatar: v })} dark={dark} /></FormField>
            <Btn onClick={saveBio} dark={dark}>Save Changes</Btn>
          </div>
        )}

        {tab === "projects" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: dark ? "#f3f4f6" : "#111827" }}>Manage Projects</h3>
              <Btn onClick={() => setEditingProject({ title: "", description: "", fullDescription: "", github: "", date: "", tags: "", image: null })} dark={dark}>+ Add Project</Btn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
              {data.projects.map(p => <ProjectCard key={p.id} project={p} dark={dark} isAdmin onEdit={setEditingProject} onDelete={deleteProject} />)}
            </div>
          </div>
        )}

        {tab === "certs" && (
          <div style={{ background: dark ? "#111" : "#fff", borderRadius: 14, padding: 24, border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: dark ? "#f3f4f6" : "#111827" }}>Manage Certificates</h3>
              <Btn onClick={() => setEditingCert({ title: "", org: "", date: "", image: null })} dark={dark}>+ Add Certificate</Btn>
            </div>
            {data.certificates.map((cert, i) => <CertCard key={cert.id} cert={cert} dark={dark} index={i} isAdmin onEdit={setEditingCert} onDelete={deleteCert} />)}
          </div>
        )}

        {tab === "socials" && (
          <div style={{ background: dark ? "#111" : "#fff", borderRadius: 14, padding: 24, border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 600, color: dark ? "#f3f4f6" : "#111827" }}>Edit Social Links</h3>
            <FormField label="GitHub URL" dark={dark}><Input value={socialsForm.github} onChange={e => setSocialsForm({ ...socialsForm, github: e.target.value })} dark={dark} /></FormField>
            <FormField label="LinkedIn URL" dark={dark}><Input value={socialsForm.linkedin} onChange={e => setSocialsForm({ ...socialsForm, linkedin: e.target.value })} dark={dark} /></FormField>
            <FormField label="Instagram URL" dark={dark}><Input value={socialsForm.instagram} onChange={e => setSocialsForm({ ...socialsForm, instagram: e.target.value })} dark={dark} /></FormField>
            <FormField label="Email (mailto:)" dark={dark}><Input value={socialsForm.email} onChange={e => setSocialsForm({ ...socialsForm, email: e.target.value })} dark={dark} /></FormField>
            <Btn onClick={saveSocials} dark={dark}>Save Socials</Btn>
          </div>
        )}

        {tab === "security" && <SecurityTab dark={dark} showToast={showToast} onLogout={onLogout} />}
      </div>

      {editingProject && <ProjectModal proj={editingProject} dark={dark} onSave={saveProject} onClose={() => setEditingProject(null)} />}
      {editingCert && <CertModal cert={editingCert} dark={dark} onSave={saveCert} onClose={() => setEditingCert(null)} />}
      {toast && <Toast message={toast.msg} type={toast.type} dark={dark} />}
    </div>
  );
}

function ProjectModal({ proj, dark, onSave, onClose }) {
  const [form, setForm] = useState({ ...proj, tags: Array.isArray(proj.tags) ? proj.tags.join(", ") : proj.tags || "" });
  return (
    <Modal title={proj.id ? "Edit Project" : "Add Project"} onClose={onClose} dark={dark}>
      <FormField label="Title" dark={dark}><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} dark={dark} /></FormField>
      <FormField label="Short Description" dark={dark}><Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} dark={dark} multiline rows={2} /></FormField>
      <FormField label="Full Description" dark={dark}><Input value={form.fullDescription} onChange={e => setForm({ ...form, fullDescription: e.target.value })} dark={dark} multiline rows={3} /></FormField>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FormField label="GitHub URL" dark={dark}><Input value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} dark={dark} /></FormField>
        <FormField label="Date (YYYY-MM)" dark={dark}><Input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} dark={dark} /></FormField>
      </div>
      <FormField label="Tags (comma-separated)" dark={dark}><Input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} dark={dark} /></FormField>
      <FormField label="Project Image" dark={dark}><ImageUpload value={form.image} onChange={v => setForm({ ...form, image: v })} dark={dark} /></FormField>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
        <Btn onClick={onClose} variant="ghost" dark={dark}>Cancel</Btn>
        <Btn onClick={() => onSave({ ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) })} dark={dark}>Save Project</Btn>
      </div>
    </Modal>
  );
}

function CertModal({ cert, dark, onSave, onClose }) {
  const [form, setForm] = useState({ ...cert });
  return (
    <Modal title={cert.id ? "Edit Certificate" : "Add Certificate"} onClose={onClose} dark={dark}>
      <FormField label="Certificate Title" dark={dark}><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} dark={dark} /></FormField>
      <FormField label="Issuing Organization" dark={dark}><Input value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} dark={dark} /></FormField>
      <FormField label="Date (YYYY-MM)" dark={dark}><Input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} dark={dark} /></FormField>
      <FormField label="Certificate Image" dark={dark}><ImageUpload value={form.image} onChange={v => setForm({ ...form, image: v })} dark={dark} /></FormField>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
        <Btn onClick={onClose} variant="ghost" dark={dark}>Cancel</Btn>
        <Btn onClick={() => onSave(form)} dark={dark}>Save Certificate</Btn>
      </div>
    </Modal>
  );
}

// --- PORTFOLIO (PUBLIC VIEW)
function Portfolio({ data, dark }) {
  const [openSection, setOpenSection] = useState(null);
  const [heroRef, heroVisible] = useFadeIn(0.05);
  const c = ac(dark);
  const toggle = key => setOpenSection(openSection === key ? null : key);
  return (
    <div style={{ minHeight: "100vh", background: dark ? "#0a0a0a" : "#f8f8f8", fontFamily: "inherit" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 56px" }}>
        <div ref={heroRef} style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(20px)", transition: "all 0.6s ease" }}>
          <Avatar src={data.bio.avatar} name={data.bio.name} size={100} dark={dark} />
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ marginBottom: 6 }}><StatusBadge text={data.bio.status} dark={dark} /></div>
            <h1 style={{ margin: "8px 0 2px", fontSize: "clamp(24px,5vw,36px)", fontWeight: 700, color: dark ? "#f3f4f6" : "#111827", letterSpacing: "-0.03em", fontFamily: "inherit" }}>{data.bio.name}</h1>
            <p style={{ margin: "0 0 10px", fontSize: 15, color: c.solid, fontWeight: 500 }}>{data.bio.title}</p>
            <p style={{ margin: "0 0 16px", fontSize: 14, color: dark ? "#9ca3af" : "#6b7280", lineHeight: 1.7, maxWidth: 460 }}>{data.bio.description}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
              {data.bio.skills.map(s => <SkillTag key={s} skill={s} dark={dark} />)}
            </div>
            <a href={data.bio.resumeUrl} download style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: c.solid, color: "#fff", textDecoration: "none", transition: "all 0.2s" }}>
              <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" size={15} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", marginBottom: 24 }} />
      </div>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 80px", display: "flex", flexDirection: "column", gap: 8 }}>
        <Section title="My Projects" open={openSection === "projects"} onToggle={() => toggle("projects")} dark={dark}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {data.projects.map(p => <ProjectCard key={p.id} project={p} dark={dark} isAdmin={false} />)}
          </div>
        </Section>
        <Section title="Certificates" open={openSection === "certs"} onToggle={() => toggle("certs")} dark={dark}>
          {data.certificates.map((cert, i) => <CertCard key={cert.id} cert={cert} dark={dark} index={i} isAdmin={false} />)}
        </Section>
        <Section title="Socials" open={openSection === "socials"} onToggle={() => toggle("socials")} dark={dark}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 420 }}>
            <SocialButton href={data.socials.github} icon={<GithubIcon />} label="GitHub" dark={dark} />
            <SocialButton href={data.socials.linkedin} icon={<LinkedInIcon />} label="LinkedIn" dark={dark} />
            <SocialButton href={data.socials.instagram} icon={<InstagramIcon />} label="Instagram" dark={dark} />
            <SocialButton href={data.socials.email} icon={<EmailIcon />} label="Email" dark={dark} />
          </div>
        </Section>
      </div>
    </div>
  );
}

// --- NAV BAR
function NavBar({ dark, onToggleDark, isAdmin, onToggleAdmin }) {
  const c = ac(dark);
  return (
    <nav style={{ position: "fixed", top: 3, left: 0, right: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", background: dark ? "rgba(10,10,10,0.85)" : "rgba(248,248,248,0.85)", backdropFilter: "blur(12px)", borderBottom: dark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: c.solid, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>{"{"}</div>
        <span style={{ fontSize: 14, fontWeight: 600, color: dark ? "#f3f4f6" : "#111827" }}>portfolio</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={onToggleDark} style={{ background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)", border: "none", borderRadius: 8, padding: "7px 8px", cursor: "pointer", color: dark ? "#f3f4f6" : "#374151", display: "flex", alignItems: "center", transition: "all 0.2s" }}>
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
        <button onClick={onToggleAdmin} style={{ background: isAdmin ? c.a10 : (dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"), border: isAdmin ? `1px solid ${c.a25}` : "1px solid transparent", borderRadius: 8, padding: "7px 12px", cursor: "pointer", color: isAdmin ? c.solid : (dark ? "#9ca3af" : "#6b7280"), fontSize: 12, fontWeight: 500, transition: "all 0.2s" }}>
          {isAdmin ? "← Portfolio" : "Admin"}
        </button>
      </div>
    </nav>
  );
}

// --- ROOT
export default function App() {
  const [dark, setDark] = useState(false);
  const [data, setData] = useState(DEFAULT_DATA);
  const [view, setView] = useState("portfolio");
  const [loggedIn, setLoggedIn] = useState(false);

  const updateData = useCallback(patch => {
    setData(prev => ({ ...prev, ...patch }));
  }, []);

  const login = () => setLoggedIn(true);
  const logout = () => { setLoggedIn(false); setView("portfolio"); };
  const toggleAdmin = () => setView(v => v === "admin" ? "portfolio" : "admin");

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; font-family: 'DM Sans', sans-serif; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
    @keyframes slideInRight { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:none} }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${ac(dark).a30}; border-radius: 3px; }
  `;

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ fontFamily: "'DM Sans', sans-serif", background: dark ? "#0a0a0a" : "#f8f8f8", minHeight: "100vh", color: dark ? "#f3f4f6" : "#111827", transition: "background 0.3s ease, color 0.3s ease" }}>
        <ProgressBar dark={dark} />
        <NavBar dark={dark} onToggleDark={() => setDark(d => !d)} isAdmin={view === "admin"} onToggleAdmin={toggleAdmin} />
        <div style={{ paddingTop: 60 }}>
          {view === "portfolio" && <Portfolio data={data} dark={dark} />}
          {view === "admin" && !loggedIn && <AdminLogin onLogin={login} dark={dark} />}
          {view === "admin" && loggedIn && <AdminDashboard data={data} onUpdate={updateData} onLogout={logout} dark={dark} />}
        </div>
      </div>
    </>
  );
}
