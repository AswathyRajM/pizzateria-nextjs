"use server";
import { AddToCartType } from "@/helpers/types";
import { supabase } from "@/utils/supabase/client";

export const getCartIdAndCount = async (userId: string) => {
  try {
    const { data: cartData, error } = await supabase
      .from("cart")
      .select("total_count, cart_id")
      .eq("user_id", userId)
      .single();

    if (error) throw error;

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
    const { data: newCart, error: insertCartError } = await supabase
      .from("cart")
      .insert({ user_id: userId })
      .select("cart_id")
      .maybeSingle();

    if (insertCartError) throw insertCartError;
    return newCart?.cart_id;
  } catch (error) {
    console.error("Create cartid error", error);
    return null;
  }
};

export const addItemToCart = async (item: AddToCartType, cartId: string) => {
  try {
    if (!cartId) return;
    // Insert new cart item
    const { data, error: insertItemError } = await supabase
      .from("cart_item")
      .insert({
        cart_id: cartId,
        product_id: item.product_id,
        quantity: item.quantity,
        addons: item.addons,
      });

    if (insertItemError) throw insertItemError;

    console.log(data);
    return data;
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
