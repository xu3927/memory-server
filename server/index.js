import Koa from "koa";
import logger from 'koa-logger'
import json from 'koa-json'
import router from './router/index'
import bodyParser from 'koa-body-parser'
import session from 'koa-session'
import DAO from '../dao/index'
import utils from '../common/utils'
const {getMember} = DAO.member
const {log} = utils

const app = new Koa()
const port = 5000

app.keys = ['sceret'];

const CONFIG = {
    key: 'uid:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  };

// 使用session
app.use(session(CONFIG, app));

app.use(logger())
app.use(json())
app.use(bodyParser())


let sendResponse = {
    sendSuccess(body) {
        body = body || {}
        console.log('sendSuccess:', body)
        this.body = Object.assign({}, {
            status: 0,
            data: null,
            message: 'Sucesss'
        }, body)
    },
    sendError(body) {
        body = body || {}
        this.body = Object.assign({}, {
            status: 1,
            data: null,
            message: 'Error'
        }, body)
    },
    sendUnauthorized(body){
        body = body || {}
        this.body = Object.assign({}, {
            status: 401,
            data: null,
            message: 'Unauthorized'
        }, body)
    },
    sendNotFound (body) {
        body = body || {}
        this.body = Object.assign({}, {
            status: 404,
            data: null,
            message: 'Not Found'
        }, body)
    }
}

Object.assign(app.context, sendResponse)


// 登录验证
app.use(async (ctx, next) => {
    let uid = ctx.cookies.get('uid')
    log.info('uid:', uid)
    if (!ctx.path.includes('api/login')) {
        if (uid) {
            let user = await getMember({user_name: uid})
            if (user) {
                ctx.state.user = user && user[0]
                await next()
            } else {
                ctx.sendUnauthorized()
            }
        } else {
            ctx.sendUnauthorized()
        }
    } else {
        await next()
    }
})


app.use(async (ctx, next) => {
    // ignore path favicon
    if (ctx.path === '/favicon.ico') return;
    log.info('session:', ctx.session)

    let n = ctx.session.views || 0;
    // 设置session
    ctx.session.views = ++n;
    
    await next()
});  

app.use(router.routes())
app.listen(port, res => console.log('服务启动, 监听' + port));