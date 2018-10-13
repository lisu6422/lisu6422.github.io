---
layout: book
title: 日志
java: basic
group: expectionassertlog
version: 1.0
---

## 日志

### 基本日志

- 使用全局日志记录器(global logger)的info方法，生成简单的日志记录：

```java
Logger.getGlobal().info(message);
```

- 取消所有的日志：

```java
Logger.getClobal().setLevel(Level.OFF);
```

### 高级日志

> 在一个专业的应用程序中，不要将所有的日志都记录到一个全局日志记录器中，可以自定义日志记录器。

- 创建、获取记录器：

```java
// 未被任何变量引用的日志记录器可能会被垃圾回收。需要用一个静态变量存储日志记录器的一个引用。
private static final Logger myLogger = Logger.getLogger(MyClass.class.getName()); 
```

- 日志记录器级别：
1. SEVERE 
2. WARNING 
3. INFO
4. CONFIG 
5. FINE
6. FINER
7. FINEST

    日志记录器的父与子之间将共享某些属性。

    默认的日志配置只记录前三个级别，应该使用CONFIG、FINE、FINER和FINEST级别来记录那些有助于诊断的调试信息。可以使用setLevel方法设置其他的级別(`logger.setLevel(Level.WARNING)`)，以阻止Logger输出低于指定日志级别的消息。

    可以使用Level.ALL开启所有级别的记录；使用Level.OFF关闭所有级别的记录。

- 记录日志事件：

Logger提供了几种方法来触发日志事件：
1. log方法：记录日志消息;
2. 针对输出特定级别日志的快捷方式：warning()、info()...
3. 记录额外信息的方法：

    - logp方法：获得调用类和方法的确切位置；
    ```java
    void logp(Level l, String className, String methodName, String message)
    ```
    - entering、exiting方法：跟踪执行流，记录方法调用信息，将生成FINER级别和以字符ENTRY和RETURN开始的日志记录；
    - throwing方法：提供日志记录中包含的异常描述内容，将生成一条FINER级别的记录和一条以字符THROW开始的信息；
    ```java
    void throwing(String className, String methodName, Throwable t)
    ```


 