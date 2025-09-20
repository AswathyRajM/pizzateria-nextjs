import React from "react";
import PageLayoutWrapper from "../../../components/page-layout-wrapper";
import Deals from "../../../components/deals";
import { DEALITEMS } from "../../../helpers/constants";
import Featured from "../../../components/featured";
import HeadingBanner from "../../../components/heading-banner";

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
