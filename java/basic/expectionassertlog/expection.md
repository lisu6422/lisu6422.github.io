---
layout: book
title: 异常
java: basic
group: expectionassertlog
version: 1.0
---

## 异常

### 处理错误

> 所有的异常都是由Throwable继承而来，Throwable分为两个分支：Error 和 Exception。
>
> Exception层次结构又分解为两个分支: 一个分支派生于RuntimeException（由程序错误导致的异常）; 另一个分支包含其他异常（程序本身没有问题）。

#### 声明受查异常

```java
throws Exception
```

>  一 个方法不仅需要告诉编译器将要返回什么值，还要告诉编译器有可能发生什么错误。
>
> 一个方法必须声明所有可能抛出的受查异常，而非受查异常要么不可控制(Error), 要么就应该避免发生(RuntimeException)。如果方法没有声明所有可能发生的受查异常， 编译器就会发出一个错误消息。
> 
> 除了声明异常之外，还可以捕获异常。这样会使异常不被抛到方法之外，也不需要throws规范。


#### 抛出异常

```java
throw new Exception()
```

对于一个已经存在的异常类，抛出异常步骤：
1. 找到一个合适的异常类;
2. 创建这个类的一个对象;
3. 将对象抛出;
在这种情况下，一旦方法抛出了异常，这个方法就不可能返回到调用者。


#### 创建异常类

可以定义一个派生于Exception的类，或者派生于Exception子类的类。 


### 捕获异常

#### 捕获异常

要想捕获一个异常，必须设置try/catch语句块：

```java
try {
    more code
} catch (ExceptionType e) {
    handlerfor this type 
}
```

如果在try语句块中的任何代码抛出了一个在catch子句中说明的异常类，那么，
1. 程序将跳过try语句块的其余代码；
2. 程序将执行 catch 子句中的处理器代码；


编译器会严格地执行throws说明符。如果调用了一个抛出受查异常的方法，就必须对它进行处理，或者继续传递。
1. 通常，应该捕获那些知道如何处理的异常，而将那些不知道怎样处理的异常继续进行传递。如果想传递一个异常，就必须在方法的首部添加一个throws说明符，以便告知调用者这个方法可能会抛出异常。
2. 如果编写一个覆盖超类的方法，而这个方法又没有抛出异常, 那么这个方法就必须捕获方法代码中出现的每一个受查异常。不允许在子类的throws说明符中出现超过超类方法所列出的异常类范围。

#### 捕获多个异常

在一个try语句块中可以捕获多个异常类型，并对不同类型的异常做出不同的处理。

 ```java
try {
    code that might throw exceptions 
} catch (FileNotFoundException e) {
    emergencyactionfor missingfiles 
} catch (UnknownHostException e) {
    emergency action for unknown hosts
} catch (IOException e) {
    emergencyactionforall other I/O problems
}
 ```

 同一个catch子句中可以捕获多个异常类型。

```java
try {
    code that might throw exceptions
} catch (FileNotFoundException | UnknownHostException e) {
    emergency action for missing files and unknown hosts
} catch (IOException e) {
    emergency action for all other I/O problems
}
```

#### 再次抛出异常与异常链

在catch子句中可以抛出一个异常，这样做的目的是改变异常的类型。

```java
try {
    access the database
} catch (SQLException e) {
    throw new ServletException("database error: " + e.getMessage());
}
```

有一种更好的处理方法，并且将原始异常设置为新异常的“ 原因”：
```java
try {
    access the database
} catch (SQLException e) {
    Throwable se = new ServletException("database error"); 
    se.initCause(e);
    throw se;
}
```

当捕获到异常时， 就可以使用``` Throwable e = se.getCause(); ```重新得到原始异常：

如果在一个方法中发生了一个受查异常，而不允许抛出它，那么包装技术就十分有用。我们可以捕获这个受查异常，并将它包装成一个运行时异常。


有时你可能只想记录一个异常， 再将它重新抛出， 而不做任何改变：
```java
try {
    access the database
} catch (Exception e) {
    logger.log(level, message, e);
    throw e;
}
```

#### finally子句

不管是否有异常被捕获，finally子句中的代码都被执行。

#### 带资源的try语句

> 只要需要关闭资源，就要尽可能使用带资源的try语句。

示例：
```java
try (Scanner in = new Scanner(new FileInputStream("/file")), "UTF-8")
{
    while (in.hasNextO) 
        System.out.println(in.next());
}
```

这个块正常退出时，或者存在一个异常时，都会调用 in.lose()方法，就好像使用了finally块一样。

还可以指定多个资源，
```java
try (Scanner in = new Scanner (new FileInputStream("/file"), "UTF-8");
    PrintWriter out = new PrintWriter("out.txt"))
{
    while (in.hasNext()) 
        out.println(in.next().toUpperCase());
}
```

