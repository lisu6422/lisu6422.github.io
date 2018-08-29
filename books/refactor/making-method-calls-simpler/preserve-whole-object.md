---
layout: book
title: Preserve Whole Object（保持对象完整）
book: refactor
group: making-method-calls-simpler
pre: replace-parameter-with-explicit-methods
next: replace-parameter-with-methods
version: 1.0
---


## What

你从某个对象中取出若干值，将它们作为某一次函数调用时的参数。

**改为传递整个对象。**


**原始代码：**

```java
int low = daysTempRange().getLow();
int high = daysTempRange().getHigh(); withinPlan = plan.withinRange(low, high);
```

**保持对象完整：**

```java
withinPlan = plan.withinRange(daysTempRange());
```