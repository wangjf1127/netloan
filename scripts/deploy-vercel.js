#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Vercel部署助手 (GitLab版)\n');

// 检查是否安装了Vercel CLI
function checkVercelCLI() {
  return new Promise((resolve) => {
    const check = spawn('vercel', ['--version'], { stdio: 'pipe', shell: true });
    check.on('close', (code) => {
      resolve(code === 0);
    });
  });
}

// 安装Vercel CLI
function installVercelCLI() {
  return new Promise((resolve, reject) => {
    console.log('📦 安装Vercel CLI...');
    const install = spawn('npm', ['install', '-g', 'vercel'], {
      stdio: 'inherit',
      shell: true
    });
    
    install.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Vercel CLI安装成功');
        resolve();
      } else {
        reject(new Error('Vercel CLI安装失败'));
      }
    });
  });
}

// 检查项目配置
function checkProjectConfig() {
  const requiredFiles = [
    'next.config.mjs',
    'vercel.json',
    'package.json'
  ];
  
  const missingFiles = requiredFiles.filter(file => 
    !fs.existsSync(path.join(process.cwd(), file))
  );
  
  if (missingFiles.length > 0) {
    console.error('❌ 缺少必要的配置文件:');
    missingFiles.forEach(file => console.error(`   - ${file}`));
    return false;
  }
  
  console.log('✅ 项目配置检查通过');
  return true;
}

// 构建项目
function buildProject() {
  return new Promise((resolve, reject) => {
    console.log('🔨 构建项目...');
    const build = spawn('npm', ['run', 'build'], {
      stdio: 'inherit',
      shell: true
    });
    
    build.on('close', (code) => {
      if (code === 0) {
        console.log('✅ 项目构建成功');
        resolve();
      } else {
        reject(new Error('项目构建失败'));
      }
    });
  });
}

// 部署到Vercel
function deployToVercel(isProduction = false) {
  return new Promise((resolve, reject) => {
    const args = isProduction ? ['--prod'] : [];
    console.log(`🚀 部署到Vercel ${isProduction ? '(生产环境)' : '(预览环境)'}...`);
    
    const deploy = spawn('vercel', args, {
      stdio: 'inherit',
      shell: true
    });
    
    deploy.on('close', (code) => {
      if (code === 0) {
        console.log('✅ 部署成功！');
        resolve();
      } else {
        reject(new Error('部署失败'));
      }
    });
  });
}

// 主函数
async function main() {
  try {
    // 检查项目配置
    if (!checkProjectConfig()) {
      process.exit(1);
    }
    
    // 检查Vercel CLI
    const hasVercelCLI = await checkVercelCLI();
    if (!hasVercelCLI) {
      await installVercelCLI();
    } else {
      console.log('✅ Vercel CLI已安装');
    }
    
    // 构建项目
    await buildProject();
    
    // 询问部署类型
    const args = process.argv.slice(2);
    const isProduction = args.includes('--prod') || args.includes('-p');
    
    // 部署
    await deployToVercel(isProduction);
    
    console.log('\n🎉 部署完成！');
    console.log('\n📋 后续步骤:');
    console.log('1. 访问Vercel控制台查看部署状态');
    console.log('2. 在GitLab中配置CI/CD变量（如需要）');
    console.log('3. 配置自定义域名（如需要）');
    console.log('4. 设置环境变量（如需要）');
    console.log('5. 配置GitLab Webhook（如需要）');
    
  } catch (error) {
    console.error('\n❌ 部署失败:', error.message);
    console.log('\n🔧 故障排除:');
    console.log('1. 检查网络连接');
    console.log('2. 确认Vercel账号权限');
    console.log('3. 检查项目配置文件');
    console.log('4. 查看构建日志: vercel logs');
    process.exit(1);
  }
}

// 显示帮助信息
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Vercel部署助手');
  console.log('\n用法:');
  console.log('  node scripts/deploy-vercel.js          # 部署到预览环境');
  console.log('  node scripts/deploy-vercel.js --prod   # 部署到生产环境');
  console.log('  node scripts/deploy-vercel.js --help   # 显示帮助');
  console.log('\n或使用npm脚本:');
  console.log('  npm run vercel:deploy                  # 部署到生产环境');
  process.exit(0);
}

main();
