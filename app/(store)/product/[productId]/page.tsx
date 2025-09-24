import { fetchProductDetails } from "@/actions/product";
import PageLayoutWrapper from "@/components/page-layout-wrapper";
import PDP from "@/components/pdp";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    productId: string;
  };
  searchParams: { addonId?: string | string[] };
}

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { productId } = await params;
  const { addonId = [] } = await searchParams;
  const addonIds = Array.isArray(addonId) ? addonId : addonId ? [addonId] : [];

  const product = await fetchProductDetails(productId);
  if (!productId || product?.error) {
    return notFound();
  }

  return (
    <PageLayoutWrapper addMarginTop>
      <PDP product={product} addonIds={addonIds} />
    </PageLayoutWrapper>
  );
}
