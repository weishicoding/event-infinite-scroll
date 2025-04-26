import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This configuration tells Next.js to allow images from the "suiterc.icareus.com" domain.
  images: {
    domains: ["suiterc.icareus.com"],
  },
};

export default nextConfig;
