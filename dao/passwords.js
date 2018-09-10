import utils from '../common/utils'
import {query} from './connection'
const { log } = utils
const database = 'password_list'


export function insert (data) {
    if (!data.website || !data.user_id) {
        throw new Error('数据错误')
    }
  
    return query(`insert into ${database} (user_id, website, url, user_name, password, phone, email, other) values (
        '${data.user_id}',
        '${data.website}',
        '${data.url}',
        '${data.user_name}',
        '${data.password}',
        '${data.phone}',
        '${data.email}',
        '${data.other}'
    );`)
}

/**
 * 查询
 * @param {object} queryParam 
 * queryParam.user_id 必需
 */
export function get(queryParam) {
    if (
        typeof queryParam !== 'object'
        || Object.keys(queryParam) == 0
        || !queryParam.user_id
       ) {
        throw new Error('缺少查询字段')
    }
    let {pageNo = 1, pageSize = 10} = queryParam
    delete queryParam.pageNo
    delete queryParam.pageSize
    let keys = Object.keys(queryParam)
    let querySQL = ''
    keys.forEach(key => querySQL += `${key}='${queryParam[key]}' `)
    if (pageNo < 1) {
        pageNo = 1
    }
    if (pageSize < 1) {
        pageSize = 1
    }
    const offset = pageNo * pageSize, rowCount = pageSize;
    let countSql = query(`select count(*) as total from ${database} where ${querySQL}`)
    let listSql = query(`select * from ${database} 
    where ${querySQL}
    limit ${offset, rowCount};`)
    return Promise.all([listSql, countSql])
}

/**
 * 计数
 * @param {object} queryParam 
 * queryParam.user_id 必需
 */
export function count(queryParam) {
    if (
        typeof queryParam !== 'object'
        || Object.keys(queryParam) == 0
        || !queryParam.user_id
       ) {
        throw new Error('缺少查询字段')
    }
    let keys = Object.keys(queryParam)
    let querySQL = ''
    keys.forEach(key => querySQL += `${key}='${queryParam[key]}' `)
    return query(`select count(*) as total from ${database} 
        where ${querySQL};`)
}


/**
 * 删除
 * @param {object} queryParam 
 * queryParam.id 必需 要删除的条目id
 */
export function deleteItem (queryParam) {
    if (
        !queryParam || !queryParam.id
       ) {
        throw new Error('缺少ID')
    }
    return query(`delete from ${database} where id=${queryParam.id}`)
}

/**
 * 更新
 * @param {object}} queryParam 参数
 * queryParam.id 条目id 必需
 * queryParam.website 等为可选字段
 */
export function updateItem(queryParam) {
    if (
        typeof queryParam !== 'object'
        || Object.keys(queryParam) == 0
        || !queryParam.id
       ) {
        throw new Error('缺少查询字段')
    }
    let {id} = queryParam
    delete queryParam.id
    let keys = Object.keys(queryParam)
    let setSQL = ''
    keys.forEach((key, index) => {
        if (queryParam[key]) {
            setSQL += `${key}='${queryParam[key]}' `
            if (index < keys.length - 1) {
                setSQL += ' or '
            }
        }
    })
    return query(`
    update ${database} set 
    ${setSQL}
    where 
    id=${id};
    `)
}

