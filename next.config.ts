import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === 'production' ? '/person' : '',
  webpack(config) {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
