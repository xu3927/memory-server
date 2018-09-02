import path from "path";

const homeDir = require('os').homedir;

let config = {
    // 线上静态资源根目录
    publishRoot: path.resolve(homeDir + '/code/assets'),
    // test项目静态资源根目录
    testRoot: path.resolve(homeDir + '/code/assets-test'),
    // 缓存文件的根目录
    cacheRoot: path.resolve(homeDir + '/code/assets-caches'),
    // logLevels 默认是 ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
    log4js: {
        pm2: true,
        appenders: {
            out: { type: 'stdout' }
        },
        categories: { 
            default: { 
                appenders: ['out'], 
                level: 'info' 
            }
        }
    }
}

export default config