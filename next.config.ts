import type { NextConfig } from 'next';

// basePath 由环境变量显式控制：
// - GitHub Pages 部署：CI 中设置 NEXT_PUBLIC_BASE_PATH=/join-feishu
// - Electron / 本地 / Vercel：默认空字符串
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
