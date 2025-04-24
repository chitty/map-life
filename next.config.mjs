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
  // Disable server components for static export
  experimental: {
    // These features are not compatible with static exports
    serverActions: false,
    serverComponents: false
  }
};

export default nextConfig; 