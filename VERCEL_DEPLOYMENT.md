# 🚀 Vercel 部署指南

本指南将帮助您将项目部署到Vercel平台。

## 📋 部署前准备

### 1. 安装Vercel CLI（可选）
```bash
npm install -g vercel
```

### 2. 检查项目配置
确保以下文件已正确配置：
- ✅ `next.config.mjs` - Next.js配置
- ✅ `vercel.json` - Vercel部署配置
- ✅ `package.json` - 包含正确的构建脚本

## 🌐 方式一：通过Vercel网站部署（推荐）

### 1. 准备Git仓库
```bash
# 如果还没有Git仓库
git init
git add .
git commit -m "Initial commit"

# 推送到GitHub/GitLab/Bitbucket
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### 2. 连接Vercel
1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub/GitLab/Bitbucket账号登录
3. 点击 "New Project"
4. 选择您的仓库
5. 配置项目设置：
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 3. 环境变量配置
在Vercel项目设置中添加环境变量：
```
NEXT_PUBLIC_APP_NAME=互联网信贷
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=production
```

### 4. 部署
点击 "Deploy" 按钮，Vercel会自动：
- 安装依赖
- 构建项目
- 部署到全球CDN
- 提供HTTPS域名

## 🖥️ 方式二：通过CLI部署

### 1. 登录Vercel
```bash
vercel login
```

### 2. 初始化项目
```bash
vercel
```
按照提示配置项目设置。

### 3. 部署到生产环境
```bash
vercel --prod
```

## ⚙️ 高级配置

### 1. 自定义域名
1. 在Vercel项目设置中点击 "Domains"
2. 添加您的域名
3. 配置DNS记录：
   ```
   Type: CNAME
   Name: www (或 @)
   Value: cname.vercel-dns.com
   ```

### 2. 环境变量管理
```bash
# 添加环境变量
vercel env add NEXT_PUBLIC_APP_NAME

# 列出环境变量
vercel env ls

# 删除环境变量
vercel env rm NEXT_PUBLIC_APP_NAME
```

### 3. 预览部署
每次推送到非主分支时，Vercel会自动创建预览部署：
```bash
# 创建预览分支
git checkout -b feature/new-feature
git push origin feature/new-feature
```

## 🔧 项目特定配置

### 1. 路由配置
项目使用Next.js App Router，Vercel会自动处理：
- 动态路由：`[id]`
- 嵌套路由：`customers/[id]/loan-records`
- 客户端路由：自动支持

### 2. 静态资源
```
public/
├── images/           # 图片资源
├── favicon.ico       # 网站图标
└── ...
```

### 3. API路由（如果添加）
如果将来添加API路由，放在 `app/api/` 目录下：
```
app/api/
├── users/
│   └── route.ts
└── auth/
    └── route.ts
```

## 📊 性能优化

### 1. 图片优化
Vercel自动优化图片，支持：
- WebP格式转换
- 响应式图片
- 懒加载

### 2. 缓存策略
```javascript
// next.config.mjs 中已配置
headers: [
  {
    source: '/_next/static/(.*)',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable'
      }
    ]
  }
]
```

### 3. 代码分割
Next.js自动进行代码分割，Vercel优化：
- 按页面分割
- 动态导入
- 树摇优化

## 🔍 监控和分析

### 1. Vercel Analytics
在项目设置中启用Analytics：
```bash
npm install @vercel/analytics
```

在 `app/layout.tsx` 中添加：
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. 性能监控
Vercel提供内置的性能监控：
- Core Web Vitals
- 页面加载时间
- 用户体验指标

## 🚨 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 本地测试构建
   npm run build
   
   # 检查构建日志
   vercel logs
   ```

2. **环境变量问题**
   ```bash
   # 检查环境变量
   vercel env ls
   
   # 重新部署
   vercel --prod --force
   ```

3. **路由404错误**
   - 检查 `vercel.json` 中的rewrites配置
   - 确保文件名和路由匹配

### 调试命令
```bash
# 查看部署日志
vercel logs

# 查看项目信息
vercel ls

# 查看域名配置
vercel domains ls

# 本地开发（模拟Vercel环境）
vercel dev
```

## 🎯 最佳实践

### 1. 分支策略
- `main` 分支 → 生产环境
- `develop` 分支 → 预览环境
- `feature/*` 分支 → 功能预览

### 2. 环境管理
- 开发环境：本地 + `.env.local`
- 预览环境：Vercel预览 + 预览环境变量
- 生产环境：Vercel生产 + 生产环境变量

### 3. 部署流程
1. 本地开发和测试
2. 推送到功能分支（自动预览部署）
3. 代码审查
4. 合并到主分支（自动生产部署）

## 📞 支持资源

- [Vercel文档](https://vercel.com/docs)
- [Next.js部署指南](https://nextjs.org/docs/deployment)
- [Vercel CLI文档](https://vercel.com/docs/cli)
- [Vercel社区](https://github.com/vercel/vercel/discussions)

## 🎉 部署完成

部署成功后，您将获得：
- 🌐 全球CDN加速的网站
- 🔒 自动HTTPS证书
- 📊 性能监控和分析
- 🚀 自动部署和预览
- 📱 移动端优化

访问您的网站：`https://your-project.vercel.app`
