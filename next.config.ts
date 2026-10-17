import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // The site uses locally bundled certificate previews and an accessible client-side shader scene.
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
