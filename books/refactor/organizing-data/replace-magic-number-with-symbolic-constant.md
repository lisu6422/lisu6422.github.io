---
layout: book
title: Replace Magic Number with Symbolic Constant（以字面量取代魔法数）
book: refactor
group: organizing-data
pre: change-bidirectional-association-to-unidirectional
next: encapsulate-field
version: 1.0
---


## What

你有一个字面数值，带有特别含义。

**创建一个常量，根据其意义为它命名，并将上述的字面数值替换为这个常量。**


**原始代码：**

```java
double potentialEnergy(double mass, double height) {
 return mass * 9.81 * height;
}
```

**以字面量取代魔法数：**

```java
static final double GRAVITATIONAL_CONSTANT = 9.81;
double potentialEnergy(double mass, double height) {
 return mass * GRAVITATIONAL_CONSTANT * height;
}
```