"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "shresthaabhinav5@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // ✅ scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        
        {/* MAIN WRAPPER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          
          {/* LEFT */}
          <div className="text-center lg:text-left">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight">
              Abhinav Shrestha
            </h2>
            <p className="text-gray-500 mt-1 text-xs sm:text-sm">
              Full Stack Developer
            </p>
          </div>

          {/* CENTER — EMAIL */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center"
          >
            <HiOutlineMail className="text-white/30 text-lg shrink-0" />

            <span className="font-mono text-xs sm:text-sm text-white/40 tracking-wide break-all sm:break-normal text-center">
              {email}
            </span>

            <button
              onClick={handleCopy}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/10 text-[11px] font-mono tracking-[0.1em] uppercase text-white/60 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all"
            >
              {copied ? "✓ Copied" : "Copy email"}
            </button>
          </motion.div>

          {/* RIGHT — SOCIALS */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3">
            
            <a
              href="https://github.com/shresthaabhinav"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/[0.07] text-gray-400 hover:text-white hover:bg-white/10 transition text-sm"
            >
              <FaGithub className="text-base" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/abhinav-shrestha-604074263/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/[0.07] text-gray-400 hover:text-white hover:bg-white/10 transition text-sm"
            >
              <FaLinkedinIn className="text-base" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* DIVIDER + BACK TO TOP */}
        <div className="border-t border-white/[0.06] mt-8 pt-5 flex flex-row justify-center items-center gap-4">
          
          <p className="text-gray-600 text-[11px] sm:text-xs tracking-wide">
            © {new Date().getFullYear()} Abhinav Shrestha
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full 
                       border border-white/10 text-xs font-mono uppercase tracking-wider 
                       text-white/60 hover:text-white hover:border-white/30 
                       hover:bg-white/5 transition-all"
          >
            Dont Press
          </button>

          
        </div>
      </div>
    </footer>
  );
}