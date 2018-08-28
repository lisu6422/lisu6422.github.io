---
layout: book
title: Remove Control Flag（移除控制标记）
book: refactor
group: simplifying-data
pre: consolidate-duplicate-conditional-fragments
next: replace-nested-conditional-with-guard-clauses
version: 1.0
---


## What

在一系列布尔表达式中，某个变量带有“控制标记”`（control flag）`的作用。

**以`break`语句或`return`语句取代控制标记。**

