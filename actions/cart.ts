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
      .select("*, product:products(*) ")
      .eq("cart_id", cartId);

    if (insertCartError) throw insertCartError;
    return cart;
  } catch (error) {
    console.error("Create cartid error", error);
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

export const addOrUpdateCartItem = async (
  userId: string,
  item: AddToCartType,
  cartId: string,
  cartItemId?: string
) => {
  try {
    let finalCartId = cartId;
    const supabase = await createClient();

    if (!finalCartId) {
      const { data: newCart, error: insertCartError } = await supabase
        .from("cart")
        .insert({ user_id: userId, total_count: 0 })
        .select("id")
        .single();

      if (insertCartError) throw insertCartError;
      finalCartId = newCart?.id;
    }

    if (!finalCartId) throw new Error("Failed to create or get cart");

    // 2️⃣ Add or increment cart item
    if (cartItemId) {
      // Increment quantity for existing cart item
      const { error: updateError } = await supabase
        .from("cart_item")
        .select("*")
        // .update({ quantity: supabase.raw("quantity + ?", [item.quantity]) })
        .eq("id", cartItemId);

      if (updateError) throw updateError;
    } else {
      // Insert new cart item
      const { error: insertItemError } = await supabase
        .from("cart_item")
        .insert({
          cart_id: finalCartId,
          product_id: item.product_id,
          quantity: item.quantity,
          addons: item.addons, // array or JSON
        });

      if (insertItemError) throw insertItemError;
    }

    // 3️⃣ Update cart total_count using Postgres function
    const { error: updateCartError } = await supabase.rpc(
      "update_cart_total_count",
      {
        cart_id: finalCartId,
      }
    );

    if (updateCartError) throw updateCartError;

    return finalCartId;
  } catch (error) {
    console.error("Add/update cart item error:", error);
    return null;
  }
};
