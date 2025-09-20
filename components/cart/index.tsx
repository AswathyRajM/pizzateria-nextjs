"use client";

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import Button from "../shared/button";
import { useCartStore } from "../../store/cart";
import { ProductsData } from "../productsListing/data";
import Image from "next/image";
import { VscClose } from "react-icons/vsc";
import { useToastStore } from "../../store/toast";
import Popup from "../shared/popup";

type CartProps = {
  handleCart: () => void;
};

export default function Cart({ handleCart }: CartProps) {
  const { cart, shouldShowCart, removeFromCart } = useCartStore(
    (state) => state
  );
  let subtotal = 0;
  let addonsTotal = 0;

  const showToast = useToastStore((state) => state.showToast);

  const getProductDetails = (productId: string) =>
    ProductsData.find((product) => product.productId === productId);

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
    showToast("Removed from cart!", "success");
  };

  return (
    <AnimatePresence>
      <Popup
        heading="Your Cart"
        openPopup={shouldShowCart}
        isCart
        closePopup={handleCart}
      >
        {/* Items */}
        <div className="flex flex-col px-4 pt-8 py-4 gap-4 overflow-y-auto custom-scrollbar">
          {cart.length === 0 ? (
            <p className="text-center text-gray-400">Your cart is empty.</p>
          ) : (
            cart.map((item) => {
              const product = getProductDetails(item.productId);
              if (!product) return null;

              const basePrice = parseFloat(product.price.replace("$", ""));

              const selectedAddons = item.addons || [];

              const totalAddons = selectedAddons.reduce(
                (sum, addon) => sum + addon.price,
                0
              );

              const totalPrice = (basePrice + totalAddons) * item.quantity;
              subtotal += basePrice * item.quantity;
              addonsTotal += totalAddons * item.quantity;

              return (
                <Link
                  href={`/product/${item.productId}`}
                  key={item.productId}
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
                    <div className="absolute z-10 bg-red-500 text-[10px] p-0.5 capitalize">
                      {product.offer}
                    </div>
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
                          onClick={() => handleRemoveFromCart(item.productId)}
                        />
                      </div>
                      <div className="w-full">
                        <p className="mb-1 flex gap-1 justify-bestween items-center">
                          <span className="text-md text-red-500 font-bold">
                            {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs line-through text-gray-400">
                              {product.originalPrice}
                            </span>
                          )}
                        </p>
                      </div>

                      {/* Quantity & Total */}
                      <div className="flex justify-between mt-2 text-sm">
                        <span>Qty: {item.quantity}</span>
                        <span className="font-semibold ">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                      {/* Add-ons */}
                      {selectedAddons.length > 0 && (
                        <div className="mt-2 text-xs ">
                          {selectedAddons.map((addon) => addon.name).join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Buy Now Button */}
        {cart.length > 0 && (
          <div className="flex flex-col mb-8 mt-2 gap-2 px-4 text-sm">
            <div className="flex justify-between">
              Subtotal{" "}
              <span className="font-semibold ">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              Total Add-ons{" "}
              <span className="font-semibold ">
                ${addonsTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              Grand Total{" "}
              <span className="font-semibold text-base">
                ${(subtotal + addonsTotal).toFixed(2)}
              </span>
            </div>
            <Button
              inverted
              className="w-full py-3 text-lg font-medium"
              onClick={handleCart}
            >
              Buy Now
            </Button>
          </div>
        )}
      </Popup>
    </AnimatePresence>
  );
}
