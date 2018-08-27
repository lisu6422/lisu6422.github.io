---
layout: book
title: Replace Array with Object（以对象取代数组）
book: refactor
group: organizing-data
pre: change-reference-to-value
next: duplicate-observed-data
version: 1.0
---

## What

你有一个数组，其中的元素各自代表不同的东西。

**以对象替换数组。对于数组中的每个元素，以一个字段表示。**


**原始代码：**

```java
String[] row = new String[3]; 
row [0] = "Liverpool";
row [1] = "15";
```

**以对象取代数组：**

```java
Performance row = new Performance(); 
row.setName("Liverpool");
row.setWins("15");
```