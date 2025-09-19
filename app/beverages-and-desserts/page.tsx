import React from "react";
import PageLayoutWrapper from "../src/components/page-layout-wrapper";
import Featured from "../src/components/featured";
import { ProductsListing } from "../src/components/productsListing";
import { ProductsData } from "../src/components/productsListing/data";

function PizzasPage() {
  return (
    <PageLayoutWrapper>
      <Featured addMarginTop/>
      <ProductsListing heading="Choose your favourite" data={ProductsData} />
    </PageLayoutWrapper>
  );
}

export default PizzasPage;
