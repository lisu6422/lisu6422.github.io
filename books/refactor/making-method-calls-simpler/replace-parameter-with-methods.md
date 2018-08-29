---
layout: book
title: Replace Parameter with Methods（以函数取代参数）
book: refactor
group: making-method-calls-simpler
pre: preserve-whole-object
next: introduce-parameter-object
version: 1.0
---


## What

对象调用某个函数，并将所得结果作为参数，传递给另一个函数。而接受该参数的函数本身也能够调用前一个函数。

**让参数接受者去除该项参数，并直接调用前一个函数。**


**原始代码：**

```java
int basePrice = _quantity * _itemPrice;
discountLevel = getDiscountLevel();
double finalPrice = discountedPrice (basePrice, discountLevel);
```

**以函数取代参数：**

```java
int basePrice = _quantity * _itemPrice;
double finalPrice = discountedPrice (basePrice);
```