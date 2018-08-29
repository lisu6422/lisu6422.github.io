---
layout: book
title: Remove Setting Method（移除设值函数）
book: refactor
group: making-method-calls-simpler
pre: introduce-parameter-object
next: hide-method
version: 1.0
---


## What

类中的某个字段应该在对象创建时被设值，然后就不再改变。

**去掉该字段的所有设值函数。**


**移除设值函数：**

![Remove Setting Method](../images/remove-setting-method.png)