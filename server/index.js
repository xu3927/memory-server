import Koa from "koa";
import logger from 'koa-logger'
import json from 'koa-json'
import router from './middleware/router'
import bodyParser from 'koa-body-parser'
const app = new Koa()
const port = 3000

// http://127.0.0.1:3000/co??v/l/vue.js,v/l/zepto.js
// const combo = require('../lib/koa-static-combo')
// const opts = {
//   assetsPath: path.resolve(__dirname, './assets'),
//   routerReg: /^(\/co)(;.+)?(\?\?)(.+)/i,
//   comboTag: '??',
//   comboDirTag: ';',
//   comboModSplit: ',',
//   maxAge: 60 * 60 * 24 * 365 * 1000
// };

// app.use(combo(opts))
app.use(logger())
app.use(json())
app.use(bodyParser())
app.use(router)
app.listen(port, res => console.log('服务启动, 监听' + port));