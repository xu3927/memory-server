# 开发踩坑记录

- 使用连接mysql时报下面的错误

```
error connecting: Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgradingMySQL client
```

原因是mysql8.0把更改了验证模式, node-mysql库还未支持

执行下面语句可以解决

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourRootPassword';
```

参考: https://github.com/mysqljs/mysql/issues/2046

