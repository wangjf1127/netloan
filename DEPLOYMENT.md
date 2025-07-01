# 📦 静态文件部署指南

本项目支持导出为静态文件，可以部署到任何静态文件服务器。

## 🚀 快速开始

### 1. 构建静态文件
```bash
# 方式一：使用完整构建脚本（推荐）
npm run build:static:full

# 方式二：使用Next.js原生命令
npm run build:static
```

### 2. 预览静态文件
```bash
npm run preview:static
```

### 3. 部署准备
```bash
npm run deploy:prepare
```

## 📁 输出结构

构建完成后，静态文件将输出到 `./out` 目录：

```
out/
├── index.html              # 首页
├── _next/                  # Next.js资源文件
│   ├── static/            # 静态资源
│   └── ...
├── cases/                  # 案件管理页面
├── customers/              # 客户管理页面
├── credit-management/      # 额度管理页面
└── ...                    # 其他页面
```

## 🌐 部署选项

### 1. Nginx 部署

创建 `nginx.conf`：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/your/out/directory;
    index index.html;

    # 支持SPA路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### 2. Apache 部署

创建 `.htaccess` 文件：

```apache
RewriteEngine On
RewriteBase /

# 支持SPA路由
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# 静态资源缓存
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
</FilesMatch>

# 启用压缩
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### 3. GitHub Pages 部署

如果部署到GitHub Pages，需要配置basePath：

1. 修改 `next.config.mjs`：
```javascript
const nextConfig = {
  output: 'export',
  basePath: '/your-repo-name',  // 替换为您的仓库名
  assetPrefix: '/your-repo-name',
  // ... 其他配置
}
```

2. 创建 `.github/workflows/deploy.yml`：
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build static files
      run: npm run build:static
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

### 4. Vercel 部署

创建 `vercel.json`：

```json
{
  "buildCommand": "npm run build:static",
  "outputDirectory": "out",
  "trailingSlash": true
}
```

### 5. Netlify 部署

创建 `netlify.toml`：

```toml
[build]
  command = "npm run build:static"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## ⚙️ 配置选项

### 自定义basePath（子目录部署）

如果需要部署到子目录，修改 `next.config.mjs`：

```javascript
const nextConfig = {
  output: 'export',
  basePath: '/your-subdirectory',
  assetPrefix: '/your-subdirectory',
  // ... 其他配置
}
```

### CDN配置

如果使用CDN，修改 `next.config.mjs`：

```javascript
const nextConfig = {
  output: 'export',
  assetPrefix: 'https://your-cdn.com',
  // ... 其他配置
}
```

## 🔧 故障排除

### 常见问题

1. **页面刷新404错误**
   - 确保服务器配置了SPA路由支持
   - 检查 `.htaccess` 或 `nginx.conf` 配置

2. **资源文件404错误**
   - 检查 `basePath` 和 `assetPrefix` 配置
   - 确保静态文件路径正确

3. **样式丢失**
   - 确保CSS文件正确加载
   - 检查Content-Type设置

### 调试技巧

1. **本地预览**：
   ```bash
   npm run preview:static
   ```

2. **检查构建输出**：
   ```bash
   ls -la out/
   ```

3. **验证HTML文件**：
   ```bash
   cat out/index.html
   ```

## 📊 性能优化

### 1. 启用压缩
确保服务器启用了gzip压缩

### 2. 设置缓存头
为静态资源设置长期缓存

### 3. 使用CDN
将静态资源部署到CDN

### 4. 图片优化
项目已配置 `images.unoptimized: true`，适合静态部署

## 🎯 最佳实践

1. **构建前清理**：每次构建前清理旧文件
2. **版本控制**：不要将 `out/` 目录提交到版本控制
3. **环境变量**：使用构建时环境变量而非运行时
4. **测试部署**：部署前在本地预览测试
5. **监控**：设置部署后的监控和错误追踪

## 📞 支持

如果遇到部署问题，请检查：
1. Next.js版本兼容性
2. 服务器配置
3. 网络和DNS设置
4. 浏览器控制台错误信息
5. 项目配置文件
