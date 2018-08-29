---
layout: book
title: Replace Constructor with Factory Method（以工厂函数取代构造函数）
book: refactor
group: making-method-calls-simpler
pre: hide-method
next: encapsulate-downcast
version: 1.0
---


## What

你希望在创建对象时不仅仅是做简单的建构动作。

**将构建函数替换为工厂函数。**


**原始代码：**

```java
Employee (int type) {
 _type = type;
}
```

**以工厂函数取代构造函数：**

```java
static Employee create(int type) {
    return new Employee(type);
}
```