"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const experiences = [
  {
    title: "Full Stack Developer",
    stack: "Next.js / Laravel",
    company: "Locus Enterprises",
    period: "Mar 2026 – Present",
    type: "Full-time",
    index: "01",
    description:
      "Building scalable web applications using Next.js and Laravel. Focused on performance optimization, RESTful API design, and responsive UI development across complex product surfaces.",
    tags: ["Next.js", "Laravel", "REST APIs", "MySQL", "Microservices"],
  },
  {
    title: "Frontend Developer",
    stack: "Next.js",
    company: "Locus Enterprises",
    period: "Sep 2025 – Mar 2026",
    type: "Internship",
    index: "02",
    description:
      "Built responsive UI components from Figma designs, integrated third-party APIs, and improved core web vitals. Collaborated closely with designers and backend engineers in an agile team.",
    tags: ["Next.js", "React", "Figma", "API Integration", "Tailwind"],
  },
];

function SpotlightCard({ exp, i }) {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight((s) => ({ ...s, opacity: 0 }));
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: i * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl overflow-hidden cursor-default"
        style={{
          background: "linear-gradient(135deg, #141414 0%, #0e0e0e 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Mouse spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(400px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.055) 0%, transparent 70%)`,
          }}
        />

        {/* Border glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
            maskImage: "linear-gradient(black, black)",
            WebkitMaskImage:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
            borderRadius: "1rem",
          }}
        />

        {/* Card content */}
        <div className="relative z-10 p-8 sm:p-10">
          {/* Top row */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              {/* Badge */}
              <span
                className="text-[10px] tracking-[0.15em] uppercase font-mono px-3 py-1 rounded-full"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                {exp.type}
              </span>
            </div>

            {/* Period */}
            <span className="text-[11px] font-mono text-white/25 shrink-0">
              {exp.period}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90 mb-1 leading-snug">
            {exp.title}
            <span className="font-normal text-white/25 ml-2 text-xl">
              {exp.stack}
            </span>
          </h3>

          {/* Company */}
          <p className="text-sm font-mono text-white/40 mb-6">{exp.company}</p>

          {/* Divider */}
          <div
            className="w-full mb-6"
            style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
          />

          {/* Description */}
          <p className="text-[14px] leading-[1.8] text-white/40 mb-7 max-w-2xl">
            {exp.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-3 py-1 rounded-md"
                style={{
                  color: "rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 my-20 w-full flex justify-center">
      <div className="w-full max-w-5xl px-6 mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-3xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] leading-[0.95] text-gray-900"
          >
            Experi<span className="text-[#999999]">ence</span>
          </motion.h1>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {experiences.map((exp, i) => (
            <SpotlightCard key={exp.index} exp={exp} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
