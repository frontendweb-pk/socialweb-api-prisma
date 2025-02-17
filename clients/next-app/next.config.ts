import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PULBLIC_BACKEND_URL + "/:path*",
      },
    ];
  },
};

export default nextConfig;
