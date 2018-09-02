import Router from 'koa-router'
import utils from '../../common/utils'

let router = new Router();
let {success, error, unauthorized, notFound} = utils.response;

function sendResponse(ctx, body) {
    ctx.body = body
}

// 前置处理
router.all('/*', (ctx, next) => {
    ctx.type = 'application/json; charset=utf-8'
    ctx.body = {
        status: 0,
        data: {},
        message: ''
    }
    next()
})

router.post('/deploy', (ctx, next) => {
    console.log(ctx.request.body)
    console.log(ctx.request.query)
    sendResponse(ctx, success())
})

router.all('/404', (ctx, next) => sendResponse(ctx, notFound()))

router.all('/*', (ctx, next) => {
    ctx.redirect('/404')
    next()
})

export default router.routes()