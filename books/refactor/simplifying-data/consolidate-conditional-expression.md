---
layout: book
title: Consolidate Conditional Expression（合并条件表达式）
book: refactor
group: simplifying-data
pre: decompose-conditional
next: consolidate-duplicate-conditional-fragments
version: 1.0
---


## What

你有一系列条件测试，都得到相同结果。

**将这些测试合并为一个条件表达式，并将这个条件表达式提炼成一个独立函数。**


**原始代码：**

```java
double disabilityAmount() {
    if (_seniority < 2) return 0;
    if (_monthsDisabled > 12) return 0;
    if (_isPartTime) return 0;
    // compute the disability amount
}
```

**合并条件表达式：**

```java
double disabilityAmount() {
    if (isNotEligableForDisability()) return 0;
    // compute the disability amount
}
```