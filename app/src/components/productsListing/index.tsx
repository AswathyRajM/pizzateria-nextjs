// components/Products.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "../shared/button";

interface Product {
  name: string;
  desc: string;
  price: string;
  img: string;
}

interface ProductsProps {
  heading: string;
  data: Product[];
}

export const ProductsListing = ({ heading, data }: ProductsProps) => {
  return (
    <div className="bg-black w-full flex items-center justify-center px-4 lg:px-10">
      <div className="relative max-w-[1300px] w-full text-white/90">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl text-center text-yellow-400 mb-10 lg:mb-12 uppercase font-medium">
          {heading}
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex bg-neutral-900 shadow-md relative w-full h-48"
            >
              {/* Product Image */}
              <div className="relative w-1/2 h-full flex-shrink-0">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-start items-start p-4 w-1/2 relative">
                <h2 className="font-medium text-lg mb-1 cursor-pointer">
                  {product.name}
                </h2>
                <p className="text-sm mb-3 line-clamp-4">{product.desc}</p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between gap-2 w-full">
                  <p className="text-md">{product.price}</p>
                  <Button >
                    Add 
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
