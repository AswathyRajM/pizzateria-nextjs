"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FOOTER_NAVLINKS } from "@/helpers/constants";

const FooterComponent = () => {
  const Copyright =
    "Copyright © " + new Date().getFullYear() + ", Pizzateria, IN";

  return (
    <footer className="bg-black w-full flex flex-col items-center justify-center text-sm mt-4">
      <div className="flex flex-col items-center justify-between w-full max-w-6xl">
        {/* Container */}
        <div className=" items-start justify-between w-full py-10 px-4 lg:px-0 gap-8 grid grid-cols-1 gap-y-6 max-[400px] md:grid-cols-5">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-start flex-col col-span-2  md:col-span-1 "
          >
            <Link
              href="/"
              className="text-white/90 text-2xl font-semibold flex items-center mb-4"
            >
              Pizzateria
            </Link>
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
              minima repudiandae provident ex, officia debitis!
            </div>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-[25rem] col-span-2 max-[400px]:col-span-2"
          >
            <h4 className="pb-4 font-semibold text-lg text-white/90">
              Who we are?
            </h4>
            <p className="leading-7">
              The first Pizzateria Restaurant in Kerala opened in Alappey over
              30 years ago to a pizza craving state and now, there are over 20
              restaurants up and down the state, serving millions of guests!
            </p>
          </motion.div>

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2"
          >
            <h4 className="pb-4 font-semibold text-lg text-white/90">
              Company
            </h4>
            <nav className="flex flex-col">
              {FOOTER_NAVLINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative pb-2 w-fit hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="space-y-2"
          >
            <h4 className="pb-4 font-semibold text-lg text-white/90">
              Connect with Us
            </h4>
            <nav className="flex flex-col">
              {["Facebook", "Twitter", "Instagram", "Youtube"].map((item) => (
                <Link
                  key={item}
                  href="/"
                  className="relative pb-2 w-fit hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>
        </div>
      </div>
      {/* Copyright */}
      <div className="bg-yellow-500 text-black w-full text-center py-4">
        {Copyright}
      </div>
    </footer>
  );
};

export default FooterComponent;
