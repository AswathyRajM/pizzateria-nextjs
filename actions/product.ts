import { supabase } from "@/utils/supabase/client";

export const fetchProductDetails = async (productId: string) => {
  try {
    if (!productId) return;
    const { data: product, error } = await supabase
      .from("products")
      .select(
        `
    *,
    product_addons (
      addon_id,
      addons (*)
    )
    `
      )
      .eq("product_id", productId)
      .single();

    if (!product) return { error: true };

    if (error) throw error;

    return product;
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};
