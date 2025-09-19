import React from "react";
import PageLayoutWrapper from "../src/components/page-layout-wrapper";
import Deals from "../src/components/deals";
import { DEALITEMS } from "../src/helpers/constants";
import Featured from "../src/components/featured";
import HeadingBanner from "../src/components/heading-banner";

function DealsAndOffersPage() {
  return (
    <PageLayoutWrapper>
      <HeadingBanner heading='Best Offers' imgUrl='https://ik.imagekit.io/aswathy/images/featured_Q2wsv02eL.jpg?updatedAt=1651588578882' />
      <Deals items={DEALITEMS} />
      <Featured />
    </PageLayoutWrapper>
  );
}

export default DealsAndOffersPage;
