import utils from '../common/utils.js'
const { log } = utils
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'memories'
});

export function connect() {
    return new Promise((resolve, reject) => {
        // 建立连接
        connection.connect(function (err) {
            if (err) {
                log.error('error connecting: ' + err.stack);
                reject()
                return;
            }
            log.info('connected as id ' + connection.threadId);
            resolve(connection);
        });
    })
}

export function query (sql) {
    return new Promise((resolve, reject) => {
        // 建立连接
        connection.query(sql, (error, result, fields) => {
            if (error) {
                log.error('[sql query Error]', error)
                reject(error)
            } else {
                resolve(result, fields)
            }
        });
    })
}


export default connection