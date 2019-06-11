const fs = require('fs');
const co = require('co');
const path = require('path');
const chalk = require('chalk');
const oraSpanner = require('ora');
const handlebars = require('handlebars');
const download = require('download-git-repo');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const access = promisify(fs.access);

const { resolve } = path;
const PATHS = process.cwd();

// 动画 正在构建中
const startSpanner = (words) => {const spanner = oraSpanner(words); spanner.start(); return spanner};

// 模版下载
const downloadTemplates = (template, params) => {
        const address = template.path;
        const type = template.type;
        const { name, ...interim } = params;

        let spanner = startSpanner("   正在构建，客官請稍等......");
        if(type === 'git') return gitDownload(address, name, spanner, interim);
        if(type === 'local') return localDownload(address, name, spanner, interim);
}

// git仓库下载
const gitDownload = (gitAddress, projectName, spanner, params) => {
  download(gitAddress, `${PATHS}/${projectName}`, function(err) {
    if(err) {
      return buildFail(spanner, err);
    }
    // 重写package.json
    reWrite(`${PATHS}/${projectName}/package.json`, params);
    // 构建成功
    startBuildProject(spanner)
  })
};

// 本地下载
const localDownload = (address, projectName, spanner, params) => {
  const realSrc = resolve(__dirname, `../${address}`);
  co(copyTemplate(realSrc, `${PATHS}/${projectName}`, copy)).then(() => {
    // 重写package.json
    reWrite(`${PATHS}/${projectName}/package.json`, params);

    startBuildProject(spanner);
  }).catch(e => {
    buildFail(spanner, e)
  })
};

// 重写package.json
const reWrite = (path, params) => {
  console.log(path)
  if(fs.existsSync(path)) {
    const content = fs.readFileSync(path).toString();
    let dt = JSON.parse(content);
    for(let i in params) {
      console.log(i)
      dt[i] = `{{${i}}}`;
    }
    const result = handlebars.compile(JSON.stringify(dt, null, 2))(params);
    fs.writeFileSync(path, result);
  };
}

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

// 拷贝
const copy = function *(src, dst) {
    const paths = fs.readdirSync(src);
    for(let ind in paths) {
      const path = paths[ind];
      const _src = `${src}/${path}`;
      const _dst = `${dst}/${path}`;
      try {
        const stats = yield stat(_src);
        if(stats.isFile()) {
            const readable = fs.createReadStream(_src, { encoding: 'utf8' });
            const writable = fs.createWriteStream(_dst, { encoding: 'utf8' });
            yield new Promise((res) => {
              try {
                readable.pipe(writable).on('close', () => res());
              } catch(e) {
                res();
              }
            })
        }else if(stats.isDirectory()) {
            yield copyTemplate(_src, _dst, copy);
        }
      } catch(e) {
        throw e
      }
    }
}

// 拷贝
const copyTemplate = function *(src, dst, callback) {
    try {
      yield access(dst, fs.constants.F_OK);
    } catch(e) {
      fs.mkdirSync(dst)
    }
    yield callback(src, dst);
}

module.exports = {
  downloadTemplates,
}













