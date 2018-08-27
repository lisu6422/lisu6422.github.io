---
layout: book
title: Encapsulate Field（封装字段）
book: refactor
group: organizing-data
pre: replace-magic-number-with-symbolic-constant
next: encapsulate-collection
version: 1.0
---


## What

你的类中存在一个`public`字段。

**将它声明为`private`，并提供相应的访问函数。**

**原始代码：**

```java
public String name
```

**封装字段：**

```java
private String name;
public String getName() {
    return name;
}
public void setName(String name) {
    this.name = name;
}
```