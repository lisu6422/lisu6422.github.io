---
layout: book
title: Decompose Conditional（分解条件表达式）
book: refactor
group: simplifying-data
pre: ../organizing-data/replace-subclass-with-fields
next: consolidate-conditional-expression
version: 1.0
---


## What

你有一个复杂的条件`（if-then-else）`语句。

**从`if`、`then`、`else`三个段落中分别提炼出独立函数。**


**原始代码：**

```java
if (date.before (SUMMER_START) || date.after(SUMMER_END)){
    charge = quantity * _winterRate + _winterServiceCharge;
}else{
    charge = quantity * _summerRate;
} 
```

**分解条件表达式：**

```java
if (notSummer(date)){
    charge = winterCharge(quantity);
}else{
    charge = summerCharge (quantity);
}
```