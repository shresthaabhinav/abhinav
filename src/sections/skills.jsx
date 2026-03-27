"use client";

import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

export const skills = [
  {
    title: "Hello world with C",
    image: "/language/c.png",
    bg: "#ffffff",
    hoverBg: "#4294ff",
    description:
      "This is the first programming language I learned, where I built a strong foundation in programming logic. I gained a solid understanding of arrays, loops, functions, along with low-level concepts such as memory management and pointers.",
  },
  {
    title: "Learning basic fundamentals of OOP with C++",
    image: "/language/c++.png",
    bg: "#ffffff",
    hoverBg: "#1a77d4",
    description:
      "Just after C programming, I learned Object-Oriented Programming concepts like classes, inheritance, polymorphism, encapsulation, and abstraction, and applied them in building structured and reusable code.",
  },
  {
    title: "Creating my first Project with Java",
    image: "/language/java.png",
    bg: "#ffffff",
    hoverBg: "#e98b54",
    description:
      "Built an Order Management System project, which handled basic ordering functionality. It allowed users to select food items from a predefined menu and automatically calculated the total bill defined within the program.",
  },
  {
    title: "A Fullstack Project with JavaScript",
    image: "/language/js.png",
    bg: "#ffffff",
    hoverBg: "#bfa520",
    description:
      "Developed full-stack websites using modern JavaScript along with React and Next.js, and backend technologies like Node.js and Express.js. Built CMS features, implemented CRUD operations, and created fully responsive interfaces.",
  },
  {
    title: "Creating strong concept of backend with PHP",
    image: "/language/phpLogo.png",
    bg: "#ffffff",
    hoverBg: "#945cec",
    description:
      "Built strong backend applications using Laravel with a focus on MVC architecture and RESTful API development. I worked on structuring, handling routing, controllers, and database operations efficiently while building APIs for frontend integration.",
  },
  {
    title: "AI/ML with Python",
    image: "/language/python.png",
    bg: "#ffffff",
    hoverBg: "#42a948",
    description:
      "Worked on AI/ML projects involving model training to build a strong understanding of machine learning workflows. I also developed a recommendation system for an e-commerce project that analyzed user behavior to suggest relevant products.",
  },
];

function SkillCard({ index, title, image, bg, hoverBg, description }) {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      scale={1.025}
      transitionSpeed={500}
      className="h-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
        className="h-full"
      >
        <div
          className="skill-card h-full rounded-2xl p-6 flex flex-col gap-4 cursor-default group"
          style={{
            background: bg,
            boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
            "--hover-bg": hoverBg,
          }}
        >
          {/* Top row: icon + title */}
          <div className="flex items-center gap-4">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ background: "#ffffff", boxShadow: "0 1px 6px rgba(0,0,0,0.10)" }}
            >
              <Image src={image} alt={title} width={28} height={28} className="object-contain" />
            </div>
            <h3
              className="skill-title font-semibold leading-snug text-gray-800"
              style={{ fontSize: "clamp(14px, 1.4vw, 17px)" }}
            >
              {title}
            </h3>
          </div>

          {/* Divider */}
          <div className="skill-divider w-full h-px" style={{ background: "rgba(0,0,0,0.07)" }} />

          {/* Description */}
          <p
            className="skill-desc text-gray-600 leading-relaxed text-justify flex-1"
            style={{ fontSize: "clamp(12px, 1.1vw, 13.5px)" }}
          >
            {description}
          </p>
        </div>
      </motion.div>
    </Tilt>
  );
}

export default function Skills() {
  return (
    <>
      <style>{`
        .skill-card {
          transition: background 0.35s ease, box-shadow 0.35s ease;
        }
        .skill-card:hover {
          background: var(--hover-bg) !important;
          box-shadow: 0 8px 40px rgba(0,0,0,0.3) !important;
        }
        .skill-title {
          transition: color 0.35s ease;
        }
        .skill-card:hover .skill-title {
          color: #ffffff;
        }
        .skill-divider {
          transition: background 0.35s ease;
        }
        .skill-card:hover .skill-divider {
          background: rgba(255,255,255,0.25) !important;
        }
        .skill-desc {
          transition: color 0.35s ease;
        }
        .skill-card:hover .skill-desc {
          color: rgba(255,255,255,0.88);
        }
      `}</style>

      <section id="skills" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Heading */}
          <div className="flex flex-col items-center gap-3 mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-black"
            >
              How I built my skills
            </motion.h1>
          </div>

          {/* Row 1 — small | big */}
          <div className="flex flex-col sm:flex-row gap-5 mb-5">
            <div className="w-full sm:w-[42%]"><SkillCard index={0} {...skills[0]} /></div>
            <div className="w-full sm:w-[58%]"><SkillCard index={1} {...skills[1]} /></div>
          </div>

          {/* Row 2 — equal */}
          <div className="flex flex-col sm:flex-row gap-5 mb-5">
            <div className="w-full sm:w-1/2"><SkillCard index={2} {...skills[2]} /></div>
            <div className="w-full sm:w-1/2"><SkillCard index={3} {...skills[3]} /></div>
          </div>

          {/* Row 3 — big | small */}
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full sm:w-[58%]"><SkillCard index={4} {...skills[4]} /></div>
            <div className="w-full sm:w-[42%]"><SkillCard index={5} {...skills[5]} /></div>
          </div>

        </div>
      </section>
    </>
  );
}