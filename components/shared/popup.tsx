"use client";

import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { memo } from "react";

type PopupProps = {
  openPopup: boolean;
  children: React.ReactNode;
  heading: string;
  isCart?: boolean;
  closePopup: () => void;
};

function Popup({
  openPopup,
  children,
  heading,
  isCart = false,
  closePopup,
}: PopupProps) {
  const cart = isCart ? useCartStore((state) => state.cart) : [];

  if (!openPopup) return null;
  return (
    <AnimatePresence>
      <motion.div
        key="Modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[998] flex items-center justify-center bg-black/50"
        onClick={closePopup}
      >
        <motion.aside
          key="cart"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          onClick={(e) => e.stopPropagation()}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`bg-neutral-900 shadow-md fixed top-0 right-0 z-[999] w-screen h-full  md:w-[350px] ${
            isCart && cart?.length >= 4 ? "grid grid-rows-[auto_1fr_auto]" : ""
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-800 py-6 px-4 text-xl">
            {/* Heading */}
            <h4 className="font-medium">{heading}</h4>

            {/* Close Icon */}
            <button
              className="cursor-pointer p-1 hover:text-red-500"
              onClick={closePopup}
            >
              <FaTimes />
            </button>
          </div>
          {children}
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}

export default memo(Popup);