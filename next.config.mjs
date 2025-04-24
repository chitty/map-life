/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: process.env.NODE_ENV === 'production' ? '/map-life' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/map-life/' : '',
  images: {
    unoptimized: true,
  },
  output: 'export',
  // Enable build cache for faster rebuilds
  experimental: {
    turbotrace: {
      memoryLimit: 4000 // Increase memory limit for better performance
    }
  }
};

export default nextConfig; 