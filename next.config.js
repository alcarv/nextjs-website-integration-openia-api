/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use the default Node/SSR output so API routes and webhooks work
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
