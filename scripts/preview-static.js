#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'out');

// 检查构建文件是否存在
if (!fs.existsSync(outDir)) {
  console.log('❌ 静态文件不存在，请先运行构建命令:');
  console.log('   npm run build:static');
  console.log('   或者');
  console.log('   node scripts/build-static.js');
  process.exit(1);
}

console.log('🌐 启动静态文件预览服务器...\n');

// 检查是否安装了serve
const checkServe = spawn('npx', ['serve', '--version'], {
  stdio: 'pipe',
  shell: true
});

checkServe.on('close', (code) => {
  if (code === 0) {
    startServer();
  } else {
    console.log('📦 安装serve包...');
    const installServe = spawn('npm', ['install', '-g', 'serve'], {
      stdio: 'inherit',
      shell: true
    });
    
    installServe.on('close', (installCode) => {
      if (installCode === 0) {
        startServer();
      } else {
        console.error('❌ 安装serve失败');
        process.exit(1);
      }
    });
  }
});

function startServer() {
  console.log('🚀 启动预览服务器...');
  
  const serverProcess = spawn('npx', ['serve', 'out', '-s'], {
    stdio: 'inherit',
    shell: true
  });
  
  console.log('\n✅ 预览服务器已启动！');
  console.log('🌐 访问地址: http://localhost:3000');
  console.log('📁 服务目录: ./out');
  console.log('\n💡 提示:');
  console.log('   - 按 Ctrl+C 停止服务器');
  console.log('   - 修改代码后需要重新构建');
  console.log('   - 这是静态文件预览，与生产环境一致');
  
  serverProcess.on('error', (error) => {
    console.error('❌ 服务器启动失败:', error);
  });
  
  // 处理进程退出
  process.on('SIGINT', () => {
    console.log('\n🛑 正在停止预览服务器...');
    serverProcess.kill('SIGINT');
    process.exit(0);
  });
}
