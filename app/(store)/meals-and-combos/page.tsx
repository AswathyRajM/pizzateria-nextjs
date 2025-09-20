import React from "react";
import PageLayoutWrapper from "../../components/page-layout-wrapper";
import Featured from "../../components/featured";
import { ProductsListing } from "../../components/productsListing";
import { ProductsData } from "../../components/productsListing/data";
import Deals from "../../components/deals";
import { DEALITEMS } from "../../helpers/constants";
import HeadingBanner from "../../components/heading-banner";

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
