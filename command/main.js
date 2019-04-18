const program = require("commander");
const inquirer = require("inquirer");
const pkg = require('../package.json');
const init = require('../chili/init');
// step1 询问使用哪一类的核心处理器

// 读取配置文件

program
  .version(pkg.version, "-v, --version")
  .command("init")
  .alias("i")
  .description("generator chili api toolkits.")
  .arguments("<path>")
  .action((path) => {
    const promps = [];
    promps.push({
      type: "list",
      name: "kernal",
      message: "请选择 api 请求处理器？",
      choices: [
        {
          name: "fetch compatible",
          value: "fetch"
        },
        {
          name: "wechat compatible",
          value: "wechat"
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
  })

program.parse(process.argv);


