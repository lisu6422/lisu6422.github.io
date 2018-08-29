---
layout: book
title: Encapsulate Downcast（封装向下转型）
book: refactor
group: making-method-calls-simpler
pre: replace-constructor-with-factory-method
next: replace-error-code-with-exception
version: 1.0
---


## What

某个函数返回的对象，需要由函数调用者执行向下转型（`downcast`）。

**将向下转型动作移到函数中。**


**原始代码：**

```java
Object lastReading() {
    return readings.lastElement();
}
```

**封装向下转型：**

```java
Reading lastReading() {
    return (Reading) readings.lastElement();
}
```