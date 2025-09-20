import PageLayoutWrapper from "@/components/page-layout-wrapper";
import PDP from "@/components/pdp";
import { supabase } from "@/lib/supabase";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params;
  let { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("product_id", productId)
    .single();

  return (
    <PageLayoutWrapper addMarginTop>
      <PDP product={product} />
    </PageLayoutWrapper>
  );
}
