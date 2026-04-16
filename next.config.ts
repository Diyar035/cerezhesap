import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Statik export ayarları */
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub repo adın neyse onu buraya yazmalısın (Örn: /cerezhesap)
  // basePath: '/cerezhesap', 
};

export default nextConfig;