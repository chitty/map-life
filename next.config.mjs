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
  // Completely disable prefetching which causes the .txt?_rsc= requests
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
};

export default nextConfig; 