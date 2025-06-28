#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始构建静态文件...\n');

// 检查是否存在out目录，如果存在则删除
const outDir = path.join(process.cwd(), 'out');
if (fs.existsSync(outDir)) {
  console.log('🗑️  清理旧的构建文件...');
  fs.rmSync(outDir, { recursive: true, force: true });
}

// 构建静态文件
console.log('📦 构建Next.js应用...');
const buildProcess = spawn('npm', ['run', 'build:static'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'production'
  }
});

buildProcess.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ 静态文件构建成功！');
    console.log('\n📁 构建输出目录: ./out');
    console.log('\n🌐 预览静态文件:');
    console.log('   npm run preview:static');
    console.log('\n📋 部署说明:');
    console.log('   1. 将 ./out 目录中的所有文件上传到您的静态文件服务器');
    console.log('   2. 确保服务器支持SPA路由（配置fallback到index.html）');
    console.log('   3. 如果部署到子目录，请在next.config.mjs中配置basePath');
    
    // 检查构建结果
    checkBuildResult();
  } else {
    console.error('\n❌ 构建失败，退出代码:', code);
    process.exit(1);
  }
});

buildProcess.on('error', (error) => {
  console.error('❌ 构建过程出错:', error);
  process.exit(1);
});

function checkBuildResult() {
  const outDir = path.join(process.cwd(), 'out');
  
  if (!fs.existsSync(outDir)) {
    console.error('❌ 构建输出目录不存在');
    return;
  }
  
  const files = fs.readdirSync(outDir);
  const htmlFiles = files.filter(file => file.endsWith('.html'));
  const jsFiles = files.filter(file => file.endsWith('.js'));
  const cssFiles = files.filter(file => file.endsWith('.css'));
  
  console.log('\n📊 构建统计:');
  console.log(`   HTML文件: ${htmlFiles.length} 个`);
  console.log(`   JS文件: ${jsFiles.length} 个`);
  console.log(`   CSS文件: ${cssFiles.length} 个`);
  console.log(`   总文件数: ${files.length} 个`);
  
  // 检查关键文件
  const indexExists = fs.existsSync(path.join(outDir, 'index.html'));
  const _nextExists = fs.existsSync(path.join(outDir, '_next'));
  
  if (indexExists && _nextExists) {
    console.log('\n✅ 关键文件检查通过');
  } else {
    console.log('\n⚠️  关键文件检查失败:');
    if (!indexExists) console.log('   - 缺少 index.html');
    if (!_nextExists) console.log('   - 缺少 _next 目录');
  }
}
