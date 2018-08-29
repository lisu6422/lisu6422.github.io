---
layout: book
title: Separate Query from Modifier（将查询函数和修改函数分离）
book: refactor
group: making-method-calls-simpler
pre: remove-parameter
next: parameterize-method
version: 1.0
---


## What

某个函数既返回对象状态值，又修改对象状态。

**建立两个不同的函数，某中一个负责查询，另一个负责修改。**


**将查询函数和修改函数分离：**

![Separate Query from Modifier](../images/separate-query-from-modifier.png)