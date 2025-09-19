"use client";

import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../shared/button";

type CartProps = {
  openCart: boolean;
  handleCart: () => void;
};

export default function Cart({ openCart, handleCart }: CartProps) {
  const items = [
    { name: "item1item1ite m1item1 item1ite m1item1", price: 12 },
    { name: "item2", price: 12 },
    { name: "item3", price: 12 },
    { name: "item4", price: 12 },
  ];

  return (
    <AnimatePresence>
      {openCart && (
        <motion.aside
          key="cart"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-white/80 bg-neutral-900 shadow-md fixed top-0 right-0 z-[999] w-[350px] h-full  md:w-[350px] sm:w-[80vw] grid grid-rows-[auto_1fr_auto]"
        >
          <div className="flex items-center justify-between border-b border-white/20 p-6 text-2xl">
            {/* Heading */}
            <h4 className="font-medium">Your Cart</h4>

            {/* Close Icon */}
            <button className="cursor-pointer p-1 hover:text-red-500" onClick={handleCart}>
              <FaTimes />
            </button>
          </div>

          {/* Items */}
          <div className="flex flex-col px-6 py-8 gap-4 overflow-y-auto">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center pb-2"
              >
                <p className="text-base text-white/80 truncate w-48">
                  {item.name}
                </p>
                <span className="text-gray-700">{item.price}</span>
              </div>
            ))}
          </div>

          {/* Buy Now Button */}
          <div className="flex justify-center mb-8">
            <Button
              className="px-12 py-3 text-lg font-medium"
              onClick={handleCart}
            >
              Buy Now
            </Button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
