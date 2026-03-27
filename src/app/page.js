"use client";

import Navbar from "@/components/navbar";
import About from "@/sections/about";
import Hero from "@/sections/hero";
import Gallery from "@/sections/gallery/page";
import Projects from "@/sections/projects";
import Hello from "@/sections/hello";
import Skills from "@/sections/skills";
import Try from "@/sections/try";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Gallery />
      <Hello/>
      {/* <Projects/> */}
      <Try />
    </>
  );
}