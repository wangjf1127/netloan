#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 深度清理开发环境...');

try {
  // 清理 .next 目录
  const nextDir = path.join(process.cwd(), '.next');
  if (fs.existsSync(nextDir)) {
    console.log('删除 .next 目录...');
    fs.rmSync(nextDir, { recursive: true, force: true });
  }

  // 清理 node_modules/.cache
  const cacheDir = path.join(process.cwd(), 'node_modules', '.cache');
  if (fs.existsSync(cacheDir)) {
    console.log('删除缓存目录...');
    fs.rmSync(cacheDir, { recursive: true, force: true });
  }

  // 清理临时文件
  const tempDirs = [
    path.join(process.cwd(), 'node_modules', '.vite'),
    path.join(process.cwd(), 'node_modules', '.turbo'),
    path.join(process.cwd(), '.turbo'),
  ];

  tempDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`删除 ${path.basename(dir)} 目录...`);
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  // 强制垃圾回收
  if (global.gc) {
    console.log('执行垃圾回收...');
    global.gc();
  }

  console.log('✅ 深度清理完成！');
  console.log('💡 建议：重启终端后运行 npm run dev');

} catch (error) {
  console.error('❌ 清理过程中出现错误:', error.message);
  console.log('💡 请手动删除 .next 目录后重试');
}
