---
layout: book
title: Consolidate Duplicate Conditional Fragments（合并重复的条件片段）
book: refactor
group: simplifying-data
pre: consolidate-conditional-expression
next: remove-control-flag
version: 1.0
---


## What

在条件表达式的每个分支上有着相同的一段代码。

**将这段重复代码搬移到条件表达式之外。**


**原始代码：**

```java
if (isSpecialDeal()) {
    total = price * 0.95;
    send();
}
else {
    total = price * 0.98;
    send();
}
```

**合并重复的条件片段：**

```java
if (isSpecialDeal()){
    total = price * 0.95;
}else{
     total = price * 0.98;
 }
send();
```