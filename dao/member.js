import utils from '../common/utils'
import {query} from './connection'
const { log } = utils

const tableName = 'members'

export function createTabel () {
    return query(`CREATE TABLE ${tableName}(
        id INT NOT NULL AUTO_INCREMENT,
        user_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(50) NOT NULL,
        telephone VARCHAR(100) NOT NULL,
        PRIMARY KEY ( id ))ENGINE=InnoDB DEFAULT CHARSET=utf8;`)
}


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
    return query(`select * from ${tableName} where ${querySQL};`)
}


export function registMember(queryParam) {
    if (
        typeof queryParam !== 'object'
        || Object.keys(queryParam) == 0
       ) {
        throw new Error('缺少查询字段')
    }
    let {user_name, email, password, telephone = null} = queryParam
    return query(`insert into ${tableName} (user_name, email, password, telephone) values (
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
        select * from ${tableName}
        where ${querySQL};
    `)
}

