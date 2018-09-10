import execa from 'execa'
import fs from 'fs-extra'
import log4js from "log4js";
import conf from "./conf";

log4js.configure(conf.log4js);
const loogger  = log4js.getLogger()

// Log Level 级别顺序 ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'dev') {
    loogger.level = 'debug'
}

const Utils = {    
    log: loogger,
    exec (command, options) {
        return execa.shell(command, options)
    },
    isPathExist (path) {
        return fs.pathExistsSync(path)
    },
    getRepoName (path) {
        let repoName = /\/(.+)?\.git$/.exec(path)
        return repoName && repoName[1] || ''
    },
    parsePage (pageObj) {
        let {pageNo = 1, pageSize = 10, total = 0} = pageObj
        return {
            pageNo: pageNo,
            pageSize,
            total,
            totalPage: Math.ceil(total / pageSize)
        }
    }
}

export default Utils