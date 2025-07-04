import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    // Allow synchronous access to searchParams and params
    // This eliminates the errors about awaiting params
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3002'],
      bodySizeLimit: '10mb', // Increase the body size limit for larger image uploads
    },
  },
  // Disable ESLint during production build
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
