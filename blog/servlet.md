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


## 实现Servlet的方式

Servlet是一个接口，一般情况下不需要直接实现 Servlet，而是继承它的子类（如：GenericServlet、HttpServlet），并重写相关的方法。

### 实现Servlet的三种方式：
* 实现javax.servlet.Servlet接口；
* 继承javax.servlet.GenericServlet类
* 继承javax.servlet.HttpServlet类；（一般采用这种方式）

 三者的关系：GenericServlet是Servlet接口的实现类；HttpServlet类是GenericServlet类的子类，它提供了对HTTP请求的支持。


### Servlet接口

```java
public interface Servlet {
	public void init(ServletConfig config) throws ServletException;
	public ServletConfig getServletConfig();
	public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException;
	public String getServletInfo();
	public void destroy();
}
```

### GenericServlet

`GenericServlet`是`Servlet`接口的实现类，可以通过继承`GenericServlet`来编写自己的`Servlet`。
```java
public abstract class GenericServlet implements Servlet, ServletConfig, java.io.Serializable {......}
```

### HttpServlet

HttpServlet类是GenericServle的子类，它提供了对HTTP请求的特殊支持，所以通常可以通过继承HttpServlet来实现自定义的Servlet。

HttpServlet覆盖了service方法，并把service的两个参数ServletRequest和ServletResponse强转成了HttpServletRequest和HttpServletResponse；

HttpServlet的`service(HttpServletRequest,HttpServletResponse)`方法会去判断当前请求的HTTP Method，如果是GET（或其他）请求，就会去调用本类的doGet()（或其他）方法，因此需要在子类中覆盖doGet()、doPost()或其他方法。


## Servlet配置

Servlet的配置有两种方法：

- 通过web.xml配置文件
- 使用注解@WebServlet(name=””, urlPatterns=””)

### web.xml

在web.xml文件中设置servlet以及servlet与URL的映射：

```xml
<servlet>
    <servlet-name>test-servlet</servlet-name>
    <servlet-class>com.demo.TestServlet</servlet-class>
</servlet>

<servlet-mapping>
    <servlet-name>test-servlet</servlet-name>
    <url-pattern>/test</url-pattern>
</servlet-mapping>

```

servlet和servlet-mapping中的servlet-name必须相同。

### @WebServlet

在Java5以后，可以通过注解直接在servlet类注解配置信息，而不需要通过web.xml进行配置。

```java
@WebServlet(name="testServlet", urlPatterns={"/test"})
public class TestServlet extends HttpServlet {
    ......
}
```