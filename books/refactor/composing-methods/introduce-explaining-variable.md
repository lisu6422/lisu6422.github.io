---
layout: book
title: Introduce Explaining Variable（引入解释性变量）
book: refactor
group: composing-methods
pre: replace-temp-with-query
next: split-temporary-variable
version: 1.0
---


## What

你有一个复杂的表达式。

**将该复杂表达式（或其中一部分）的结果放进一个临时变量，以此变量名称来解释表达式用途。**

**原始代码：**

```java
if((platform.toUpperCase().indexOf("MAC") > -1) && (browser.toUpperCase().indexOf("IE") > -1) && wasInitialized() && resize > 0){
    // do something
}
```

**引入解释性变量：**

```java
final boolean isMacOS = platform.toUpperCase().indexOf("MAC") > -1;
final boolean isIEBrowser = browser.toUpperCase().indexOf("IE") > -1;
final boolean is wasResized = resize > 0;

if(isMacOs && isIEBrowser && wasInitialized() && wasResized ){
    // do something
}
```

## Why

表达式有可能非常复杂而难以阅读。这种情况下，临时变量可以帮助将表达式分解为比较容易管理的形式。

## When

* 在条件逻辑中，**Introduce Explaining Variable**特别有价值：可用这项重构将每个子句提炼出来，以一个良好命名的临时变量来解释对应条件子句的意义。

* 在较长算法中，可以运用临时变量来解释每一步运算的意义。

* 在**[Extract Method](extract-method.html)**需要花费更大工作量时。

## How

1. 声明一个`final`临时变量，将待分解复杂表达式中的一部分动作的运算结果赋值给它。
2. 将表达式中的”运算结果“这一部分，替换为上述临时变量。
    
3. 编译，测试。
4. 重复上述过程，处理表达式的其他部分。

## Example

从一个简单计算开始：

```java
double price(){
    // price is base price - quantity discount + shipping
    return _quantity * _itemPirce - 
    Math.max(0, _quantity - 500) * _itemPrice * 0.05 +
    Math.min(_quantity * _itemPrice * 0.1, 100.0);
}
```

让这段代码 变得更容易理解。

代码中，底价`basePrice`等于数量`quantity`乘以单价`itemPrice`，可以将这部分计算的结果放入一个临时变量中。
```java
double price(){
    // price is base price - quantity discount + shipping
    final double basePrice = _quantity * _itemPirce;
    return basePrice - 
    Math.max(0, _quantity - 500) * _itemPrice * 0.05 +
    Math.min(basePrice * 0.1, 100.0);
}
```

将批发折扣`quantity discount`的计算提炼出来，将结果赋给一个临时变量。
```java
double price(){
    // price is base price - quantity discount + shipping
    final double basePrice = _quantity * _itemPirce;
    final double quantityDiscount = Math.max(0, _quantity - 500) * _itemPrice * 0.05;
    return basePrice - quantityDiscount +
    Math.min(basePrice * 0.1, 100.0);
}
```


将运费`shipping`的计算提炼出来，将结果赋给一个临时变量。
```java
double price(){
    // price is base price - quantity discount + shipping
    final double basePrice = _quantity * _itemPirce;
    final double quantityDiscount = Math.max(0, _quantity - 500) * _itemPrice * 0.05;
    final double shipping =  Math.min(basePrice * 0.1, 100.0)
    return basePrice - quantityDiscount + shipping;
}
```


## 关联阅读

* [Extract Method（提炼函数）](extract-method.html)