---
layout: book
title: Duplicate Observed Data（复制"被监视数据"）
book: refactor
group: organizing-data
pre: replace-array-with-object
next: change-unidirectional-association-to-bidirectional
version: 1.0
---


## What

你有一些领域数据置身于GUI控件中，而领域函数需要访问这些数据。

**将该数据复制到一个领域对象中。建立一个Observer模式，用以同步领域对象和GUI对象内的重复数据。**


**复制"被监视数据"：**

![Duplicate Observed Data](../images/duplicate-observed-data.png)