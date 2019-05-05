/*
 * @Description: 初始化函数
 * @Author: Ben
 * @LastEditors: Ben
 * @Date: 2019-04-18 12:08:35
 * @LastEditTime: 2019-05-05 16:02:47
 */
const fs = require("fs");
const path = require("path");
const utils = require("../utils");

module.exports = function init(answers, target) {
  const targetRoot = path.resolve(utils.root, `${target}/chili`);
  // step2 生成 chili 目录
  if (!utils.checkDirExist(targetRoot)) {
    // 目录不存在，则生成目录
    fs.mkdirSync(targetRoot, 0755);
  }
  const chiliRoot = path.resolve(
    __dirname,
    `../chili/${answers.environment}/${answers.language}`
  );
  // step3 复制 index.js api_config.js api_middle.js 文件
  const files = fs.readdirSync(chiliRoot);
  files.filter(file => {
    return !/init/.test(file);
  }).map(file => {
    const content = fs.readFileSync(path.resolve(chiliRoot, file));
    // 写入文件
    fs.writeFileSync(path.join(targetRoot, file), content, "utf8");
  });
};
