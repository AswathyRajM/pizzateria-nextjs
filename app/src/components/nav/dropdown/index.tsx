"use client";

import Link from "next/link";
import React from "react";

type DropDownProps = {
  handleDropdown: () => void;
  handleDropdownLeave: () => void;
};

export const DropDown: React.FC<DropDownProps> = ({
  handleDropdown,
  handleDropdownLeave,
}) => {
  return (
    <div
      onMouseEnter={handleDropdown}
      onMouseLeave={handleDropdownLeave}
      className="absolute top-10 left-0 z-[999] w-44"
    >
      {/* Transparent spacer to prevent flicker */}
      <div className="w-full h-2 bg-transparent" />

      <aside className="bg-white text-black grid items-center justify-center rounded-sm transition-all duration-300 ease-in-out sm:w-full">
        <nav className="grid grid-cols-1 gap-y-2 pt-1.5 sm:gap-y-4">
          {["Account", "Orders", "History", "Logout"].map((item) => (
            <Link
              key={item}
              href="/"
              className="relative flex items-center justify-center text-base font-semibold tracking-wide cursor-pointer pt-8 last:pb-4 group"
            >
              <p className="relative">
                {item}
                <span className="absolute left-0 -bottom-1 h-[3px] w-0 bg-transparent transition-all duration-200 ease-in-out group-hover:w-full group-hover:bg-indigo-600" />
              </p>
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
};
