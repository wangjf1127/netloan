/** @type {import('next').NextConfig} */
const nextConfig = {
  // 最小化配置，减少内存使用
  experimental: {
    // 禁用一些实验性功能来减少内存使用
    optimizePackageImports: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // 减少并发编译
  webpack: (config, { dev }) => {
    if (dev) {
      // 减少并发数
      config.parallelism = 1;
      // 禁用一些优化来减少内存使用
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      };
    }
    return config;
  },
  // 禁用图像优化
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
