import React from "react";
import PageLayoutWrapper from "../../../components/page-layout-wrapper";
import Featured from "../../../components/featured";
import { ProductsListing } from "../../../components/products-listing";
import { supabase } from "@/utils/supabase-old/client";

async function PizzasPage() {
  const { data: products, error } = await supabase.from("products").select("*");

  return (
    <PageLayoutWrapper>
      <Featured addMarginTop />
      <ProductsListing heading="Choose your favourite" products={products} />
    </PageLayoutWrapper>
  );
}

export default PizzasPage;
