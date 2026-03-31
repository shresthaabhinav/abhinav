"use client";

import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { FaHome } from "react-icons/fa";

const links = [
  { target: "about",      label: "About",      num: "01" },
  { target: "skills",     label: "Skills",     num: "02" },
  { target: "projects",   label: "Projects",   num: "03" },
  { target: "experience", label: "Experience", num: "04" },
  { target: "gallery",    label: "Gallery",    num: "05" },
];

const OverlayMenu = forwardRef(function OverlayMenu(
  { sectionRefs = {}, onNavigate },
  ref
) {
  const [open, setOpen]           = useState(false);
  const [animating, setAnimating] = useState(false);

  const openMenu = () => {
    setAnimating(true);
    setOpen(true);
  };

  const closeMenu = () => {
    setAnimating(false);
    setTimeout(() => setOpen(false), 500);
  };

  useImperativeHandle(ref, () => ({ openMenu }));

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scrollToSection = (target) => {
    closeMenu();
    if (target === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      onNavigate?.("hero");
      return;
    }
    // Small delay so the close animation starts before scrolling
    setTimeout(() => {
      const section =
        sectionRefs[target]?.current || document.getElementById(target);
      if (!section) return;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      onNavigate?.(target);
    }, 120);
  };

  return (
    <>
      <style>{`
        .om-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          flex-direction: column;
          background: #08080c;
          overflow: hidden;
          clip-path: circle(0% at calc(100% - 42px) 42px);
          transition: clip-path 0.55s cubic-bezier(0.77,0,0.175,1);
          pointer-events: none;
        }

        .om-overlay.animating {
          clip-path: circle(150% at calc(100% - 42px) 42px);
          pointer-events: all;
        }

        .om-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 180px;
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }

        .om-bg-num {
          position: absolute;
          bottom: -40px;
          right: -20px;
          font-family: 'Syne', sans-serif;
          font-size: clamp(160px, 30vw, 260px);
          font-weight: 800;
          color: rgba(255,255,255,0.025);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          transition: opacity 0.3s ease;
        }

        .om-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 90px 32px 40px;
        }

        .om-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0;
        }

        .om-item {
          display: flex;
          align-items: baseline;
          gap: 16px;
          padding: 14px 0;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: transparent;
          cursor: pointer;
          text-align: left;
          width: 100%;
          text-decoration: none;
          opacity: 0;
          transform: translateX(32px);
          transition: opacity 0.4s ease, transform 0.4s ease, border-color 0.2s ease;
        }

        .om-overlay.animating .om-item {
          opacity: 1;
          transform: translateX(0);
        }

        .om-overlay.animating .om-item:nth-child(1) { transition-delay: 0.15s; }
        .om-overlay.animating .om-item:nth-child(2) { transition-delay: 0.2s; }
        .om-overlay.animating .om-item:nth-child(3) { transition-delay: 0.25s; }
        .om-overlay.animating .om-item:nth-child(4) { transition-delay: 0.3s; }
        .om-overlay.animating .om-item:nth-child(5) { transition-delay: 0.35s; }

        .om-item:hover {
          border-bottom-color: rgba(255,255,255,0.2);
        }

        .om-num {
          font-size: 10px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.12em;
          min-width: 24px;
          padding-top: 4px;
        }

        .om-label {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 10vw, 52px);
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          letter-spacing: -0.01em;
          line-height: 1;
          transition: letter-spacing 0.3s ease, color 0.2s ease;
        }

        .om-item:hover .om-label {
          color: #fff;
          letter-spacing: 0.08em;
        }

        .om-arrow {
          margin-left: auto;
          font-size: 20px;
          color: rgba(255,255,255,0.15);
          transition: transform 0.25s ease, color 0.2s ease;
          align-self: center;
        }

        .om-item:hover .om-arrow {
          transform: translateX(6px);
          color: rgba(255,255,255,0.5);
        }

        .om-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.4s ease 0.45s, transform 0.4s ease 0.45s;
        }

        .om-overlay.animating .om-footer {
          opacity: 1;
          transform: translateY(0);
        }

        .om-footer-home {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.35);
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s ease;
        }

        .om-footer-home:hover { color: rgba(255,255,255,0.8); }

        .om-close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 44px;
          height: 44px;
          border: none;
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.7);
          font-size: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          transition: all 0.2s ease;
        }

        .om-close:hover {
          background: rgba(255,255,255,0.15);
          color: #fff;
          transform: rotate(90deg);
        }

        .om-footer-tag {
          font-size: 10px;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.08em;
        }
      `}</style>

      {open && (
        <div className={`om-overlay${animating ? " animating" : ""}`}>
          <button className="om-close" onClick={closeMenu} type="button">
            &times;
          </button>
          <div className="om-bg-num">0{links.length}</div>

          <div className="om-inner">
            <nav className="om-nav">
              {links.map(({ target, label, num }) => (
                <button
                  key={target}
                  className="om-item"
                  onClick={() => scrollToSection(target)}
                  type="button"
                >
                  <span className="om-num">{num}</span>
                  <span className="om-label">{label}</span>
                  <span className="om-arrow">→</span>
                </button>
              ))}
            </nav>

            <footer className="om-footer">
              <button
                className="om-footer-home"
                onClick={() => scrollToSection("hero")}
                type="button"
              >
                <FaHome size={12} />
                Home
              </button>
              <span className="om-footer-tag">
                Portfolio · {new Date().getFullYear()}
              </span>
            </footer>
          </div>
        </div>
      )}
    </>
  );
});

export default OverlayMenu;