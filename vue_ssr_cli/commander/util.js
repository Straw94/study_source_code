const fs = require('fs');
const co = require('co');
const path = require('path');
const chalk = require('chalk');
const oraSpanner = require('ora');
const download = require('download-git-repo');
const promisify = require('util').promisify;

const { resolve } = path;
const PATHS = process.cwd();

// 动画 正在构建中
const startSpanner = (words) => {const spanner = oraSpanner(words); spanner.start(); return spanner};

// 模版下载
const downloadTemplates = (template, params) => {
        const address = template.path;
        const type = template.type;
        const { name } = params;

        let spanner = startSpanner("   正在构建，客官請稍等......");
        if(type === 'git') return gitDownload(address, name, spanner);
        if(type === 'local') return localDownload(address, name, spanner);
}

// git仓库下载
const gitDownload = (gitAddress, projectName, spanner) => {
  download(gitAddress, `${PATHS}/${projectName}`, function(err) {
    if(err) {
      return buildFail(spanner, err);
    }
    // 构建成功
    startBuildProject(spanner)
  })
};

// 本地下载
const localDownload = (address, projectName, spanner) => {
  const realSrc = resolve(__dirname, `../${address}`);
  // try {
  console.log(`${PATHS}/${projectName}`);
  console.log('================');
  const wrapper = (...arg) => {
    copy(...arg);
    startBuildProject(spanner)
  }
  copyTemplate(realSrc, `${PATHS}/${projectName}`, wrapper);
};

// 构建报错
const buildFail = (spanner, err) => {
  spanner.stop();
  console.log('    ','----------------------------------------')
  console.log('    ',chalk('x构建失败'), err);
  process.exit(0);
}

// 构建成功
const startBuildProject = (spanner) => {
    console.log('    ','----------------------------------------')
    console.log('    ',chalk.green('★'),chalk.green('项目构建成功'));
    spanner.stop();
    process.exit(0);
};

const copy = function (src, dst) {
    const paths = fs.readdirSync(src);
    paths.forEach(function (path){
        const _src = `${src}/${path}`;
        const _dst = `${dst}/${path}`;
        fs.stat(_src, (err, stats) => {
          if(err) throw err;
          if(stats.isFile()) {
              const readable = fs.createReadStream(_src);
              const writable = fs.createWriteStream(_dst);
              readable.pipe(writable);
          }else if(stats.isDirectory()) {
              copyTemplate(_src, _dst, copy);
          }
        });
    });
}

const copyTemplate = function (src, dst, callback) {
    fs.access(dst, fs.constants.F_OK, (err) => {
      if(err) {
          fs.mkdirSync(dst);
          callback(src, dst);
      }else {
          callback(src, dst);
      }
    });
}

module.exports = {
  downloadTemplates,
}








