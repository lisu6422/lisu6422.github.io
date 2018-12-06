---
layout: book
title: REST 与 RESTful
java: basic
group: expectionassertlog
version: 1.0
---

## REST 与 RESTful
### 概念

> REST（representational state transfer）：表述性状态转移，是一种架构风格。
> REST有以下几个原则：
> 1. 网络上的所有事物都被抽象为资源
> 2. 每个资源都有一个唯一的资源标识符
> 3. 同一个资源具有多种表现形式（xml，json等）
> 4. 对资源的各种操作不会改变资源的标识符
> 5. 所有的操作都是无状态的

> RESTful：遵守了rest原则的web服务。


RESTful由REST派生而来，RESTful更精简明了。

### 用法

举例：分别用REST和RESEful来描述查找用户、新增用户、修改用户和删除用户。

* REST

```shell
// 查找用户
GET  http://localhost/user/query/{id}
// 新增用户
POST  http://localhost/user/save
// 修改用户
POST  http://localhost/user/update
// 删除用户
POST  http://localhost/user/delete
```

* RESTful

```shell
// 查找用户
GET  http://localhost/user/{id}
// 新增用户
POST  http://localhost/user
// 修改用户
PUT  http://localhost/user
// 删除用户
DELETE  http://localhost/user
```

