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
};

export default nextConfig; 