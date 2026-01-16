import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ik.imagekit.io", "placehold.co"], // allow ImageKit
  },
};

export default nextConfig;
