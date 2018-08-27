---
layout: book
title: Remove Assignments to Parameters（移除对参数的赋值）
book: refactor
group: composing-methods
pre: split-temporary-variable
next: replace-method-with-method-object
---


## What

代码对一个参数进行赋值。

**以一个临时变量取代该参数的位置。**


**原始代码：**

```java
int discount (int inputVal, int quantity, int yeayToDate){
    if(inputVal > 50) inputVal -= 2;
}
```

**移除对参数的赋值：**

```java
int discount (int inputVal, int quantity, int yeayToDate){
    int result = inputVal;
    if(inputVal > 50) result -= 2;
}
```