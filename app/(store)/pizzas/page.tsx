import React from "react";
import PageLayoutWrapper from "../../../components/page-layout-wrapper";
import Featured from "../../../components/featured";
import { ProductsListing } from "../../../components/productsListing";
import { ProductsData } from "../../../components/productsListing/data";

function PizzasPage() {
  return (
    <PageLayoutWrapper>
      <Featured addMarginTop/>
      <ProductsListing heading="Choose your favourite" data={ProductsData} />
    </PageLayoutWrapper>
  );
}

export default PizzasPage;
