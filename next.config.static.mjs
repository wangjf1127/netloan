/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出配置
  output: 'export',
  
  // 禁用图片优化（静态导出必需）
  images: {
    unoptimized: true,
  },
  
  // 生成静态HTML文件时的配置
  trailingSlash: true,
  
  // 如果部署到GitHub Pages或其他子目录，配置basePath
  // basePath: '/your-repo-name',
  
  // 如果使用CDN，配置assetPrefix
  // assetPrefix: 'https://your-cdn.com',
  
  // 优化静态导出
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 静态导出时的webpack配置优化
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 客户端优化
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
}

export default nextConfig
