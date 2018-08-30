---
layout: book
title: Form Template Method（塑造模板函数）
book: refactor
group: dealing-with-generalization
pre: collapse-hierarchy
next: replace-inheritance-with-delegation
version: 1.0
---


## What

你有一些子类，其中相应的某些函数以相同顺序执行类似的操作，但各个操作的细节上有所不同。

**将这些操作分别放进独立函数中，并保持它们都有相同的签名，于是原函数也就变得相同了。然后将原函数上移至超类。**


**塑造模板函数：**

![Torm Template Method](../images/form-template-method.png)