"use client";

import { useEffect, useState } from "react";
// import throttle from "lodash.throttle"; uninstall

export default function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  function handleScroll() {
   setScrollY(window.pageYOffset);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollY;
}
