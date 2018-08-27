---
layout: book
title: Replace Subclass with Fields（以字段取代子类）
book: refactor
group: organizing-data
pre: replace-type-code-with-state-or-strategy
next: ../simplifying-data/decompose-conditional
version: 1.0
---


## What

你的各个子类的唯一差别只在“返回常量数据”的函数身上。

**修改这些函数，使它们返回超类中的某个（新增）字段，然后销毁子类。**


**以字段取代子类：**

![Replace Subclass with Fields](../images/replace-subclass-with-fields.png)