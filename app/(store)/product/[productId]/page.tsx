import { fetchProductDetails } from "@/actions/product";
import PageLayoutWrapper from "@/components/page-layout-wrapper";
import PDP from "@/components/pdp";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;

  const product = await fetchProductDetails(productId);
  if (!productId || product?.error) {
    return notFound();
  }

  return (
    <PageLayoutWrapper addMarginTop>
      <PDP product={product} />
    </PageLayoutWrapper>
  );
}
