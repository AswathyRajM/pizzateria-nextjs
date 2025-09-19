import Deals from "./src/components/deals";
import Featured from "./src/components/featured";
import HeroBanner from "./src/components/hero-banner";
import { ProductsListing } from "./src/components/productsListing";
import { ProductsData } from "./src/components/productsListing/data";
import { DEALITEMS } from "./src/helpers/constants";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
      <HeroBanner />
      <ProductsListing heading="Choose your favourite" data={ProductsData} />
      <Featured />
      <Deals items={DEALITEMS} />
      <ProductsListing heading="Trending Deals & Combos" data={ProductsData} />
    </div>
  );
}
