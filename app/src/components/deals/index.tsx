"use client";

import React from "react";
import Image from "next/image";

interface DealRowProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  reverse?: boolean; // to alternate image position
}

function DealRow({ image, title, description, buttonText, reverse }: DealRowProps) {
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
        <button className="mt-6 px-6 py-3 text-lg font-medium bg-yellow-400 text-black rounded-lg shadow-md transition duration-200 hover:bg-red-600 hover:text-white">
          {buttonText}
        </button>
      </div>
    </div>
  );
}


interface DealsProps {
  items: DealRowProps[];
}

export default function Deals({ items }: DealsProps) {
  return (
   <section className="px-5 lg:px-10 grid grid-cols-1 gap-6 md:grid-cols-2 bg-black">
      {items.map((deal, index) => (
        <DealRow key={index} {...deal} reverse={index % 2 !== 0} />
      ))}
    </section>
  );
}