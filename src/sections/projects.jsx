"use client";
import { motion } from "framer-motion";

import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const items = [
  { id: 1, src: "/project/abhinav.png", link: "https://abhinav-shrestha.com.np" },
  { id: 2, src: "/project/cfs.png", link: "https://conceptualframe.com" },
  { id: 3, src: "/project/locus.png", link: "https://locusenterprises.com.np", },
];

export default function CustomCarousel() {
  return (
    <div id="projects" className="w-full scroll-mt-20">

      <div className="flex flex-col items-center gap-3 mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold text-black"
        >
          Proj<span style={{ color: "#999999" }}>ects</span>
        </motion.h1>
      </div>

      {/* Left padding only — carousel bleeds to the right edge */}
      <div className="max-w-[2000px] mx-auto pl-6 md:pl-16 lg:pl-24 overflow-hidden">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {items.map((item) => (
  <CarouselItem
    key={item.id}
    className="pl-4 basis-[85%] md:basis-[48%] lg:basis-[42%]"
  >
    <div
      onClick={() => window.open(item.link, "_blank")}
      className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer group"
    >
      <Image
        src={item.src}
        alt=""
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  </CarouselItem>
))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}