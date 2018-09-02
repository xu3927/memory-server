# API

服务端的接口

## 通用

- status
    - 0: 成功
    - 1: 失败

## 部署

API: /login

Method: post

参数:

- request

```json
{
   "username": "janeblack",
   "password": "123456" 
}
```

- response
    - message取值: "登录成功", "登录失败, 用户名,密码不正确"

```json
{
    "status": 0, // 0 成功, 1 失败
    "": "",
    "message": "登录成功"
}
```
