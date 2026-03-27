"use client";

import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import OverlayMenu from "./overlayMenu";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#gallery", label: "Gallery" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [highlight, setHighlight] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const homeRef = useRef(null);
  const navRef = useRef(null);
  const linkRefs = useRef([]);
  const overlayRef = useRef(null);

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

  // get offset for highlight
  const getOffset = (el) => {
    if (!el || !navRef.current) return null;
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return {
      left: elRect.left - navRect.left,
      width: elRect.width,
    };
  };

  // home snap
  const snapToHome = () => {
    const pos = getOffset(homeRef.current);
    if (!pos) return;
    setHighlight({ ...pos, opacity: 1 });
  };

  // hover preview (DOES NOT override active section)
  const moveTo = (el) => {
    const pos = getOffset(el);
    if (!pos) return;

    setHighlight((prev) => ({
      ...pos,
      opacity: 0.6,
    }));
  };

  // initial highlight
  useEffect(() => {
    if (!isMobile && homeRef.current && navRef.current) {
      snapToHome();
    }
  }, [isMobile]);

  // Intersection Observer (ACTIVE SECTION CONTROL)
  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((sec) => sec && observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  // sync highlight with active section
  useEffect(() => {
    const index = links.findIndex((l) => l.href === active);
    if (index === -1) return;

    const el = linkRefs.current[index];
    if (!el) return;

    const pos = getOffset(el);
    if (!pos) return;

    setHighlight({ ...pos, opacity: 1 });
  }, [active]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap');

        .navbar-wrap {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          font-family: 'DM Mono', monospace;
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
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: rgba(255,255,255,0.95);
        }

        .nav-link.active {
          color: #fff;
        }
      `}</style>

      {/* DESKTOP */}
      {!isMobile && (
        <div className="navbar-wrap">
          <nav
            ref={navRef}
            className={`navbar${scrolled ? " scrolled" : ""}`}
          >
            <div
              className="nav-highlight"
              style={{
                left: highlight.left,
                width: highlight.width,
                opacity: highlight.opacity,
              }}
            />

            <Link
              href="/"
              ref={homeRef}
              className="nav-home"
              onMouseEnter={() => moveTo(homeRef.current)}
            >
              <FaHome />
            </Link>

            <div className="nav-divider" />

            {links.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                ref={(el) => (linkRefs.current[i] = el)}
                className={`nav-link${active === href ? " active" : ""}`}
                onClick={() => setActive(href)}
                onMouseEnter={() => moveTo(linkRefs.current[i])}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* MOBILE */}
      {isMobile && (
        <>
          <div className="navbar-wrap">
            <div className={`navbar-mobile${scrolled ? " scrolled" : ""}`}>
              <Link href="/" className="mob-home">
                <FaHome />
              </Link>
              <div className="mob-divider" />
              <button
                className="mob-bars"
                onClick={() => overlayRef.current?.openMenu()}
              >
                <span className="mob-bar mob-bar-1" />
                <span className="mob-bar mob-bar-2" />
                <span className="mob-bar mob-bar-3" />
              </button>
            </div>
          </div>

          <OverlayMenu ref={overlayRef} />
        </>
      )}
    </>
  );
}