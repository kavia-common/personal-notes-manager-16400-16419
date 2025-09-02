import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // We generate a fully static site
  output: "export",
  // Ensure client-side navigation works with static export
  trailingSlash: true,
  // App Router is already used by default in src/app
  experimental: {
    optimizePackageImports: [],
  },
  // Prevent tracing issues in CI for static export
  outputFileTracingIncludes: {
    "/": [],
  },
};

export default nextConfig;
