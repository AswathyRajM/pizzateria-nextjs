"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Button from "../shared/button";
import QuantityButton from "../shared/quantity-button";
import { useToastStore } from "../../store/toastStore";
import { motion, AnimatePresence } from "framer-motion";
import { AddonType, ProductType } from "@/utils/types";
import { useCartStore } from "@/store/cartStore";
import { addItemToCart, createCart } from "@/actions/cart";
import { useUserState } from "@/store/userStore";

export default function PDP({
  product,
  addonIds,
}: {
  product: ProductType;
  addonIds: string[];
}) {
  const { cartId, cart, increaseCartCount, setShowCart, setCartCount } =
    useCartStore((state) => state);
  const { user } = useUserState((state) => state);
  const showToast = useToastStore((state) => state.showToast);

  if (!product) {
    return <div className="text-center py-20">ProductType not found.</div>;
  }

  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(addonIds);

  const toggleAddon = (addon_id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addon_id)
        ? prev.filter((a) => a !== addon_id)
        : [...prev, addon_id]
    );
  };

  useEffect(() => {
    return () => {
      setSelectedAddons([]);
    };
  }, []);

  const total = useMemo(() => {
    const addonsTotal =
      product.addons
        ?.filter((addon: AddonType) => selectedAddons.includes(addon.addon_id))
        .reduce((sum: number, addon: AddonType) => sum + addon.price, 0) || 0; // default to 0

    return (product.price + addonsTotal) * quantity;
  }, [product.price, product.addons, selectedAddons, quantity]);

  const handleAddToCart = async () => {
    let currentCartId = cartId;

    if (!currentCartId && user?.id) {
      currentCartId = await createCart(user.id);
      setCartCount({ cartCount: 0, cartId: currentCartId });
    }

    const chosenAddons = product.addons?.filter((addon) =>
      selectedAddons.includes(addon.addon_id)
    );
    const item = {
      product_id: product.product_id,
      quantity,
      addons: chosenAddons,
    };
    await addItemToCart(item, currentCartId!, cart);
    increaseCartCount();
    setShowCart(true);
    showToast("Added to cart!", "success");
  };
  return (
    <AnimatePresence>
      <main className="max-w-6xl px-6 py-12 mx-auto grid md:grid-cols-2 gap-12">
        {/* Left: Image */}
        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative  size-96 md:size-[500px]  rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src={product.image_url}
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
                  {product.original_price}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 text-xs">
                  {product.offer}
                </span>
              </div>

              <p className="mt-4">{product.description}</p>

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
              {product.addons?.length ? (
                <div className="mt-6 text-sm">
                  <h3 className="text-base">Add-ons:</h3>
                  <div className="flex flex-col mt-2">
                    {product.addons?.map((addon) => (
                      <label
                        key={addon.addon_id}
                        className="flex items-center justify-between border-b px-1 py-2 border-b-gray-800 cursor-pointer hover:bg-gray-900"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedAddons.includes(addon.addon_id)}
                            onChange={() => toggleAddon(addon.addon_id)}
                            className="h-4 w-4"
                          />
                          <span>{addon.name}</span>
                        </div>
                        <span>+${addon.price.toFixed(2)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}

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
