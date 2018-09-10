import Router from 'koa-router'
import utils from '../../common/utils'
import DAO from '../../dao/index'

let router = new Router();
const {log, parsePage} = utils
const {getMember, registMember, getAllMembers} = DAO.member
let passwords = DAO.passwords

router.all('*', async (ctx, next) => {
     // query
     log.debug('request-body:', ctx.request.body, 'ctx-query:', ctx.query)
     await next()
})



// TEST 
router.get('/haha', async ctx => {
    const sleep = function () {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                resolve()
            }, 100);
        })
    }
    await sleep
    ctx.sendSuccess({msg: '哈哈哈, 我是哈哈女神'})
})

// 登录
router.post('/api/login', async (ctx, next) => {
    const {user_name, password} = ctx.request.body
    if (user_name && password) {
        let user = {}
        try {
            let data = await getMember({user_name})
            user = data && data[0] && data[0]
        } catch (err) {
            log.error(err)
            ctx.sendError({
                data: null,
                message: err
            })
        }       
        if (user && user.password == password) {
            ctx.cookies.set('uid', user_name, {
                maxAge: 1000 * 3600 * 24
            })
            ctx.sendSuccess({
                data: '登录成功',
                message: '登录成功'
            })
            return;
        } 
    }
    ctx.sendSuccess({
        status: 1,
        data: '用户名或密码错误',
        message: '用户名或密码错误'
    })
})

// 登出
router.post('/api/logout', async (ctx, next) => {
    ctx.session.uid = ''
    ctx.cookies.set('uid', null)
    ctx.sendSuccess({
        data: 'ok',
        message: '已退出'
    })
})

// 注册
router.post('/api/sign-up', async (ctx, next) => {
    const {user_name, password, email, telephone} = ctx.request.body
    if (user_name && password && email) {
        let registRes = null
        try {
            let exits = await getAllMembers({user_name, email, telephone})
            if (exits && exits.length > 0) {
                log.debug('sign-up-exits:', exits)
                ctx.sendError({
                    data: '',
                    message: '用户名, 邮箱或手机号已存在'
                })
                return;
            } else {
                registRes = await registMember({user_name, password, email, telephone})
                log.debug(registRes)
            }
           
        } catch (err) {
            log.error(err)
            ctx.sendError({
                data: null,
                message: err
            })
            return;
        }  
       
        if (registRes) {
            ctx.sendSuccess({
                data: '',
                message: '注册成功'
            })
            return;
        } 
    }
    ctx.sendSuccess({
        status: 1,
        data: '',
        message: '用户信息不完整'
    })
})


// password 管理
// pageNo
// pageSize
// "website": "qq",
// "url": "",
// "user_name": "jane",
// "password": "125432",
// "phone": "1234567",
// "email": "jane@qq.com",
// "other":
/**
 * 获取密码列表
 * 支持的参数
 * pageNo default 1
 * pageSize default 10
 * website string 可选
 * url string 可选
 * user_name: "jane",
 * password: "125432",
 * phone: "1234567",
 * email: "jane@qq.com",
 */
router.get('/api/password/list', async (ctx, next) => {
    let {pageNo = 1, pageSize = 10, ...restParams} = ctx.query
    let ret = await passwords.get({
        pageNo,
        pageSize,
        user_id: ctx.state.user && ctx.state.user.id
    })
    let total = ret[1] && ret[1][0] && ret[1][0].total
    ctx.body = {
        "status": 0, // 0 登陆成功, 1 error
        "data": {
            "list": ret[0],
            "page_info": parsePage({
                pageNo,
                pageSize,
                total: total
            })
        },
        "message": "success" // 提示信息
    }
})

/**
 * 新建密码
 */
router.get('/api/password/list', async (ctx, next) => {
    let {pageNo = 1, pageSize = 10, ...restParams} = ctx.query
    let ret = await passwords.get({
        pageNo,
        pageSize,
        user_id: ctx.state.user && ctx.state.user.id
    })
    let total = ret[1] && ret[1][0] && ret[1][0].total
    ctx.body = {
        "status": 0, // 0 登陆成功, 1 error
        "data": {
            "list": ret[0],
            "page_info": parsePage({
                pageNo,
                pageSize,
                total: total
            })
        },
        "message": "success" // 提示信息
    }
})


router.all('/404', async (ctx, next) => ctx.sendNotFound())

router.all('/*', async (ctx, next) => {
    ctx.redirect('/404')
    await next()
})



export default router