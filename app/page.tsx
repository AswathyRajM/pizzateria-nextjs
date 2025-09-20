import Deals from "../components/deals";
import Featured from "../components/featured";
import HeroBanner from "../components/hero-banner";
import { ProductsListing } from "../components/productsListing";
import { ProductsData } from "../components/productsListing/data";
import { DEALITEMS } from "../helpers/constants";

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
