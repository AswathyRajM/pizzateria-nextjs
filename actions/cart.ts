"use server";
import { AddonType, AddToCartType, CartItemType } from "@/utils/types";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function checkCartId() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (cartId && cartId !== "null") {
    console.log("Cart ID exists:", cartId);
    return cartId;
  }
  console.log("No cart ID found.");
  return null;
}

export const getCartIdAndCount = async (userId: string) => {
  try {
    const supabase = await createClient();

    const { data: cartData, error } = await supabase
      .from("cart")
      .select("total_count, cart_id")
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    const cookieStore = await cookies();

    cookieStore.set("cartId", cartData?.cart_id || null, {
      path: "/",
      httpOnly: false,
    });

    return {
      cartCount: cartData?.total_count || 0,
      cartId: cartData?.cart_id || null,
    };
  } catch (error) {
    console.error("getCartIdAndCount error", error);
    return { cartCount: 0, cartId: null };
  }
};

export const fetchCartItems = async (cartId: string) => {
  try {
    const supabase = await createClient();
    const { data: cart, error: insertCartError } = await supabase
      .from("cart_item")
      .select("*, product:products(*)", { count: "exact" })
      .eq("cart_id", cartId);

    if (insertCartError) throw insertCartError;
    return cart;
  } catch (error) {
    console.error("fetchCartItems error", error);
    return null;
  }
};

export const createCart = async (userId: string) => {
  try {
    if (!userId) return;
    const supabase = await createClient();
    const { data: newCart, error: insertCartError } = await supabase
      .from("cart")
      .insert({ user_id: userId })
      .select("cart_id")
      .maybeSingle();

    if (insertCartError) throw insertCartError;
    const cookieStore = await cookies();

    cookieStore.set("cartId", newCart?.cart_id, {
      path: "/",
      httpOnly: false,
    });

    return newCart?.cart_id;
  } catch (error) {
    console.error("Create cartid error", error);
    return null;
  }
};

export const addItemToCart = async (
  item: AddToCartType,
  cartId: string,
  cart: CartItemType[]
) => {
  try {
    if (!cartId) return;

    const supabase = await createClient();

    // Normalize addons (compare by addon_id)
    const normalizeAddons = (addons: AddonType[]) =>
      [...addons]
        .map((a) => a.addon_id)
        .sort()
        .join(",");

    const incomingAddons = normalizeAddons(item.addons || []);

    // 1. Check if the same product + addons exist in cart
    const existingCartItem = cart?.find(
      (cartItem) =>
        cartItem.product.product_id === item.product_id &&
        normalizeAddons(cartItem.product.addons || []) === incomingAddons
    );

    if (existingCartItem) {
      // Update quantity of existing item
      const { data, error: updateError } = await supabase
        .from("cart_item")
        .update({
          quantity: existingCartItem.quantity + item.quantity,
        })
        .eq("cart_item_id", existingCartItem.cart_item_id);

      if (updateError) throw updateError;
      console.log("Updated existing cart item:", data);
      return data;
    } else {
      // Insert new cart item
      const { data, error: insertItemError } = await supabase
        .from("cart_item")
        .insert({
          cart_id: cartId,
          product_id: item.product_id,
          quantity: item.quantity,
          addons: item.addons,
        })
        .select();

      if (insertItemError) throw insertItemError;
      console.log("Added new cart item:", data);
      return data;
    }
  } catch (error) {
    console.error("Add/update cart item error:", error);
    return null;
  }
};

export const removeCartItem = async (cartItemId: string) => {
  try {
    const supabase = await createClient();
    const { data, error: removeItemError } = await supabase
      .from("cart_item")
      .delete()
      .eq("cart_item_id", cartItemId)
      .single();
    console.log({ data, cartItemId });

    if (removeItemError) throw removeItemError;
    return true;
  } catch (error) {
    console.error("Delete cart item error:", error);
    return null;
  }
};
