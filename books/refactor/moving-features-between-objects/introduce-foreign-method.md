---
layout: book
title: Introduce Foreign Method（引入外加函数）
book: refactor
group: moving-features-between-objects
pre: remove-middle-man
next: introduce-local-extension
version: 1.0
---


## What

你需要为提供服务的类增驾一个函数，但你无法修改这个类。

**在客户类中建立一个函数，并以第一参数形式传入一个服务类实例。**


**原始代码：**

```java
Date newStart = new Date (previousEnd.getYear(),previousEnd.getMonth(), previousEnd.getDate() + 1);
```

**引入外加函数：**

```java
Date newStart = nextDay(previousEnd);

private static Date nextDay(Date arg) {
    return new Date (arg.getYear(),arg.getMonth(), arg.getDate() +1)
}
```