"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ProductsData } from "@/app/src/components/productsListing/data";
import Button from "../shared/button";
import QuantityButton from "../shared/quantity-button";
import { useCartStore } from "../../store/cart";
import { useToastStore } from "../../store/toast";
import { motion, AnimatePresence } from "framer-motion";

export default function PDP() {
  const { id } = useParams(); // fetch product ID from URL
  const product = ProductsData.find((p) => p.id.toString() === id);
  const { addToCart, setShowCart } = useCartStore((state) => state);
  const showToast = useToastStore((state) => state.showToast);

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((a) => a !== addonId)
        : [...prev, addonId]
    );
  };

  const basePrice = parseFloat(product.price.replace("$", ""));

  // Calculate total
  const total = useMemo(() => {
    const addonsTotal = product.addons
      .filter((addon) => selectedAddons.includes(addon.id))
      .reduce((sum, addon) => sum + addon.price, 0);
    return (basePrice + addonsTotal) * quantity;
  }, [basePrice, selectedAddons, quantity, product.addons]);

  const handleAddToCart = () => {
    const chosenAddons = product.addons
      .filter((a) => selectedAddons.includes(a.id))
      .map((a) => a.id);

    addToCart({
      id: product.id,
      quantity,
      addons: chosenAddons,
    });
    setShowCart(true);
    showToast("Added to cart!", "success");
  };

  return (
    <AnimatePresence>
      <main className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
        {/* Left: Image */}
        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src={product.img}
            alt={product.name}
            fill
            className="object-cover"
          />
        </motion.aside>

        {/* Right: Details */}

        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white/90 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-red-600 text-2xl font-bold">
                  {product.price}
                </span>
                <span className="line-through text-gray-400">
                  {product.originalPrice}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 text-xs">
                  {product.offer}
                </span>
              </div>

              <p className="mt-4">{product.desc}</p>

              {/* Quantity Selector */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-base font-medium">Quantity:</span>
                <div className="flex items-center">
                  <QuantityButton
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </QuantityButton>
                  <span className="px-4">{quantity}</span>
                  <QuantityButton onClick={() => setQuantity((q) => q + 1)}>
                    +
                  </QuantityButton>
                </div>
              </div>

              {/* Add-ons */}
              <div className="mt-6 text-sm">
                <h3 className="text-base">Add-ons:</h3>
                <div className="flex flex-col mt-2">
                  {product.addons.map((addon) => (
                    <label
                      key={addon.id}
                      className="flex items-center justify-between border-b px-1 py-2 border-b-gray-800 cursor-pointer hover:bg-gray-900"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedAddons.includes(addon.id)}
                          onChange={() => toggleAddon(addon.id)}
                          className="h-4 w-4"
                        />
                        <span>{addon.name}</span>
                      </div>
                      <span>+${addon.price.toFixed(2)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="mt-6 text-xl font-semibold">
                Total: ${total.toFixed(2)}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <Button
                className="flex-1 px-6 py-3 font-bold"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button inverted className="flex-1 px-6 py-3 font-bold">
                Buy Now
              </Button>
            </div>
          </div>
        </motion.aside>
      </main>
    </AnimatePresence>
  );
}
