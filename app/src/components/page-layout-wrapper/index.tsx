import React from "react";

function PageLayoutWrapper({
  children,
  addMarginTop,
}: {
  children: React.ReactNode;
  addMarginTop?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-6  md:gap-10 ${
        addMarginTop ? "mt-[64px]" : "mt-0"
      }  mb-10`}
    >
      {children}
    </div>
  );
}

export default PageLayoutWrapper;
