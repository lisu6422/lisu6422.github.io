---
layout: book
title: Inline Method（内联函数）
book: refactor
group: composing-methods
pre: extract-method
next: inline-temp
---

## What

一个函数的本体与名称同样清楚易懂。

**在函数调用点插入函数本体，然后移除该函数。**


**原始代码：**

```java
int getRating() {
  return (moreThanFiveLateDeliveries()) ? 2 : 1;
}
boolean moreThanFiveLateDeliveries() {
  return _numberOfLateDeliveries > 5;
}
```

**内联函数：**

```java
int getRating() {
  return (_numberOfLateDeliveries > 5) ? 2 : 1;
}
```

## Why

虽然以简短的函数表现动作意图，可以使代码更清晰易读。但是，当函数的内容和其名称同样清晰时，间接调用函数没有意义。

## When

* 当遇到某些函数，其内部代码和函数名称同样清晰易读时，那么就去掉这个函数，直接使用其中的代码。

* 当有一堆组织不甚合理的函数，可以将它们都内联到一个大型函数中，再从中提炼出组织合理的小型函数。

* 如果别人使用了太多间接层，使得系统中的所有函数都似乎只是对另一个函数的简单委托，导致我们在这些委托动作之间晕头转向，那么通常都会使用**Inline Method**。当然，间接层有其价值，但不是所有间接层都有价值。

## How

1. 检查函数，确定它不具多态性。
    
    > 如果子类继承了这个函数，就不要将此函数内联。

2. 找出这个函数的所有被调用点。

3. 将这个函数的所有被调用点都替换为函数本体。

4. 编译，测试。

5. 删除该函数的定义。


ps：**Inline Method**看起来似乎很简单，但情况往往并非如此。对于递归调用、多返回点、内联至另一个对象中而该对象并无提供访问函数(?)……，如果遇到了这样的复杂情况，那么就不应该使用这个重构手法。

## 下一篇

* [Inline Temp(内联临时变量)](inline-temp.html)