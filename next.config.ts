import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ['res.cloudinary.com','spaceonesurfaces.com','pub-0fd661f0d30a4344a3b4d291f6516fc2.r2.dev'],
  },
};

export default nextConfig;
