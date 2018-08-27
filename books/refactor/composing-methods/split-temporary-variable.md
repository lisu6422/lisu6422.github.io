---
layout: book
title: Split Temporary Variable（分解临时变量）
book: refactor
group: composing-methods
pre: introduce-explaining-variable
next: remove-assignments-to-parameters
version: 1.0
---

## What

你的程序有某个临时变量被赋值超过一次，它既不是循环变量，也不被用于收集计算结果。

**针对每次赋值，创造一个独立、对应的临时变量。**


**原始代码：**

```java
double temp = 2 * (height * width);
System.out.println(temp);
temp = height * width;
System.out.println(temp);
```

**分解临时变量：**

```java
final double perimeter = 2 * (height * width);
System.out.println(perimeter);
final double area = height * width;
System.out.println(area);
```