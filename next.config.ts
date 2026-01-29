import type { NextConfig } from "next";

const nextConfig: NextConfig = {
};

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  clientsClaim: true,
  swSrc: 'public/custom-sw.js',
  swDest: 'sw.js',
});

module.exports = withPWA(nextConfig);

export default nextConfig;