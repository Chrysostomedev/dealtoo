import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dealtoo.co",
      },
    ],
  },
};

export default nextConfig;