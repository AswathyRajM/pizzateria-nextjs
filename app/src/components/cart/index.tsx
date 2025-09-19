"use client";

import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../shared/button";
import { useCartStore } from "../../store/cart";
import { ProductsData } from "../productsListing/data";
import Image from "next/image";
import { VscClose } from "react-icons/vsc";
import { useToastStore } from "../../store/toast";

type CartProps = {
  openCart: boolean;
  handleCart: () => void;
};

export default function Cart({ openCart, handleCart }: CartProps) {
  const { cart, shouldShowCart, removeFromCart } = useCartStore(
    (state) => state
  );
  const showToast = useToastStore((state) => state.showToast);

  const getProductDetails = (id: string) =>
    ProductsData.find((product) => product.id === id);

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);

    showToast("Removed from cart!", "success");
  };

  return (
    <AnimatePresence>
      {openCart ||
        (shouldShowCart && (
          <motion.aside
            key="cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`bg-neutral-900 shadow-md fixed top-0 right-0 z-[999] w-[350px] h-full  md:w-[350px] sm:w-[80vw] ${
              cart.length >= 4 ? "grid grid-rows-[auto_1fr_auto]" : ""
            }`}
          >
            <div className="flex items-center justify-between border-b border-gray-800 py-6 px-4 text-2xl">
              {/* Heading */}
              <h4 className="font-medium">Your Cart</h4>

              {/* Close Icon */}
              <button
                className="cursor-pointer p-1 hover:text-red-500"
                onClick={handleCart}
              >
                <FaTimes />
              </button>
            </div>

            {/* Items */}
            <div className="flex flex-col px-4 py-8 gap-4 overflow-y-auto custom-scrollbar">
              {cart.length === 0 ? (
                <p className="text-center text-gray-400">Your cart is empty.</p>
              ) : (
                cart.map((item) => {
                  const product = getProductDetails(item.id);
                  if (!product) return null;

                  const basePrice = parseFloat(product.price.replace("$", ""));
                  const selectedAddons = product.addons.filter((addon) =>
                    item.addons?.includes(addon.id)
                  );

                  const addonsTotal = selectedAddons.reduce(
                    (sum, addon) => sum + addon.price,
                    0
                  );

                  const totalPrice = (basePrice + addonsTotal) * item.quantity;

                  return (
                    <Link
                      href={`/product/${item.id}`}
                      key={item.id}
                      className="flex gap-2 border-b border-gray-800 pb-4"
                    >
                      {/* Product Image */}
                      <div className="relative w-24 h-24 overflow-hidden flex-shrink-0">
                        <Image
                          src={product.img}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between gap-1">
                            <h5 className="line-clamp-1 font-semibold text-white truncate">
                              {product.name}
                            </h5>
                            <VscClose
                              className="cursor-pointer"
                              onClick={() => handleRemoveFromCart(item.id)}
                            />
                          </div>
                          <div className="w-full">
                            <p className="mb-1 flex gap-1 justify-between items-center">
                              <span className="text-md text-red-500 font-bold">
                                {product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs line-through text-gray-400">
                                  {product.originalPrice}
                                </span>
                              )}
                              {product.offer && (
                                <span className="border border-yellow-400 text-yellow-400 px-1 py-0.5 rounded text-xs">
                                  {product.offer}
                                </span>
                              )}
                            </p>
                          </div>
                          {/* Add-ons */}
                          {selectedAddons.length > 0 && (
                            <div className="mt-2 text-xs text-gray-300">
                              {selectedAddons
                                .map((addon) => addon.name)
                                .join(", ")}
                            </div>
                          )}
                        </div>

                        {/* Quantity & Total */}
                        <div className="flex justify-between mt-2 text-sm">
                          <span>Qty: {item.quantity}</span>
                          <span className="font-semibold text-white">
                            ${totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>

            {/* Buy Now Button */}
            {cart.length > 0 && (
              <div className="flex justify-center mb-8 items-center gap-6 px-4">
                <Button
                  inverted
                  className="w-full py-3 text-lg font-medium"
                  onClick={handleCart}
                >
                  Buy Now
                </Button>
              </div>
            )}
          </motion.aside>
        ))}
    </AnimatePresence>
  );
}
