const program = require("commander");
const inquirer = require("inquirer");
const pkg = require("../package.json");
const init = require("../chili/init");
// step1 询问使用哪一类的核心处理器

// 读取配置文件

program
  .version(pkg.version, "-v, --version")
  .command("init")
  .alias("i")
  .description("generator chili api toolkits.")
  .arguments("<path>")
  .action(path => {
    const promps = [];
    promps.push({
      type: "list",
      name: "environment",
      message: "请选择项目环境？",
      choices: [
        {
          name: "浏览器",
          value: "browser"
        },
        {
          name: "微信小程序",
          value: "wx"
        }
      ]
    });
    promps.push({
      type: "list",
      name: "language",
      message: "请选择项目语言？",
      choices: [
        {
          name: "typescript",
          value: "ts"
        },
        {
          name: "javascript",
          value: "js"
        }
      ]
    });
    inquirer.prompt(promps).then(function(answers) {
      if (typeof path === "undefined") {
        // console.error("no path given!");
        process.exit(1);
      }
      // 执行具体函数
      init(answers, path);
    });
  });

program.parse(process.argv);
