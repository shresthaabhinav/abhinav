"use client";
import { useRef, useState, useEffect, useCallback } from "react";

const DEMO_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80", alt: "Mountain sunrise" },
  { id: 2, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80", alt: "Mountain peaks" },
  { id: 3, src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600&q=80", alt: "Forest path" },
];

const MAX_VISIBLE_NUMBERS = 10;

export default function ImageGallery({
  images = DEMO_IMAGES,
  title = "Life Lately",
}) {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const autoTimerRef = useRef(null);

  const [activeBg, setActiveBg] = useState(images[0]?.src ?? null);
  const [prevBg, setPrevBg] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const changeBg = useCallback((src) => {
    if (!src || src === activeBg) return;
    setPrevBg(activeBg);
    setActiveBg(src);
    setTimeout(() => setPrevBg(null), 750);
  }, [activeBg]);

  const goTo = useCallback((idx) => {
    setActiveIndex(idx);
    setPrevBg(activeBg);
    setActiveBg(images[idx].src);
    setTimeout(() => setPrevBg(null), 750);
  }, [activeBg, images]);

  const nextPage = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % images.length;
      setPrevBg((bg) => bg);
      setActiveBg((cur) => {
        setPrevBg(cur);
        return images[next].src;
      });
      setTimeout(() => setPrevBg(null), 750);
      return next;
    });
  }, [images]);

  const resetTimer = useCallback(() => {
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(nextPage, 12000);
  }, [nextPage]);

  useEffect(() => {
    autoTimerRef.current = setInterval(nextPage, 12000);
    return () => clearInterval(autoTimerRef.current);
  }, [nextPage]);

  const selectImage = (idx) => {
    if (isDragging.current) return;
    goTo(idx);
    resetTimer();
  };

  // mouse drag
  const onMouseDown = (e) => {
    if (e.target.closest("button")) return;
    isDragging.current = false;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollStart.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  };

  useEffect(() => {
  const handleMouseLeave = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  window.addEventListener("mouseleave", handleMouseLeave);
  return () => window.removeEventListener("mouseleave", handleMouseLeave);
}, []);

  const onMouseMove = useCallback((e) => {
    if (!trackRef.current) return;
    const x = e.pageX - trackRef.current.offsetLeft;
    const diff = x - startX.current;
    if (Math.abs(diff) > 4) isDragging.current = true;
    if (isDragging.current) trackRef.current.scrollLeft = scrollStart.current - diff;
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  // scroll active thumb into view
  useEffect(() => {
    if (!trackRef.current) return;
    const el = trackRef.current.children[activeIndex];
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex]);

  // number pagination — show up to MAX_VISIBLE_NUMBERS, slide window around active
  const total = images.length;
  const windowSize = Math.min(total, MAX_VISIBLE_NUMBERS);
  let windowStart = Math.max(0, activeIndex - Math.floor(windowSize / 2));
  if (windowStart + windowSize > total) windowStart = total - windowSize;
  const visibleNumbers = Array.from({ length: windowSize }, (_, i) => windowStart + i);
  const showPrevEllipsis = windowStart > 0;
  const showNextEllipsis = windowStart + windowSize < total;

  return (
    <>
      <style>{`
        @keyframes bgIn { from { opacity: 0 } to { opacity: 1 } }
        .gl-bg-curr { animation: bgIn 0.7s ease forwards; }
        .gl-track::-webkit-scrollbar { display: none; }
        .gl-thumb { flex: 0 0 calc(50% - 5px); }
        @keyframes progressBar { from { width: 0% } to { width: 100% } }
        .progress-bar { animation: progressBar 12s linear forwards; }
        .num-btn {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          font-size: 11px;
          font-family: 'Helvetica Neue', Helvetica, sans-serif;
          font-weight: 500;
          letter-spacing: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease;
        }
        .num-btn:hover { transform: scale(1.15); }
        .num-btn.active {
          background: rgba(255,255,255,0.95);
          color: #111;
        }
        .num-btn.inactive {
          background: rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.6);
        }
        .num-btn.inactive:hover {
          background: rgba(255,255,255,0.25);
          color: #fff;
        }
        .nav-arrow {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .nav-arrow:hover {
          background: rgba(255,255,255,0.25);
          color: #fff;
          transform: scale(1.1);
        }
        .ellipsis {
          color: rgba(255,255,255,0.35);
          font-size: 11px;
          padding: 0 2px;
          line-height: 26px;
        }
      `}</style>

      <section className="relative w-full overflow-hidden bg-black" style={{ height: "100vh" }}>

        {/* BG layers */}
        {prevBg && (
          <div className="absolute inset-0 bg-cover bg-center brightness-50 z-[1]"
            style={{ backgroundImage: `url(${prevBg})` }} />
        )}
        <div key={activeBg} className="gl-bg-curr absolute inset-0 bg-cover bg-center brightness-50 z-[2]"
          style={{ backgroundImage: `url(${activeBg})` }} />

        {/* Vignette */}
        <div className="absolute inset-0 z-[3] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 30%, rgba(0,0,0,0.5) 68%, rgba(0,0,0,0.88) 100%)" }} />

        {/* Title */}
        <div className="absolute top-[7%] left-[5%] z-[4] pointer-events-none">
          <p className="uppercase tracking-widest text-white/50 mb-1"
            style={{ fontSize: "clamp(7px, 0.9vw, 11px)", fontFamily: "'Helvetica Neue', Helvetica, sans-serif", letterSpacing: "0.22em" }}>
            Project
          </p>
          <h2 className="font-light text-white leading-none"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(16px, 3.2vw, 48px)", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            {title}
          </h2>
        </div>

        {/* Bottom-right panel */}
        <div className="absolute bottom-0 right-0 z-[4] px-[4%] pb-[3%] flex flex-col gap-[10px] items-end"
          style={{ width: "clamp(300px, 32vw, 432px)" }}>

          {/* Progress bar */}
          <div className="w-full h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
            <div key={activeIndex} className="progress-bar h-full rounded-full" style={{ background: "rgba(255,255,255,0.7)" }} />
          </div>

          {/* Scrollable thumbnails — 2 visible at a time */}
          <div
            ref={trackRef}
            className="gl-track flex gap-[10px] w-full overflow-x-auto cursor-grab select-none"
            style={{ scrollbarWidth: "none" }}
            onMouseDown={onMouseDown}
          >
            {images.map((img, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div key={img.id ?? idx} className="gl-thumb flex-shrink-0 overflow-hidden rounded-sm cursor-pointer transition-all duration-300"
                  style={{
                    aspectRatio: "16/9",
                    opacity: isActive ? 1 : 0.5,
                    outline: isActive ? "1.5px solid rgba(255,255,255,0.85)" : "1.5px solid transparent",
                    outlineOffset: "2px",
                    transform: isActive ? "translateY(-2px)" : "translateY(0)",
                  }}
                  onClick={() => selectImage(idx)}
                >
                  <img src={img.src} alt={img.alt ?? ""} draggable={false} className="w-full h-full object-cover pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* Number pagination + prev/next arrows */}
          <div className="flex items-center justify-center gap-[5px] w-full">

            {/* Prev arrow */}
            <button
              className="nav-arrow"
              onClick={() => { const i = (activeIndex - 1 + total) % total; goTo(i); resetTimer(); }}
              aria-label="Previous"
            >‹</button>

            {/* Leading ellipsis */}
            {showPrevEllipsis && <span className="ellipsis">…</span>}

            {/* Number buttons */}
            {visibleNumbers.map((n) => (
              <button
                key={n}
                className={`num-btn ${activeIndex === n ? "active" : "inactive"}`}
                onClick={() => { goTo(n); resetTimer(); }}
              >
                {n + 1}
              </button>
            ))}

            {/* Trailing ellipsis */}
            {showNextEllipsis && <span className="ellipsis">…</span>}

            {/* Next arrow */}
            <button
              className="nav-arrow"
              onClick={() => { const i = (activeIndex + 1) % total; goTo(i); resetTimer(); }}
              aria-label="Next"
            >›</button>

          </div>
        </div>
      </section>
    </>
  );
}