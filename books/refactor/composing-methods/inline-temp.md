---
layout: book
title: Inline Temp（内联临时变量）
book: refactor
group: composing-methods
pre: inline-method
next: replace-temp-with-query
---


## What

你有一个临时变量，只被一个简单表达式赋值一次，而它防碍了其他重构手法。

**将所有对该变量的引用动作，替换为对它赋值的那个表达式自身。**


**原始代码：**

```java
double basePrice = anOrder.basePrice();
retrun basePrice > 1000;
```

**内联临时变量：**

```java
return anOrder.basePrice() > 1000;
```

## Why

**Inline Temp**多半是作为**[Replace Temp with Query](replace-temp-with-query.md)**的一部分使用的，所以真正的动机出现在后者那儿。

唯一单独使用**Inline Temp**的情况是：你发现某个临时变量被赋予某个函数调用的返回值。

一般来说，这样的临时变量不会有任何危害，可以放心地把它留在那儿。但如果这个临时变量防碍了其他的重构手法，例如**[Extract Method](extract-method.md)**，你就应该将它内联化。

## How

1. 检查给临时变量赋值的语句，确保等号右边的表达式没有副作用。

2. 如果这个临时变量并未被声明为`final`，那就将它声明为`final`，然后编译。

    > 这可以检查该临时变量是否真的只被赋值一次。
    
3. 找到该临时变量的所有引用点，将它们替换为"为临时变量赋值"的表达式。

4. 每次修改后，编译并测试。

5. 修改完所有引用点之后，删除该临时变量的声明和赋值语句。

6. 编译，测试。

## 关联阅读

* [Introduce explaining variable:(引入解释性变量)](introduce-explaining-variable.md)