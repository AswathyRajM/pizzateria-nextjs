import Deals from "./src/components/deals";
import Featured from "./src/components/featured";
import HeroBanner from "./src/components/hero-banner";
import { ProductsListing } from "./src/components/productsListing";
import { ProductsData } from "./src/components/productsListing/data";
export default function Home() {
  const dealItems = [
    {
      image: "https://ik.imagekit.io/aswathy/images/featured_Q2wsv02eL.jpg",
      title: "Delicious Pie",
      description: "Freshly baked pies with buttery crust and seasonal fruits.",
      buttonText: "Order Now",
    },
    {
      image: "https://ik.imagekit.io/aswathy/images/featured_Q2wsv02eL.jpg",
      title: "Tasty Pastries",
      description: "Handmade pastries that melt in your mouth with every bite.",
      buttonText: "Shop Now",
    },
  ];
  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
      <HeroBanner />
      <ProductsListing heading="Choose your favourite" data={ProductsData} />
      <Featured />
      <Deals items={dealItems} />
      <ProductsListing heading="Trending Deals & Combos" data={ProductsData} />
    </div>
  );
}
