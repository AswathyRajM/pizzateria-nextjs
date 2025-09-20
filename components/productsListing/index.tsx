// components/Products.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "../shared/button";
import Link from "next/link";
import { Product } from "../../store/types";

interface ProductsProps {
  heading: string;
  products: Product[] | null;
}

export const ProductsListing = ({ heading, products }: ProductsProps) => {
  if (!products || !products.length) return <>No Products found</>;
  return (
    <div className="w-full flex items-center justify-center px-4 lg:px-10">
      <div className="relative max-w-6xl w-full">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl text-center text-white mb-10 lg:mb-12 uppercase font-medium">
          {heading}
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.product_id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <Link
                className="flex flex-col bg-neutral-900 shadow-md relative w-full h-[380px]"
                href={`/product/${product.product_id}`}
              >
                <div className="absolute z-10 bg-red-500 text-xs p-1 capitalize">
                  {product.offer}
                </div>
                {/* Product Image */}
                <div className="relative h-[240px] flex-shrink-0">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-contain object-center"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-start items-start p-4 h-full gap-1 relative">
                  <h2 className="font-bold text-lg cursor-pointer line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="text-sm line-clamp-2">{product.description}</p>
                  <div></div>
                  <div className="flex items-start gap-x-2 mt-auto justify-between w-full">
                    <p className="flex gap-2 items-center">
                      <span className="text-md text-red-500 font-bold">
                        ${product.price}
                      </span>
                      <span className="text-xs line-through text-gray-400">
                        ${product.original_price}
                      </span>
                    </p>
                    <Button className="flex justify-between items-center text-[10px]">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
