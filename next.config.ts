import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: process.env.NODE_ENV === 'production'
      ? [
        'https://kind-stone-0487f4d03.6.azurestaticapps.net'
      ]
      :
      [
        'localhost:3000',
        '*.devtunnels.ms',
      ],
    },
  },
};

export default nextConfig;
