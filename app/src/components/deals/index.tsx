"use client";

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../shared/button";

interface DealRowProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  reverse?: boolean; // to alternate image position
}

function DealRow({
  image,
  title,
  description,
  buttonText,
  reverse,
}: DealRowProps) {
  return (
    <div
      className={`flex flex-col md:flex-row items-center bg-neutral-900 shadow-md ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image Section */}
      <div className="relative w-full md:w-1/2 h-64 md:h-96">
        <Image src={image} alt={title} fill className="object-cover " />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left p-4">
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        <p className="mt-4 text-lg text-white/80">{description}</p>
        <Button inverted className="mt-6 px-6 py-3 text-lg font-medium">
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

interface DealsProps {
  items: DealRowProps[];
}

export default function Deals({ items }: DealsProps) {
  return (
    <section className="px-5 lg:px-10 bg-black">
      <AnimatePresence>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-6xl mx-auto md:gap-10">
          {items.map((deal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <DealRow {...deal} reverse={index % 2 !== 0} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </section>
  );
}