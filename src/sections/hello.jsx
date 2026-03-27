"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "/images/bg1.jpg",
  "/images/bg2.jpg",
  "/images/bg3.jpg",
  "/images/bg4.jpg",
  "/images/bg5.jpg",
];

export default function BackgroundCarouselSection() {
  const [activeBg, setActiveBg] = useState(images[0]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
     
      <Image
        src={activeBg}
        alt="Background"
        fill
        priority
        className="object-cover transition-all duration-500"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Center Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-white text-4xl font-bold">
        Dynamic Background
      </div>

      <div className="absolute bottom-5 right-5 z-20 w-[260px] sm:w-[320px]">
        <Carousel
          opts={{ align: "start" }}
          className="w-full"
        >
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem
                key={index}
                className="basis-1/3"
              >
                <div className="p-1">
                  <Card
                    onClick={() => setActiveBg(img)}
                    className={`cursor-pointer overflow-hidden border-2 ${
                      activeBg === img
                        ? "border-white"
                        : "border-transparent"
                    }`}
                  >
                    <CardContent className="p-0">
                      <Image
                        src={img}
                        alt={`thumb-${index}`}
                        width={100}
                        height={80}
                        className="object-cover w-full h-[70px] hover:scale-110 transition-transform duration-300"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation */}
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}