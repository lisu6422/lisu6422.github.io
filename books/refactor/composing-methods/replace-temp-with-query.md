---
layout: book
title: Replace Temp with Query（以查询取代临时变量）
book: refactor
group: composing-methods
pre: inline-temp
next: introduce-explaining-variable
---


## What

程序以一个临时变量保存某一表达式的运算结果。

**将这个表达式提炼到一个独立的函数中。将这个临时变量的所有引用点替换为对新函数的调用。此后，新函数就可被其他函数使用。**


**原始代码：**

```java
double basePrice = _quantity * _itemPrice;
if(basePrice > 1000){
    return basePrice * 0.95;
}else{
    return basePrice * 0.98;
}
```

**以查询取代临时变量：**

```java
if(basePirce() > 1000){
    return basePrice() * 0.95;
}else{
    return basPrice() * 0.98;
}

double basePrice(){
    return _quantity * _itemPrice;
}
```

## Why

临时变量的问题在于：**它们是暂时的，而且只能在所属函数内使用**。

由于临时变量只在所属函数内可见，所以它们会驱使你写出更长的函数，因为只有这样你才能访问到你需要的临时变量。如果把临时变量替换为一个查询，那么同一个类中的所有函数都将可以获得这份信息。这将带给你极大的帮助，使你能够为这个类编写更清晰的代码。

## When

**Replace Temp with Query** 往往是运用**[Extract Method](extract-method.html)**之前必不可少的一个步骤。局部变量会使代码难以被提炼，所以你应该尽可能地替换为查询式。

* 简单情况：**临时变量只被赋值一次，或者赋值给临时变量的表达式不受其他条件影响。**

* 棘手情况: 你可能需要先运用**[Split Temporary Variable](split-temporary-variable.html)** 或**[Separate Query from Modifier](../making-method-calls-simpler/separate-query-from-modifier.html)**使情况变得简单一些，然后再替换临时变量。

* 想替换的临时变量是用来收集结果的（例如循环中的累加值），整个循环都可以被提炼为一个独立的函数。


## How

1. 找出只被赋值一次的临时变量。

    > 如果某个临时变量被赋值超过一次，考虑使用**[Split Temporary Variable](split-temporary-variable.html)**将它分割成多个变量。

2. 将临时变量声明为`final`。

3. 编译。

4. 将赋值语句等号右边部分提炼到一个独立函数中。

    * 首先将函数声明为`private`。日后你可能会发现有更多类需要使用它，那时放松对它的保护也很容易。
    * 确保提炼出来的函数不修改任何对象内容。如果有修改，就对它进行**[Separate Query from Modifier](../making-method-calls-simpler/separate-query-from-modifier.html)**。
    * 使用临时变量保存循环中的累加值时，一个循环中可能会累加好几个值。这种情况下，应该针对每个累加值重复一遍循环，将所有临时变量都替换为查询。

5. 编译，测试。

6. 在该临时变量向上实施**[Inline Temp](inline-method.html)**。


ps：运用此手法，可能会担心性能问题。和其他性能问题一样，我们现在不管它，因为它十有八九根本不会造成任何影响。若是性能真的出了问题，也可以在优化时期解决它。代码组织良好，往往能够发现更有效的优化方案：**如果没有进行重构，好的优化方案就可能与你失之交臂。**如果性能实在太糟糕，要把临时变量放回去也是很容易的。

## Example

首先，从一个简单函数开始：

```java
double getPrice(){
    int basePrice = _quanlity * _itemPrice;
    double discountFactor;
    if(basePrice > 1000) discountFactor = 0.95;
    else discountFactor = 0.98;
    return basePrice * discountFactor;
}
```

我希望将两个临时变量都替换掉。

先把临时变量声明为`final`，检查它们是否的确只被赋值一次：

```java
double getPrice(){
    final int basePrice = _quanlity * _itemPrice;
    final double discountFactor;
    if(basePrice > 1000) discountFactor = 0.95;
    else discountFactor = 0.98;
    return basePrice * discountFactor;
}
```

如果临时变量不只被赋值一次，就不该进行这项重构。

接下来开始替换临时变量。首先，把赋值动作的右侧的表达式提炼出来：

```java
double getPrice(){
    final int basePrice = basePrice();
    final double discountFactor;
    if(basePrice > 1000) discountFactor = 0.95;
    else discountFactor = 0.98;
    return basePrice * discountFactor;
}

double int basePrice(){
    return _quanlity * _itemPrice;
}
```

编译并测试，然后开始使用**[Inline Temp](inline-temp.html)**。首先将临时变量`basePrice`的第一个引用点替换掉：

```java
double getPrice(){
    final int basePrice = basePrice();
    final double discountFactor;
    if(basePrice() > 1000) discountFactor = 0.95;
    else discountFactor = 0.98;
    return basePrice * discountFactor;
}
```

编译、测试、将临时变量`basePrice`的下一个引用点替换掉。
替换完最后一个引用点后，把`basePrice`临时变量的声明式也一并去掉：

```java
double getPrice(){
    final double discountFactor;
    if(basePrice() > 1000) discountFactor = 0.95;
    else discountFactor = 0.98;
    return basePrice() * discountFactor;
}
```

以类似办法提炼出`discountFactor()`:

```java
double getPrice(){
    final double discountFactor = discountFactor();
    return basePrice() * discountFactor;
}

private double discountFactor(){
    if(basePrice() > 1000) return discountFactor = 0.95;
    else return discountFactor = 0.98;
}
```


最终，`getPrice()`变成了这样：

```java
double getPrice(){
    retrun basePrice() * discountFactor();
}
```

## 关联阅读

* [Inline Temp:(内联临时变量)](inline-temp.html)