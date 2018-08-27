---
layout: book
title: Change Unidirectional Association to Bidirectional（将单向关联改为双向关联）
book: refactor
group: organizing-data
pre: duplicate-observed-data
next: change-bidirectional-association-to-unidirectional
version: 1.0
---


## What

两个类都需要使用对方特性，但期间只有一条单向连接。

**添加一个反向指针，并使修改函数能够同时更新两条连接。**


**将单向关联改为双向关联：**

![](../images/change-unidirectional-associaton-to-bidriectional.png)