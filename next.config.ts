import withSerwistInit from '@serwist/next';
import type { NextConfig } from 'next';

const withSerwist = withSerwistInit({
  disable: process.env.NODE_ENV !== 'production',
  swDest: 'public/sw.js',
  swSrc: 'src/app/sw.ts',
});

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          as: '*.js',
          loaders: ['@svgr/webpack'],
        },
      },
    },
  },
  webpack: (config) => {
    // For svgr
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default withSerwist(nextConfig);
