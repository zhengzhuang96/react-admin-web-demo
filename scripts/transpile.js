/*
 * @Author: {zhengzhuang}
 * @Date: 2023-06-06 11:38:32
 * @LastEditors: {zhengzhuang}
 * @LastEditTime: 2023-06-06 14:14:24
 * @Description: 子模块单独tsc打包
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const libPath = path.resolve(process.cwd(), "./lib"); // lib 目录的路径

// 清空 lib 目录
function cleanLibDirectory() {
  return new Promise((resolve, reject) => {
    function deleteDirectory(dirPath) {
      if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file) => {
          const currentPath = path.join(dirPath, file);
          if (fs.lstatSync(currentPath).isDirectory()) {
            deleteDirectory(currentPath); // 递归删除子目录
          } else {
            fs.unlinkSync(currentPath); // 删除文件
          }
        });
        fs.rmdirSync(dirPath); // 删除当前目录
      }
    }
    // 删除整个 lib 目录
    deleteDirectory(libPath);

    resolve();
  });
}

// 执行 tsc 命令进行打包
function runTsc() {
  return new Promise((resolve, reject) => {
    try {
      execSync("tsc", { stdio: "inherit" });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const packagePath = path.resolve(process.cwd(), "package.json"); // package.json 文件的路径

// 读取并解析 package.json 文件
function getPackageName() {
  try {
    const packageData = fs.readFileSync(packagePath, 'utf8');
    const packageJson = JSON.parse(packageData);
    return packageJson.name;
  } catch (error) {
    console.error('Error occurred while reading package.json:', error);
    throw error;
  }
}

// 主函数，按顺序执行清空目录和 tsc 打包操作
async function main() {
  try {
    // 获取包名
    const packageName = getPackageName();
    console.log(`正在 typescript 编译 ${packageName} 模块...`)
    await cleanLibDirectory();

    // 延时一下
    setTimeout(async () => {
      await runTsc();
      console.log(`typescript 编译 ${packageName} 模块完成`)
    }, 1000);
  } catch (error) {
    console.error("Error occurred:", error);
    process.exit(1);
  }
}

// 执行主函数
main();
