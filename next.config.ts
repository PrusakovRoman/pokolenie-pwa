import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  clientsClaim: true,
  buildExcludes: [/chunks\/.*/, /media\/.*/],
  exclude: [
    /\.map$/,
    /^_next\/static\/chunks\/.*/,
  ],
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone'
};

export default withPWA(nextConfig);