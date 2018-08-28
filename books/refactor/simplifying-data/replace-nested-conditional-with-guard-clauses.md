---
layout: book
title: Replace Nested Conditional with Guard Clauses（以卫语句取代嵌套条件表达式）
book: refactor
group: simplifying-data
pre: remove-control-flag
next: replace-conditional-with-polymorphism
version: 1.0
---


## What

函数中的条件逻辑使人难以看清正常的执行路径。

**使用卫语句表现所有特殊情况。**


**原始代码：**

```java
double getPayAmount() {
 double result;
 if (_isDead) result = deadAmount();
 else {
 if (_isSeparated) result = separatedAmount();
 else {
 if (_isRetired) result = retiredAmount();
 else result = normalPayAmount();
 };
 }
return result;
};
```

**以卫语句取代嵌套条件表达式：**

```java
double getPayAmount() {
    if (_isDead) return deadAmount();
    if (_isSeparated) return separatedAmount();
    if (_isRetired) return retiredAmount();
    return normalPayAmount();
}
```