import type { NextConfig } from "next";

/**
 * Static Export:
 * - output: "export" makes `next build` emit a static site in the `out/` directory.
 * - trailingSlash ensures correct static routing for nested paths on static hosts.
 * - Avoid dynamic rendering flags in pages/layouts to keep export viable.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  experimental: {
    optimizePackageImports: [],
  },
  outputFileTracingIncludes: {
    "/": [],
  },
};

export default nextConfig;
