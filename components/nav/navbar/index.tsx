"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPizzaSlice, FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import Cart from "../../cart";
import useScrollPosition from "@/hooks/useScrollPosition";
import { NAVLINKS } from "@/helpers/constants";
import { useCartStore } from "@/store/cartStore";
import { useUserState } from "@/store/userStore";
import { getCartIdAndCount } from "@/actions/cart";
import { CartIdAndCountType } from "@/helpers/types";
import { getUserSession } from "@/actions/auth";

export default function Navbar() {
  const [hamburgerOpened, setHamburgerOpened] = useState(false);
  const scrollY = useScrollPosition();
  const { shouldShowCart, cartCount, setShowCart, setCartCount } = useCartStore(
    (state) => state
  );
  const { setAuth } = useUserState((state) => state);

  const fetchCart = async () => {
    const userSession = await getUserSession();

    if (userSession?.user.id) {
      setAuth(userSession);
      const cartCount: CartIdAndCountType = await getCartIdAndCount(
        userSession.user.id
      );
      setCartCount(cartCount);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCart = () => {
    setShowCart(!shouldShowCart);
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
        <nav className="w-full flex items-center justify-center px-4 lg:px-10 py-4">
          <div className="relative max-w-6xl w-full flex items-center justify-between gap-10">
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
                  className="text-2xl text-white/90 font-bold tracking-wide z-50 cursor-pointer"
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
                    className="relative text-white/90 capitalize group"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-10">
              {/* User Dropdown */}
              <div className="relative group">
                <Link href="/" className="text-white text-2xl">
                  <FaUserCircle className="group-hover:text-yellow-500" />
                </Link>
              </div>

              {/* Cart */}
              <button
                onClick={handleCart}
                className="relative text-white text-2xl flex items-center cursor-pointer group"
              >
                <FaPizzaSlice className="group-hover:text-yellow-500" />
                <span className="absolute -top-1 -right-2 bg-yellow-500 text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>
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
                  className="text-lg capitalize hover:text-yellow-500 transition"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Cart handleCart={handleCart} />
    </>
  );
}
