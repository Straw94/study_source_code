const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const templateLists = require("../templates");

const utils = require('./util');

// templates 列表
const templateMapList = new Map();
// 读取templates 列表
const mapTemplate = (tem) => tem.list.map(item => templateMapList.set(item.name, item));

const generator = function *(name) {
        let tempName  = name;
        let template = templateMapList.get(name);
        if(templateMapList.has(tempName)) {
                console.log('    ----------------------------------------');
                let name, projectName, author, version, description, license = null;
                name = yield prompt(`    name(${tempName}):`)
                // projectName = yield prompt(`    projectName(${tempName}):`);

                // 本地的项目可以改变作者信息，版本号
                if(template.type === 'local') {
                  author = yield prompt(`    author:`);
                  version = yield prompt(`    version(1.0.0):`);
                }
                description = yield prompt(`    description:`);
                license = yield prompt(`    license:`);

                if(!name) name = tempName;
                // if(!projectName) projectName = tempName;
                if(!version) projectName = `1.0.0`;

                const params = {
                  name,
                  version,
                  // projectName,
                  ...author && { author },
                  ...license && { license },
                  ...description && { description },
                }

                console.log('    ----------------------------------------');
                utils.downloadTemplates(template, params);

        } else {
                console.log(chalk.red(`   ✘模版[${tempName}]不存在`))
                process.exit(0);
        }
}


module.exports = function(name) {
    mapTemplate(templateLists);
    co(generator(name));
}