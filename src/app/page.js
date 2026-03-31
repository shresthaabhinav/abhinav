"use client";

import Navbar from "@/components/navbar";
import About from "@/sections/about";
import Hero from "@/sections/hero";
import Gallery from "@/sections/gallery/page";
import Projects from "@/sections/projects";
import Skills from "@/sections/skills";
import Contact from "@/sections/contact";
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";
import Experience from "@/sections/experience";

export default function Home() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const galleryRef = useRef(null);
  const contactRef = useRef(null);

  const sectionRefs = {
    hero: heroRef,
    about: aboutRef,
    skills: skillsRef,
    projects: projectsRef,
    experience: experienceRef,
    gallery: galleryRef,
    contact: contactRef,
  };

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
      <Navbar sectionRefs={sectionRefs} />
      <Hero ref={heroRef} />
      <About ref={aboutRef} />
      <Skills ref={skillsRef} />
      <Projects ref={projectsRef} />
      <Experience ref={experienceRef} />
      <Gallery ref={galleryRef} />
      <Contact ref={contactRef} />
    </>
  );
}
