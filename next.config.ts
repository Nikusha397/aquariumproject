import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Demo aquarium photos are served from Unsplash. Swap these for the
    // client's own product photos by changing the URLs in src/lib/products.ts.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
