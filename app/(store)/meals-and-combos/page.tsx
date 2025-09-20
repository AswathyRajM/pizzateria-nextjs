import Deals from "@/components/deals";
import HeadingBanner from "@/components/heading-banner";
import PageLayoutWrapper from "@/components/page-layout-wrapper";
import { ProductsListing } from "@/components/productsListing";
import { DEALITEMS } from "@/helpers/constants";
import { supabase } from "@/lib/supabase";
import React from "react";

async function PizzasPage() {
  const { data: products, error } = await supabase.from("products").select("*");

  return (
    <PageLayoutWrapper>
      <HeadingBanner
        heading="Meals & Combos"
        imgUrl="https://ik.imagekit.io/aswathy/images/featured_Q2wsv02eL.jpg?updatedAt=1651588578882"
      />
      <Deals items={DEALITEMS} />
      <ProductsListing heading="Choose your favourite" products={products} />
    </PageLayoutWrapper>
  );
}

export default PizzasPage;
