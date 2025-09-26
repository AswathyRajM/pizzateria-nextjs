import Image from "next/image";
import PageLayoutWrapper from "@/components/page-layout-wrapper";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageLayoutWrapper>
      <div className="relative max-w-screen overflow-hidden !text-gray-300 ">
        <div className="fixed h-screen w-screen -z-10">
          <Image
            src={
              "https://ik.imagekit.io/aswathy/images/featured_Q2wsv02eL.jpg?updatedAt=1651588578882"
            }
            alt={"auth image"}
            fill
            className="object-fill opacity-50"
          />
        </div>
        <div className="flex h-screen w-screen opacity-100 items-center justify-center">
          {children}
        </div>
      </div>
    </PageLayoutWrapper>
  );
}
