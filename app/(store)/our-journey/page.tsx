"use client";

import Image from "next/image";
import HeadingBanner from "../../components/heading-banner";

export default function Journey() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <HeadingBanner heading='Our Journey' imgUrl='https://ik.imagekit.io/aswathy/images/featured_Q2wsv02eL.jpg?updatedAt=1651588578882' />

      {/* Journey Story */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">How It All Began</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Pizzateria’s journey began with a spark of passion—a love for
            authentic pizzas made the traditional way. What started as a small
            kitchen experiment turned into a dream to share freshly baked,
            hand-crafted pizzas with our community.
          </p>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Over the years, we’ve grown from a cozy corner eatery into a place
            where families, friends, and food lovers gather. Our secret? Staying
            true to the heart of pizza-making: fresh ingredients, honest
            flavors, and a lot of love.
          </p>
        </div>
        <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://ik.imagekit.io/aswathy/images/featured_Q2wsv02eL.jpg?updatedAt=1651588578882"
            alt="Making Pizza"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Growth & Values */}
      <section className="bg-yellow-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Growth</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              From humble beginnings, Pizzateria has become a place people know
              and love. Each step forward has been guided by our dedication to
              quality, consistency, and building lasting connections with the
              community we serve.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe pizza is more than food—it’s an experience. Our values
              are simple: keep it fresh, keep it honest, and always put people
              at the heart of what we do. That’s what keeps our journey moving
              forward.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 bg-black text-white">
        <h2 className="text-4xl font-bold mb-4">Be Part of Our Journey</h2>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
          From the very first slice to the next big milestone, our story
          continues—and we’d love for you to be part of it.
        </p>
        <button className="px-8 py-3 text-lg font-medium bg-yellow-400 text-black rounded-lg shadow-md transition duration-200 hover:bg-red-600 hover:text-white">
          Order Now
        </button>
      </section>
    </main>
  );
}
