---
layout: book
title: Servlet
java: basic
group: expectionassertlog
version: 1.0
---

## Servlet简介
> Java Servlet是运行在Web服务器或应用服务器上的程序，它是作为来自Web浏览器或其他HTTP客户端的请求和HTTP服务器上的数据库或应用程序之间的中间层。
>
> Servlet是个特殊的Java类。
>
> Servlet的作用是处理请求，服务器会把接收到的请求交给Servlet来处理，在Servlet中通常需要：接收请求数据、处理请求、完成响应。

## Servlet任务

Servlet主要完成以下任务：

- 读取客户端发送的显式的数据（网页上的HTML表单、来自applet或自定义的HTTP客户端程序的表单）

- 读取客户端发送的隐式的HTTP请求数据（cookies、媒体类型和浏览器能理解的压缩格式）

- 处理数据并生成结果（这个过程可能需要访问数据库，执行RMI或CORBA调用，调用Web服务，或者直接计算得出对应的结果）

- 发送显式的数据（即文档）到客户端（文档的格式可以是文本文件、二进制文件等）

- 发送隐式的HTTP响应到客户端（包括告诉客户端被返回的文档类型、设置cookies和缓存参数）


## Servlet生命周期
```shell
init() -> service() -> destory()
```
1. 服务器创建Servlet

   当Servlet第一次被请求或服务器启动时，服务器会创建Servlet实例；

2. 服务器初始化Servlet

   当服务器创建Servlet实例后会马上调用Servlet的`init(ServletConfig)`方法，完成对Servlet的初始化；`init(ServletConfig)`只会被调用一次；

3. 服务器使用Servlet处理请求

   当Servlet被请求时，服务器会调用Servlet的`service(ServletRequest,ServletResponse)`方法来处理请求；每处理一次请求，`service()`就会被调用一次；

4. 服务器销毁Servlet

   服务器在销毁Servlet之前会调用Servlet的`destory()`方法;
