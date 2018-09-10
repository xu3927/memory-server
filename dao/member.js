import utils from '../common/utils'
import {query} from './connection'
const { log } = utils

export function getMember(queryParam) {
    if (
        typeof queryParam !== 'object'
        || Object.keys(queryParam) == 0
       ) {
        throw new Error('缺少查询字段')
    }
    let keys = Object.keys(queryParam)
    let querySQL = ''
    keys.forEach(key => querySQL += `${key}='${queryParam[key]}' `)
    return query(`select * from members where ${querySQL};`)
}


export function registMember(queryParam) {
    if (
        typeof queryParam !== 'object'
        || Object.keys(queryParam) == 0
       ) {
        throw new Error('缺少查询字段')
    }
    let {user_name, email, password, telephone = null} = queryParam
    return query(`insert into members (user_name, email, password, telephone) values (
        '${user_name}',
        '${email}',
        '${password}',
        '${telephone}'
        );`)
}


export function getAllMembers(queryParam) {
    if (
        typeof queryParam !== 'object'
        || Object.keys(queryParam) == 0
       ) {
        throw new Error('缺少查询字段')
    }
    if (
        typeof queryParam !== 'object'
        || Object.keys(queryParam) == 0
       ) {
        throw new Error('缺少查询字段')
    }
    let keys = Object.keys(queryParam)
    let querySQL = ''
    keys.forEach((key, index) => {
        if (queryParam[key]) {
            querySQL += `${key}='${queryParam[key]}'`
            if (index < keys.length - 1) {
                querySQL += ' or '
            }
        }
    })
    return query(`
        select * from members
        where ${querySQL};
    `)
}

