import { supabase } from "@/lib/supabase";
import Deals from "../components/deals";
import Featured from "../components/featured";
import HeroBanner from "../components/hero-banner";
import { ProductsListing } from "../components/productsListing";
import { DEALITEMS } from "../helpers/constants";

export default async function Home() {
  const { data: products, error } = await supabase.from("products").select("*");
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
