---
layout: book
title: Extract Hierarchy（提炼继承体系）
book: refactor
group: big-refactorings
pre: separate-domain-from-presentation
version: 1.0
---


## What

你有某个类做了太多工作，其中一部分工作是以大量条件表达式完成的。

**建立继承体系，以一个子类表示一种特殊情况。**


**提炼继承体系：**

![Extract Hierarchy](../images/extract-hierarchy.png)