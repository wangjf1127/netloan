# 🦊 GitLab + Vercel 部署指南

本指南将帮助您将项目从GitLab部署到Vercel平台。

## 📋 部署前准备

### 1. GitLab仓库准备
确保您的代码已推送到GitLab：
```bash
# 如果还没有GitLab仓库
git init
git add .
git commit -m "Initial commit"

# 添加GitLab远程仓库
git remote add origin https://gitlab.com/your-username/your-repo.git
git push -u origin main
```

### 2. 获取必要的Token

#### Vercel Token
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击右上角头像 → Settings
3. 左侧菜单选择 "Tokens"
4. 点击 "Create Token"
5. 输入名称（如：gitlab-ci）
6. 选择 Scope（推荐：Full Account）
7. 复制生成的token

#### GitLab Token（用于CI/CD评论）
1. 访问 GitLab项目设置
2. 左侧菜单选择 "Access Tokens"
3. 创建项目访问令牌
4. 权限选择：api, read_api, write_repository
5. 复制生成的token

## 🚀 部署方式

### 方式一：Vercel网站集成（推荐）

#### 1. 连接GitLab到Vercel
1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 如果没有看到GitLab选项，点击 "Configure Git Integration"
5. 选择 "GitLab" 并授权连接
6. 选择您的GitLab仓库

#### 2. 配置项目设置
- **Framework Preset**: Next.js（自动检测）
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node.js Version**: 18.x

#### 3. 环境变量配置
在Vercel项目设置中添加：
```
NEXT_PUBLIC_APP_NAME=互联网信贷
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=production
```

#### 4. 部署设置
- **Production Branch**: main
- **Preview Branches**: develop, feature/*
- **Auto-deploy**: 启用

### 方式二：CLI手动部署

#### 1. 安装Vercel CLI
```bash
npm install -g vercel
```

#### 2. 登录并初始化
```bash
vercel login
vercel
```

#### 3. 部署
```bash
# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod
```

### 方式三：GitLab CI/CD自动部署

#### 1. 配置GitLab CI/CD变量
在GitLab项目中设置以下变量：

**项目设置 → CI/CD → Variables**

| 变量名 | 值 | 类型 | 说明 |
|--------|----|----|------|
| `VERCEL_TOKEN` | your-vercel-token | Masked | Vercel API Token |
| `VERCEL_ORG_ID` | your-org-id | Variable | Vercel组织ID |
| `VERCEL_PROJECT_ID` | your-project-id | Variable | Vercel项目ID |
| `GITLAB_TOKEN` | your-gitlab-token | Masked | GitLab API Token |

#### 2. 获取Vercel项目信息
```bash
# 在本地项目目录运行
vercel link

# 查看.vercel/project.json文件获取ID
cat .vercel/project.json
```

#### 3. CI/CD流程说明
- **测试阶段**: 代码检查和构建测试
- **预览部署**: MR时手动触发预览部署
- **生产部署**: main分支自动部署到生产环境

## ⚙️ 分支策略配置

### 推荐的Git Flow
```
main          # 生产环境分支
├── develop   # 开发环境分支
└── feature/* # 功能分支
```

### Vercel环境映射
- `main` → 生产环境 (your-project.vercel.app)
- `develop` → 预览环境 (your-project-git-develop.vercel.app)
- `feature/*` → 功能预览 (your-project-git-feature-name.vercel.app)

## 🔧 高级配置

### 1. 自定义域名
1. 在Vercel项目设置中添加域名
2. 配置DNS记录：
   ```
   Type: CNAME
   Name: www (或 @)
   Value: cname.vercel-dns.com
   ```

### 2. 环境变量管理
```bash
# 通过CLI管理环境变量
vercel env add NEXT_PUBLIC_API_URL production
vercel env add NEXT_PUBLIC_API_URL preview
vercel env add NEXT_PUBLIC_API_URL development
```

### 3. 部署钩子
在GitLab项目设置中配置Webhook：
- URL: `https://api.vercel.com/v1/integrations/deploy/[deployment-id]`
- 触发事件: Push events, Merge request events

## 📊 监控和分析

### 1. Vercel Analytics
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
- Core Web Vitals
- 页面加载时间
- 用户体验指标
- 错误追踪

## 🚨 故障排除

### 常见问题

#### 1. GitLab连接失败
```bash
# 检查GitLab访问权限
git remote -v
git push origin main
```

#### 2. Vercel构建失败
```bash
# 本地测试构建
npm run build

# 检查构建日志
vercel logs
```

#### 3. 环境变量问题
```bash
# 检查Vercel环境变量
vercel env ls

# 检查GitLab CI变量
# 在GitLab项目设置中查看CI/CD变量
```

#### 4. CI/CD Pipeline失败
- 检查GitLab CI/CD变量是否正确设置
- 确认VERCEL_TOKEN有足够权限
- 查看Pipeline日志定位具体错误

### 调试命令
```bash
# 查看Vercel部署日志
vercel logs

# 查看GitLab CI日志
# 在GitLab项目的CI/CD → Pipelines中查看

# 本地模拟Vercel环境
vercel dev
```

## 🎯 最佳实践

### 1. 分支保护
在GitLab项目设置中配置：
- 保护main分支
- 要求MR审核
- 要求CI通过

### 2. 部署策略
- 开发 → develop分支 → 预览环境
- 测试通过 → MR到main → 生产环境
- 紧急修复 → hotfix分支 → 直接生产

### 3. 环境管理
- 开发环境：本地 + `.env.local`
- 预览环境：Vercel预览 + 预览环境变量
- 生产环境：Vercel生产 + 生产环境变量

## 📞 支持资源

- [Vercel GitLab集成文档](https://vercel.com/docs/git/gitlab)
- [GitLab CI/CD文档](https://docs.gitlab.com/ee/ci/)
- [Next.js部署指南](https://nextjs.org/docs/deployment)
- [Vercel CLI文档](https://vercel.com/docs/cli)

## 🎉 部署完成检查清单

### 基础配置
- [ ] GitLab仓库已创建并推送代码
- [ ] Vercel项目已创建并连接GitLab
- [ ] 环境变量已正确配置
- [ ] CI/CD Pipeline正常运行

### 功能验证
- [ ] 网站可以正常访问
- [ ] 所有页面路由正常
- [ ] 响应式设计正常
- [ ] 自动部署正常工作

### 高级功能
- [ ] 自定义域名配置（如需要）
- [ ] 分析工具集成（如需要）
- [ ] 监控告警设置（如需要）
- [ ] 团队权限配置（如需要）

恭喜！您的项目现在已经成功配置了GitLab + Vercel的完整部署流程！
