"use client";
import { SIDEBAR_NAVLINKS } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <div className="flex w-full items-start  flex-col md:max-w-6xl py-0 md:pt-12 mx-auto">
      <div className="flex w-1/3 max-w-[200px]">
        {SIDEBAR_NAVLINKS.map((sidebar) => {
          const isActive = pathname === sidebar.href;
          return (
            <Link
              className={`p-4 text-gray-400 hover:text-white rounded-md ${
                isActive ? "bg-neutral-900 text-white" : ""
              }`}
              key={sidebar.href}
              href={sidebar.href}
            >
              {sidebar.label}
            </Link>
          );
        })}
      </div>
      <div className="bg-neutral-900 min-h-[40vh] p-4 w-full md:min-w-[50vw]">{children}</div>
    </div>
  );
}

export default Sidebar;
