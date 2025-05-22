import { withSentryConfig } from '@sentry/nextjs';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'imagedelivery.net',
      'imagecdn.app',
    ],
    unoptimized: false,
  },
  // Remove the experimental optimizeCss feature that's causing the build error
  // experimental: {
  //   optimizeCss: true,
  // },
};

export default withBundleAnalyzerConfig(nextConfig);
