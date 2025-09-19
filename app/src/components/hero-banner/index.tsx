"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Button from "../shared/button";

const banners = [
  {
    src: "https://ik.imagekit.io/aswathy/images/pizza1_DKJ0ln2eg_xWA1hqLou.jpg?updatedAt=1680606495505",
    title: "Yummy Pizza",
    subtitle: "All You Need is Love & Pizza",
  },
  {
    src: "https://ik.imagekit.io/aswathy/images/pizza1_DKJ0ln2eg_xWA1hqLou.jpg?updatedAt=1680606495505",
    title: "Hot & Fresh",
    subtitle: "Delivered to Your Doorstep",
  },
  {
    src: "https://ik.imagekit.io/aswathy/images/pizza1_DKJ0ln2eg_xWA1hqLou.jpg?updatedAt=1680606495505",
    title: "Cheesy Delight",
    subtitle: "Every Bite is Happiness",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(1); // Start from the first real slide
  const [transitioning, setTransitioning] = useState(true);
  const infiniteFrames = [banners[banners.length - 1], ...banners, banners[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
      setTransitioning(true);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle seamless looping
  useEffect(() => {
    if (current === 0 || current === infiniteFrames.length - 1) {
      // Disable animation for instant jump
      const timer = setTimeout(() => {
        setTransitioning(false); // Disable transition
        setCurrent(current === 0 ? banners.length : 1); // Jump to real slide
      }, 300); // match the CSS transition duration
      return () => clearTimeout(timer);
    } else {
      setTransitioning(true); // Re-enable animation for normal slides
    }
  }, [current, infiniteFrames.length]);

  return (
    <section
      className="relative h-[40vh] lg:h-[50vh] overflow-hidden"
      aria-label="Promotional carousel"
    >
      <div
        className={`flex h-full ${transitioning ? "transition-transform duration-300 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {infiniteFrames.map((banner, index) => (
          <div
            key={index}
            className="relative w-full flex-shrink-0"
            aria-hidden={index !== current}
            style={{ height: "100%" }}
          >
            <Image
              src={banner.src}
              alt={banner.title}
              fill
              className="object-cover"
              priority={index === 1} // first real slide
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10" />
            <div className="relative flex h-full max-w-[1200px] mx-auto items-center w-full px-4 mt-5">
              <div className="flex flex-col items-start text-white uppercase font-bold max-w-fit">
                <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-wider shadow-[3px_5px_0_#e9ba23]">
                  {banner.title}
                </h1>
                <p className="mt-4 mb-6 text-xl md:text-[22px] lg:text-2xl">
                  {banner.subtitle}
                </p>
                <Button className="px-8 py-3 text-lg">Place Order</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              idx + 1 === current ? "bg-yellow-400" : "bg-white/50"
            }`}
            onClick={() => setCurrent(idx + 1)}
          />
        ))}
      </div>
    </section>
  );
}
