"use client";

import Link from "next/link";
import Button from "../shared/button";
import Image from "next/image";
import { VscClose } from "react-icons/vsc";
import Popup from "../shared/popup";
import { useToastStore } from "@/store/toastStore";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/actions/cart";

type CartProps = {
  handleCart: () => void;
};

export default function Cart({ handleCart }: CartProps) {
  const { cartId, cartCount, cart, shouldShowCart, setCart } = useCartStore(
    (state) => state
  );
  const [isCartLoading, setIsCartLoading] = useState<boolean>(false);
  let subtotal = 0;
  let addonsTotal = 0;

  const showToast = useToastStore((state) => state.showToast);

  const handleRemoveFromCart = (product_id: string) => {
    // removeFromCart(product_id);
    showToast("Removed from cart!", "success");
  };

  const fetchCart = async () => {
    setIsCartLoading(true);
    const newCart: any = await fetchCartItems(cartId!);
    setCart(newCart);
    setIsCartLoading(false);
  };

  useEffect(() => {
    if (shouldShowCart && cartId && cartCount > 0 && !cart?.length) {
      fetchCart();
    }
  }, [cartCount, shouldShowCart, cartId, cart]);

  return (
    <Popup
      heading="Your Cart"
      openPopup={shouldShowCart}
      isCart
      closePopup={handleCart}
    >
      {isCartLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          Loading..
        </div>
      ) : (
        <>
          {/* Items */}
          <div className="flex flex-col px-4 pt-8 py-4 gap-4 overflow-y-auto custom-scrollbar">
            {cart?.length === 0 ? (
              <p className="text-center text-gray-400">Your cart is empty.</p>
            ) : (
              cart?.map((item) => {
                const product = item.product;
                if (!product) return null;

                const selectedAddons = item.addons || [];

                const totalAddons = selectedAddons.reduce(
                  (sum, addon) => sum + addon.price,
                  0
                );

                const totalPrice =
                  (product.price + totalAddons) * item.quantity;
                subtotal += product.price * item.quantity;
                addonsTotal += totalAddons * item.quantity;

                return (
                  <Link
                    href={{
                      pathname: `/product/${product.product_id}`,
                      query: {
                        addonId: selectedAddons?.map(
                          (addon) => addon?.addon_id
                        ),
                      },
                    }}
                    key={item.cart_item_id}
                    className="flex gap-2 border-b border-gray-800 pb-4"
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image_url}
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
                            onClick={() =>
                              handleRemoveFromCart(product.product_id)
                            }
                          />
                        </div>
                        <div className="w-full">
                          <p className="mb-1 flex gap-1 justify-bestween items-center">
                            <span className="text-md text-red-500 font-bold">
                              ${product.price}
                            </span>
                            {product.original_price && (
                              <span className="text-xs line-through text-gray-400">
                                ${product.original_price}
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
                            {selectedAddons
                              .map((addon) => addon.name)
                              .join(", ")}
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
          {cart?.length > 0 && (
            <div className="flex flex-col mb-8 mt-2 gap-2 px-4 text-sm">
              <div className="flex justify-between">
                Subtotal{" "}
                <span className="font-semibold ">${subtotal.toFixed(2)}</span>
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
        </>
      )}
    </Popup>
  );
}
