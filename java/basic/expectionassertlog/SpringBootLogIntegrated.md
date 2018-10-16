---
layout: book
title: SpringBoot日志集成
java: basic
group: expectionassertlog
version: 1.0
---

## SpringBoot日志集成

### Spring Boot日志框架
1. Spring Boot支持Java.Util.Logging，Log4j2，Lockback作为日志框架；
2. spring-boot-starter启动器包含spring-boot-starter-logging启动器，并集成了slf4j日志抽象及Logback日志框架；
3. 无论使用哪种日志框架，Spring Boot都支持配置将日志输出到控制台或者文件中。


常用日志框架： log4j，Logging，commons-logging，slf4j，logback；
- commons-loggin，slf4j 只是一种日志抽象门面，不是具体的日志框架；
- log4j，logback 是具体的日志实现框架。

slf4j（Simple logging Facade for Java）
> slf4j给Java日志访问提供了一个标准、规范的API框架；
>
> Slf4J不是一个真正的日志实现，而是一个抽象层，可以通过其他日志框架完成具体的实现（如：log4j、logback）；
> 
> slf4j也提供了一些简单的实现；

在类的内部使用：
```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
private static final Logger logger = LoggerFactory.getLogger(clazz);  
logger.info(message);
```

### 属性配置日志

Spring Boot支持属性配置日志参数。
参考配置项：

```java
# LOGGING
logging.config= # Location of the logging configuration file. For instance `classpath:logback.xml` for Logback
logging.exception-conversion-word=%wEx # Conversion word used when logging exceptions.
logging.file= # Log file name. For instance `myapp.log`
logging.level.*= # Log levels severity mapping. For instance `logging.level.org.springframework=DEBUG`
logging.path= # Location of the log file. For instance `/var/log`
logging.pattern.console= # Appender pattern for output to the console. Only supported with the default logback setup.
logging.pattern.file= # Appender pattern for output to the file. Only supported with the default logback setup.
logging.pattern.level= # Appender pattern for log level (default %5p). Only supported with the default logback setup.
logging.register-shutdown-hook=false # Register a shutdown hook for the logging system when it is initialized.
```


### 自定义日志文件

根据不同的日志框架，默认加载的日志配置文件的文件名，并且放在资源根目录下（其他的目录及文件名不能被加载）。

```java
Logging System	              Customization
Logback	                      logback-spring.xml, logback-spring.groovy, logback.xml or logback.groovy
Log4j2	                      log4j2-spring.xml or log4j2.xml
JDK (Java.Util.Logging)	      logging.properties
```
