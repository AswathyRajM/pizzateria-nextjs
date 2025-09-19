"use client";

import React from "react";
import Image from "next/image";
import Button from "../shared/button";

export default function Featured() {
  return (
    <section className="relative h-screen max-h-[200px] md:max-h-[250px] lg:max-h-[300px] flex flex-col items-center justify-center text-center text-white overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://ik.imagekit.io/aswathy/images/featured_Q2wsv02eL.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1651588578882"
          alt="Featured"
          fill
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10"></div>
      </div>

      {/* Content */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold z-10">
        Pizza of the Day
      </h1>
      <p className="mt-4 text-lg md:text-xl lg:text-2xl max-w-3xl z-10">
        Double-crusted, with pastry both above and below the filling
      </p>
      <Button className="mt-6 px-8 py-3 text-lg font-medium bg-yellow-400 !text-black transition duration-200 hover:!bg-red-600 hover:!text-white rounded-md z-10">
        Order Now
      </Button>
    </section>
  );
}
