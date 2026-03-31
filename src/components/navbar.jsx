"use client";
import { FaHome } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import OverlayMenu from "./overlayMenu";

const links = [
  { target: "about",      label: "About" },
  { target: "skills",     label: "Skills" },
  { target: "projects",   label: "Projects" },
  { target: "experience", label: "Experience" },
  { target: "gallery",    label: "Gallery" },
];

// All sections including hero — order matters for priority
const allSections = ["hero", ...links.map((l) => l.target)];

export default function Navbar({ sectionRefs = {} }) {
  const [active, setActive]       = useState("hero");
  const [scrolled, setScrolled]   = useState(false);
  const [isMobile, setIsMobile]   = useState(false);
  const [highlight, setHighlight] = useState({ left: 0, width: 0, opacity: 0 });

  const homeRef    = useRef(null);
  const navRef     = useRef(null);
  const linkRefs   = useRef([]);
  const overlayRef = useRef(null);
  const activePos  = useRef({ left: 0, width: 0, opacity: 0 });
  const intersectingSet = useRef(new Set());

  // scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // responsive
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const getOffset = (el) => {
    if (!el || !navRef.current) return null;
    const navRect = navRef.current.getBoundingClientRect();
    const elRect  = el.getBoundingClientRect();
    return { left: elRect.left - navRect.left, width: elRect.width };
  };

  const moveTo       = (el) => { const pos = getOffset(el); if (!pos) return; setHighlight({ ...pos, opacity: 0.6 }); };
  const restoreActive = () => setHighlight(activePos.current);

  const scrollToSection = (target) => {
    if (target === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActive("hero");
      return;
    }
    const section = sectionRefs[target]?.current || document.getElementById(target);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(target);
  };

  const resolveEl = (target) => {
    if (target === "hero") return homeRef.current;
    const index = links.findIndex((l) => l.target === target);
    return index !== -1 ? linkRefs.current[index] : null;
  };

  // sync highlight with active
  useEffect(() => {
    const el = resolveEl(active);
    if (!el) return;
    const pos = getOffset(el);
    if (!pos) return;
    const next = { ...pos, opacity: 1 };
    activePos.current = next;
    setHighlight(next);
  }, [active]);

  // initial highlight
  useEffect(() => {
    if (!isMobile && homeRef.current && navRef.current) {
      const pos = getOffset(homeRef.current);
      if (!pos) return;
      const next = { ...pos, opacity: 1 };
      activePos.current = next;
      setHighlight(next);
    }
  }, [isMobile]);

  // Intersection Observer
  useEffect(() => {
    const sectionEls = allSections
      .map((name) => {
        const refEl      = sectionRefs[name]?.current;
        const fallbackEl = document.getElementById(name);
        return { name, el: refEl || fallbackEl };
      })
      .filter((s) => s.el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionName =
            entry.target.id ||
            Object.keys(sectionRefs).find(
              (k) => sectionRefs[k]?.current === entry.target
            );
          if (!sectionName) return;
          if (entry.isIntersecting) {
            intersectingSet.current.add(sectionName);
          } else {
            intersectingSet.current.delete(sectionName);
          }
        });
        const current = allSections.find((name) =>
          intersectingSet.current.has(name)
        );
        if (current) setActive(current);
      },
      { threshold: 0.4 }
    );

    sectionEls.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionRefs]);

  return (
    <>
      <style>{`
        .navbar-wrap {
          position: fixed;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
        }
        .navbar {
          position: relative;
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 6px 8px;
          background: rgba(8, 8, 12, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
        }
        .navbar.scrolled {
          background: rgba(6, 6, 10, 0.9);
        }
        .nav-highlight {
          position: absolute;
          top: 6px;
          height: calc(100% - 12px);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          pointer-events: none;
          transition: left 0.25s ease, width 0.25s ease, opacity 0.2s ease;
        }
        .nav-home {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: rgba(255,255,255,0.6);
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .nav-divider {
          width: 1px;
          height: 18px;
          background: rgba(255,255,255,0.1);
        }
        .nav-link {
          display: flex;
          align-items: center;
          padding: 7px 14px;
          border-radius: 999px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.45);
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .nav-link:hover { color: rgba(255,255,255,0.95); }
        .nav-link.active { color: #fff; }

        /* Mobile */
        .navbar-mobile {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 8px;
          background: rgba(8, 8, 12, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
        }
        .navbar-mobile.scrolled {
          background: rgba(6, 6, 10, 0.9);
        }
        .mob-home {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: rgba(255,255,255,0.6);
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .mob-divider {
          width: 1px;
          height: 18px;
          background: rgba(255,255,255,0.1);
        }
        .mob-bars {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          padding: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .mob-bar {
          display: block;
          width: 100%;
          height: 1.5px;
          border-radius: 2px;
          background: rgba(255,255,255,0.65);
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
      `}</style>

      {/* DESKTOP */}
      {!isMobile && (
        <div className="navbar-wrap">
          <nav
            ref={navRef}
            className={`navbar${scrolled ? " scrolled" : ""}`}
            onMouseLeave={restoreActive}
          >
            <div
              className="nav-highlight"
              style={{
                left:    highlight.left,
                width:   highlight.width,
                opacity: highlight.opacity,
              }}
            />
            <button
              ref={homeRef}
              className="nav-home"
              onMouseEnter={() => moveTo(homeRef.current)}
              onClick={() => scrollToSection("hero")}
              type="button"
            >
              <FaHome />
            </button>
            <div className="nav-divider" />
            {links.map(({ target, label }, i) => (
              <button
                key={target}
                ref={(el) => (linkRefs.current[i] = el)}
                className={`nav-link${active === target ? " active" : ""}`}
                onClick={() => scrollToSection(target)}
                onMouseEnter={() => moveTo(linkRefs.current[i])}
                type="button"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* MOBILE */}
      {isMobile && (
        <>
          <div className="navbar-wrap">
            <div className={`navbar-mobile${scrolled ? " scrolled" : ""}`}>
              <button
                className="mob-home"
                onClick={() => scrollToSection("hero")}
                type="button"
              >
                <FaHome />
              </button>
              <div className="mob-divider" />
              <button
                className="mob-bars"
                onClick={() => overlayRef.current?.openMenu()}
                type="button"
              >
                <span className="mob-bar" />
                <span className="mob-bar" />
                <span className="mob-bar" />
              </button>
            </div>
          </div>
          <OverlayMenu
            ref={overlayRef}
            sectionRefs={sectionRefs}
            onNavigate={setActive}
          />
        </>
      )}
    </>
  );
}