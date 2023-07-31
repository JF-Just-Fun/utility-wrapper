#!/usr/bin/env node
const childProcess = require('child_process');
// 获取当前版本号
const packageJSON = require('../package.json');

const currentVersion = packageJSON.version;
const repository = packageJSON.repository.url;

// 查看远程仓库上的最新版本号
const latestVersion = childProcess.execSync(`npm show ${repository} version`).toString().trim();

// 比较版本号
if (currentVersion === latestVersion) {
  // 版本一致，不能执行push操作
  console.log('\nThe local version is already up to date. please update package version before push!\n');
  process.exit(1)
}
