---
layout: book
title: 断言
java: basic
group: expectionassertlog
version: 1.0
---

## 断言

> 在一个具有自我保护能力的程序中，断言很常用。
>
> 断言机制允许在测试期间向代码中插入一些检査语句。当代码发布时，这些插人的检测语句将会被自动地移走。


### `assert`关键字：


```java
assert conditions;  // 如果结果为false, 则抛出一个AssertionError异常。
```

```java 
assert conditions: expression;  //表达式将被传人AssertionError的构造器，并转换成一个消息字符串。AssertionError对象不存储表达式的值。
```

### 启用和禁用断言

在默认情况下，断言被禁用。
- 在运行程序时可以用`-enableassertions`或`-ea`启用禁言（`java -enableassertions MyApp`）；在某个类或整个包中启用断言：`java -ea:MyClass -ea:com.mycompany.mylib... MyApp`；
- 用`-disableassertions`或`-da`禁用某个特定类和包的断言；







