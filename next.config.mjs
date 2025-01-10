/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    domains: ['badfairy.s3.sa-east-1.amazonaws.com'],
  },
  experimental: {
    // By default, page components are cached for some time
    staleTimes: {
      dynamic: 30,
      static: 180
    },
  },
};

export default nextConfig;
