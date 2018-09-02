import SGitP from 'simple-git/promise'
// import SGit from 'simple-git'
import fs from 'fs-extra'
import config from '../common/conf.js'
import path from 'path'
import Utils from '../common/utils'

const { cacheRoot, testRoot, publishRoot } = config
const {getRepoName, log} = Utils

async function updateRepo (projectDir) {
    log.info('开始从git拉取更新')
    const git = SGitP(projectDir)
    let resInfo = await git.pull('origin', 'master')
    log.info('从git拉取更新:', resInfo)
}

async function ensureGitRepo(projectDir, repository) {
    let resInfo = ''
    fs.ensureDirSync(projectDir)
    log.info('检查项目目录是否存在:', projectDir)
    const git = SGitP(projectDir)
    resInfo = await git.checkIsRepo()
    log.info('检查是否是git目录:', resInfo)
    if (!resInfo) {
        await git.init()
        await git.addRemote('origin', repository)   
    }
    return '完成项目路径检测'
}

function writeToCaches(param) {
    const { root, repository, project } = param
    const projectPath = path.resolve(cacheRoot, root)
    // 确认项目文件夹存在
    fs.ensureDirSync(projectPath)

    // if (fs.pathExistsSync(projectPath)) {
    //     const git = SGitP(projectPath)
    // } else {
    //     SGitP(cacheRoot).clone(repository)
    //     .then(res => {
    //         log.info('clone-res:', res)
    //     })
    //     .catch(err => log.info('clone-err:', err))
    // }
}

export default async function (param) {
    const { root, repository, project } = param
    const publishProjectPath = path.resolve(cacheRoot, root)
    const testRootPath = path.resolve(testRoot, root)
    const repoName = getRepoName(repository)
    const projectPath = path.resolve(publishRoot, repoName) 
    await ensureGitRepo(projectPath, repository)
    await updateRepo(projectPath)
}
