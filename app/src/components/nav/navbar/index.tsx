"use client";

import { useState } from "react";
import Link from "next/link";
import { FaPizzaSlice, FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import Cart from "../../cart";
import useScrollPosition from "@/app/src/hooks/useScrollPosition";
import { NAVLINKS } from "@/app/src/helpers/constants";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [hamburgerOpened, setHamburgerOpened] = useState(false);
  const [openCart, setCartOpen] = useState(false);
  const scrollY = useScrollPosition();

  const handleCart = () => {
    setCartOpen(!openCart);
  };

  const handleHamburger = () => {
    setHamburgerOpened((prev) => !prev);
  };

  return (
    <>
      <div
        className={`fixed top-0 w-screen z-50 transition-colors duration-700 ${
          hamburgerOpened
            ? "bg-red-600 transition-none duration-0"
            : scrollY > 0
            ? "bg-red-600"
            : "bg-gradient-to-b from-black via-black/20 to-transparent"
        }`}
      >
        <nav className="flex items-center justify-between gap-10 max-w-6xl mx-auto px-4 lg:px-0 py-4">
          <div className="flex items-center gap-10">
            {/* Hamburger Menu */}
            <div className="flex items-center gap-6">
              <GiHamburgerMenu
                className="lg:hidden cursor-pointer"
                onClick={handleHamburger}
              />
              {/* Logo */}
              <Link
                href="/"
                className="text-2xl text-white font-bold tracking-wide z-50 cursor-pointer"
              >
                Pizzateria
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6 font-medium">
              {NAVLINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-white capitalize group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-10">
            {/* User Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setOpenMenu(true)}
              onMouseLeave={() => setOpenMenu(false)}
            >
              <Link href="/" className="text-white text-2xl">
                <FaUserCircle className="group-hover:text-yellow-400" />
              </Link>
              <AnimatePresence>
                {openMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute mt-2 left-0 bg-white shadow-lg rounded-md p-4 text-black"
                  >
                    {/* Replace with your DropDown component content */}
                    <p className="text-sm">Profile</p>
                    <p className="text-sm">Settings</p>
                    <p className="text-sm">Logout</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <button
              onClick={handleCart}
              className="relative text-white text-2xl flex items-center cursor-pointer group"
            >
              <FaPizzaSlice className="group-hover:text-yellow-400" />
              <span className="absolute -top-1 -right-2 bg-yellow-400 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                4
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {hamburgerOpened && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-16 left-0 w-full bg-red-600 text-white flex flex-col items-center gap-4 py-6 z-40"
            >
              {NAVLINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg capitalize hover:text-yellow-400 transition"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Cart openCart={openCart} handleCart={handleCart} />
    </>
  );
}
