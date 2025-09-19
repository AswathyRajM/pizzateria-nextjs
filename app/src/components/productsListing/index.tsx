// components/Products.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "../shared/button";
import { IoCart } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";

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
      <div className="relative max-w-6xl w-full text-white/90">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl text-center text-yellow-400 mb-10 lg:mb-12 uppercase font-medium">
          {heading}
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {data.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex bg-neutral-900 shadow-md relative w-full h-48"
            >
              <div className="absolute z-10 bg-red-500 text-xs p-1">
                BUY 1 GET 1 FREE
              </div>
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
              <div className="flex flex-col justify-start items-start p-4 pb-0 w-1/2 relative">
                <h2 className="font-medium text-lg mb-1 cursor-pointer">
                  {product.name}
                </h2>
                <p className="text-sm mb-3 line-clamp-4">{product.desc}</p>

                {/* Footer */}
                <p className="text-md">{product.price}</p>
                <Button inverted className="w-full mt-auto">
                  View More
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
