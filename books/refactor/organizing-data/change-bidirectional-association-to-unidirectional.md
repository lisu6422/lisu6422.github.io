---
layout: book
title: Change Bidirectional Association to Unidirectional（将双向关联改为单向关联）
book: refactor
group: organizing-data
pre: change-unidirectional-association-to-bidirectional
next: replace-magic-number-with-symbolic-constant
version: 1.0
---

## What

两个类之间有双向关联，但其中一个类如今不再需要另一个类的特性。

**去除不必要的关联。**

**原始代码：**

![Change Bidirectional Association to Unidirectional](../images/change-birirectional-association-to-unidirectional.png)