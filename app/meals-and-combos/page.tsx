import React from "react";
import PageLayoutWrapper from "../src/components/page-layout-wrapper";
import Featured from "../src/components/featured";
import { ProductsListing } from "../src/components/productsListing";
import { ProductsData } from "../src/components/productsListing/data";
import Deals from "../src/components/deals";
import { DEALITEMS } from "../src/helpers/constants";
import HeadingBanner from "../src/components/heading-banner";

function PizzasPage() {
  return (
    <PageLayoutWrapper >
      <HeadingBanner  heading='Meals & Combos' imgUrl='https://ik.imagekit.io/aswathy/images/featured_Q2wsv02eL.jpg?updatedAt=1651588578882' />
      <Deals items={DEALITEMS} />
      <ProductsListing heading="Choose your favourite" data={ProductsData} />
    </PageLayoutWrapper>
  );
}

export default PizzasPage;
