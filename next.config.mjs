/** @type {import('next').NextConfig} */
const isStatic = process.env.NEXT_CONFIG === 'static'

const nextConfig = isStatic ? {
  // 静态导出配置
  output: 'export',

  // 禁用图片优化（静态导出必需）
  images: {
    unoptimized: true,
  },

  // 生成静态HTML文件时的配置
  trailingSlash: true,

  // 如果部署到GitHub Pages或其他子目录，配置basePath
  basePath: '/netloan',

  // 如果使用CDN，配置assetPrefix
  assetPrefix: '/netloan',

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
} : {
  // Vercel部署优化配置
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // 图片优化配置（Vercel支持）
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // 为了避免构建问题，暂时禁用图片优化
    unoptimized: true,
  },

  // 构建优化
  swcMinify: true,

  // 压缩配置
  compress: true,

  // 开发和构建配置
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // 重定向配置（如果需要）
  async redirects() {
    return [
      // 示例：重定向旧路径到新路径
      // {
      //   source: '/old-path',
      //   destination: '/new-path',
      //   permanent: true,
      // },
    ]
  },

  // 头部配置（安全和性能）
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ]
  },
}

export default nextConfig
