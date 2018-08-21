---
layout: book
title: Duplicated Code（重复代码）
book: refactor
group: bad-taste
---

## What

在一个以上的地方看到相同的程序结构。

## When
* case1：同一个类的两个函数含有相同的表达式。
* case2：两个互为兄弟的子类中含有相同的表达式。
* case3：两个毫不相关的类中含有相同的表达式。

## Disadvantage
* 复用性差
* 代码膨胀混乱，难以维护
