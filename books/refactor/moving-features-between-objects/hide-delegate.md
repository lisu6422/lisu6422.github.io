---
layout: book
title: Hide Delegate（隐藏"委托关系"）
book: refactor
group: moving-features-between-objects
pre: inline-class
next: remove-middle-man
version: 1.0
---


## What

客户通过一个委托类来调用另一个对象。

**在服务类上建立客户所需的所有函数，用以隐藏委托关系。**


**隐藏"委托关系"：**

![](../images/hide-delegate.png)