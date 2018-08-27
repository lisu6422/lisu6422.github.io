---
layout: book
title: Self Encapsulate Field（自封装字段）
book: refactor
group: organizing-data
pre: ../moving-features-between-objects/introduce-local-extension
next: replace-data-value-with-object
version: 1.0
---


## What

你直接访问一个字段，但与字段之间的耦合关系逐渐变得笨拙。

**为这个字段建立取值/设值函数，并且只以这些函数来访问字段。**


**原始代码：**

```java
private int low, high;
boolean includes (int arg) {
    return arg >= low && arg <= high;
}
```

**自封装字段：**

```java
private int low, high;
boolean includes (int arg) {
    return arg >= getLow() && arg <= getHigh();
}
int getLow() {
    return low;
}
int getHigh() {
    return high;
}
```