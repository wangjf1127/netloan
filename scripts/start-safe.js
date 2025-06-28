#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 启动安全模式开发服务器...');

// 清理函数
function cleanup() {
  console.log('🧹 清理缓存...');
  
  const dirsToClean = [
    '.next',
    'node_modules/.cache',
    'node_modules/.vite',
    '.turbo'
  ];
  
  dirsToClean.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (fs.existsSync(fullPath)) {
      console.log(`删除 ${dir}...`);
      try {
        fs.rmSync(fullPath, { recursive: true, force: true });
      } catch (error) {
        console.log(`无法删除 ${dir}: ${error.message}`);
      }
    }
  });
}

// 启动服务器
function startServer() {
  console.log('🔄 启动Next.js开发服务器...');
  
  const child = spawn('npm', ['run', 'dev:minimal'], {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=8192 --max-semi-space-size=1024'
    }
  });
  
  child.on('error', (error) => {
    console.error('❌ 启动失败:', error);
    process.exit(1);
  });
  
  child.on('exit', (code) => {
    if (code !== 0) {
      console.log(`⚠️ 服务器退出，代码: ${code}`);
    }
  });
  
  // 处理进程退出
  process.on('SIGINT', () => {
    console.log('\n🛑 正在停止服务器...');
    child.kill('SIGINT');
    process.exit(0);
  });
}

// 主流程
async function main() {
  try {
    cleanup();
    
    // 等待一下让清理完成
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    startServer();
    
  } catch (error) {
    console.error('❌ 启动过程出错:', error);
    console.log('💡 请尝试手动运行: npm run dev:prod');
    process.exit(1);
  }
}

main();
