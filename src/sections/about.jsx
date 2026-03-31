"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const FULL_TEXT =
  "This is Abhinav Shrestha from Kathmandu, Nepal. I am a Full-stack developer with expertise in the MERN stack (MongoDB, Express, React, Node.js). I am passionate about learning new technologies and continuously improving my skills.";

const highlights = ["Abhinav Shrestha", "Full-stack developer", "MERN stack"];

const buildSpans = () => {
  const chars = [];
  let i = 0;
  while (i < FULL_TEXT.length) {
    let matched = false;
    for (const h of highlights) {
      if (FULL_TEXT.startsWith(h, i)) {
        for (const ch of h) {
          chars.push({ ch, highlight: true });
        }
        i += h.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      chars.push({ ch: FULL_TEXT[i], highlight: false });
      i++;
    }
  }
  return chars;
};

const chars = buildSpans();

export default function About() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const letters = containerRef.current?.querySelectorAll(".gl");
    if (!letters?.length) return;

    const total = letters.length;

    const update = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;

      const progress = Math.min(
        1,
        Math.max(0, (wh - rect.top) / (rect.height + wh * 0.3)),
      );

      const lit = Math.floor(progress * total);

      letters.forEach((l, i) => {
        if (i < lit) {
          // revealed: dark on white background
          l.style.color =
            l.dataset.highlight === "true" ? "#000000" : "#111827";
        } else {
          // unrevealed: light gray
          l.style.color = "#d1d5db";
        }
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative pt-20 bg-white">
      <div className="container mx-auto max-w-5xl px-6">
        {/* Heading */}
        <div className="flex flex-col items-center gap-3 mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-black"
          >
            About <span style={{ color: "#999999" }}>Me</span>
          </motion.h1>
        </div>

        {/* Scroll-reveal text */}
        <p
          ref={containerRef}
          className="text-[22px] md:text-[36px] font-light leading-relaxed max-w-6xl text-justify"
          style={{ letterSpacing: "0.01em" }}
        >
          {chars.map(({ ch, highlight }, idx) =>
            ch === " " ? (
              <span key={idx}> </span>
            ) : (
              <span
                key={idx}
                className="gl"
                data-highlight={highlight ? "true" : "false"}
                style={{
                  display: "inline",
                  color: "#d1d5db",
                  transition: "color 0.2s ease",
                  fontWeight: highlight ? 600 : 300,
                }}
              >
                {ch}
              </span>
            ),
          )}
        </p>
      </div>
    </section>
  );
}
