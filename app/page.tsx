import { createClient } from "@/utils/supabase/server";
import Deals from "../components/deals";
import Featured from "../components/featured";
import HeroBanner from "../components/hero-banner";
import { ProductsListing } from "../components/products-listing";
import { DEALITEMS } from "../utils/constants";
import { fetchProductListing } from "@/actions/product";

export default async function Home() {
  const products: any = await fetchProductListing();
  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
      <HeroBanner />
      <ProductsListing heading="Choose your favourite" products={products} />
      <Featured />
      <Deals items={DEALITEMS} />
      <ProductsListing heading="Trending Deals & Combos" products={products} />
    </div>
  );
}
