// components/Products.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "../shared/button";
import Link from "next/link";
import { ProductType } from "../../utils/types";
import CenterPopup from "../shared/modal";
import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import QuantityButton from "../shared/quantity-button";
import { addItemToCart, createCart } from "@/actions/cart";
import { useUserState } from "@/store/userStore";
import { useToastStore } from "@/store/toastStore";
import SafeImage from "./productImage";

interface ProductsProps {
  heading: string;
  products: ProductType[] | null;
}

export const ProductsListing = ({ heading, products }: ProductsProps) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const {
    cart,
    cartId,
    isModalOpen,
    setShowModal,
    setCartCount,
    refreshCart,
    setShowCart,
  } = useCartStore((state) => state);
  const { user } = useUserState((state) => state);
  const showToast = useToastStore((state) => state.showToast);
  const [isLoading, setIsLoading] = useState(false);

  const toggleAddon = (addon_id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addon_id)
        ? prev.filter((a) => a !== addon_id)
        : [...prev, addon_id],
    );
  };

  const handleQuantity = (type: "inc" | "dec") => {
    setQuantity((prev) => {
      if (type === "dec" && prev > 1) return prev - 1;
      if (type === "inc") return prev + 1;
      return prev;
    });
  };

  const total = useMemo(() => {
    if (!selectedProduct) return 0;
    const addonsTotal =
      selectedProduct.addons
        ?.filter((addon) => selectedAddons.includes(addon.addon_id))
        .reduce((sum, addon) => sum + addon.price, 0) || 0;

    return (selectedProduct.price + addonsTotal) * quantity;
  }, [selectedProduct, selectedAddons, quantity]);

  if (!products || !products.length) return <>No Products found</>;

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setSelectedAddons([]);
    setQuantity(1);
  };

  const addtoCartPlp = (product: ProductType) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleAddToCartConfirm = async () => {
    let currentCartId = cartId;
    setIsLoading(true);

    if (!currentCartId && user?.id) {
      currentCartId = await createCart(user.id);
      setCartCount({ cartCount: 0, cartId: currentCartId });
    }

    const chosenAddons = selectedProduct?.addons?.filter((addon) =>
      selectedAddons.includes(addon.addon_id),
    );
    const item = {
      product_id: selectedProduct?.product_id,
      quantity,
      addons: chosenAddons,
    };
    await addItemToCart(item, currentCartId!, cart);
    closeModal();
    refreshCart();
    setIsLoading(false);
    showToast("Added to cart!", "success");
    setShowCart(true);
  };

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
                  <SafeImage
                    src={product.image_url}
                    alt={product.name}
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
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        addtoCartPlp(product);
                      }}
                      className="flex justify-between items-center text-[10px]"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Modal */}

      {isModalOpen && selectedProduct ? (
        <CenterPopup
          closeModal={closeModal}
          openModal={isModalOpen}
          heading={selectedProduct ? selectedProduct.name : "Select Add-Ons"}
        >
          {selectedProduct && (
            <div className="text-sm flex flex-col h-fit">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-3">
                  <QuantityButton onClick={() => handleQuantity("dec")}>
                    -
                  </QuantityButton>
                  <span>{quantity}</span>
                  <QuantityButton onClick={() => handleQuantity("inc")}>
                    +
                  </QuantityButton>
                </div>
              </div>
              {/* Addons */}
              {selectedProduct.addons?.length ? (
                <div className="mt-4">
                  <h3 className="text-base font-medium">Add-ons:</h3>
                  <div className="flex flex-col mt-2">
                    {selectedProduct.addons.map((addon) => (
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
              ) : null}

              {/* Total Price */}
              <div className="flex justify-between items-center mt-6 text-lg font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Confirm Button */}
              <div className="mt-6">
                <Button
                  loading={isLoading}
                  className="w-full"
                  onClick={handleAddToCartConfirm}
                >
                  Confirm & Add to Cart
                </Button>
              </div>
            </div>
          )}
        </CenterPopup>
      ) : (
        <></>
      )}
    </div>
  );
};
