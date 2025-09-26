import { productAddonFormat } from "@/utils/product";
import { createClient } from "@/utils/supabase/server";
import { ProductType } from "@/utils/types";

export const fetchProductDetails = async (productId: string) => {
  try {
    const supabase = await createClient();

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

export const fetchProductListing = async () => {
  try {
    const supabase = await createClient();

    const { data: products, error } = await supabase.from("products").select(
      `*, product_addons (
          addons (*)
        )`
    );
    if (error) throw error;
    if (!products || !products.length) {
      console.log(`Products not found`);
      return { error: true };
    }
    return products.map((product: any) => {
      return { ...product, addons: productAddonFormat(product.product_addons) };
    });
  } catch (error) {
    console.log({ error });
    return { error: true };
  }
};
