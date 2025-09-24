import { productAddonFormat } from "@/utils/product";
import { supabase } from "@/utils/supabase/client";

export const fetchProductDetails = async (productId: string) => {
  try {
    if (!productId) return;
    const { data: product, error } = await supabase
      .from("products")
      .select(
        `*, product_addons (
          addons (*)
        )`
      )
      .eq("product_id", productId)
      .single();

    if (error) throw error;
    if (!product) {
      console.log(`Product with id ${productId} not found`);
      return { error: true };
    }
    return { ...product, addons: productAddonFormat(product.product_addons) };
  } catch (error) {
    console.log({ error });
    return { error: true };
  }
};
