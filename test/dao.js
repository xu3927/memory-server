import Utils from '../common/utils'
import DAO from '../dao/index.js'

const {connect, member, passwords} = DAO;
const {log} = Utils

console.log(connect)
log.info('DAO测试----DAO测试') 

// 建立连接
// connect()
// .then(connection => {
//     log.debug('建立连接')
// }, err => {
//     console.log('建立连接失败', err);
// })

passwords.createTabel()
.then(res => {
    console.log('createTabel:', res);
}, err => {
    console.log('createTabel:', err);
})

log.info('passwords测试----passwords测试') 

// passwords.insert({
//     user_id: 88,
//     "website": "facebook",
//     "user_name": "jane",
//     "password": "125432",
//     "phone": "1234567",
//     "email": "jane@qq.com",
//     "other": "" // 其他
// })
// .then(res => {
//     console.log('插入成功', res)
// })


// passwords.get({
//     user_id: 3,
//     pageNo: 1,
//     pageSize: 3
// })
// .then(res => {
//     console.log('查询:', res)
// })

// passwords.count({
//     user_id: 3
// })
// .then(res => {
//     console.log('查询:', res)
// })