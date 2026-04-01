"use client";
import { motion } from "framer-motion";
import React, { useMemo, useState, forwardRef } from "react";

export default forwardRef(function Hero(props, ref) {
  const roles = useMemo(() => ["Hello From", "हेलो फ्रम"], []);

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  React.useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
        else if (!deleting && subIndex === current.length)
          setTimeout(() => setDeleting(true), 1200);
        else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
        else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((p) => (p + 1) % roles.length);
        }
      },
      deleting ? 40 : 60,
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  return (
    <div ref={ref} id="hero">
      <div
        className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/image/mardi.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="p-10 sm:p-16 flex flex-col items-center text-center w-full max-w-2xl">

            {/* Typewriter */}
            <span className="mt-0 md:mt-40 text-gray-300 text-lg mb-2">
              {roles[index].substring(0, subIndex)}
              <span className="ml-0.5 inline-block w-px h-4 bg-gray-300 align-middle animate-pulse" />
            </span>

            {/* Name */}
            <div className="leading-none">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 leading-tight text-white drop-shadow-lg lg:whitespace-nowrap"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Abhinav Shrestha
              </motion.h1>
            </div>

            {/* Tagline */}
            <p className="text-gray-400 mb-8 tracking-wide">
              I am a software developer building modern applications
            </p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row flex-wrap items-center justify-center md:justify-start gap-6 md:mr-16">
              <a
                href="/cv/abhinav_shresthaCV.pdf"
                download
                className="border border-white/80 text-gray-200 px-8 py-3 text-xs tracking-widest uppercase relative overflow-hidden group"
              >
                <span className="relative z-10 group-hover:text-black transition">
                  Download CV
                </span>
                <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </a>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("about");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="relative text-gray-300 hover:text-white text-xs tracking-widest uppercase transition group bg-transparent border-none cursor-pointer"
              >
                Explore More
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 hidden md:flex items-center justify-center text-white/30" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3 opacity-60">
        <div className="w-6 h-10 rounded-full border border-white/70 flex items-start justify-center p-1">
          <div
            className="w-[5px] h-[10px] rounded-full bg-white"
            style={{ animation: "scrollDot 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%, 100% { transform: translateY(2px); opacity: 0.7; }
          50% { transform: translateY(6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
});