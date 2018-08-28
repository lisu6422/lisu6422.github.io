---
layout: book
title: Introduce Asserion（引入断言）
book: refactor
group: simplifying-data
pre: introduce-null-object
next: ../making-method-calls-simpler/rename-method
version: 1.0
---


## What

某一段代码需要对程序状态做出某种假设。

**以断言明确表现这种假设。**


**原始代码：**

```java
double getExpenseLimit() {
    // should have either expense limit or a primary project
    return (expenseLimit != NULL_EXPENSE) ? expenseLimit :
 primaryProject.getMemberExpenseLimit(); }
```

**引入断言：**

```java
 double getExpenseLimit() {
    Assert.isTrue (expenseLimit != NULL_EXPENSE || primaryProject != null);
    return (expenseLimit != NULL_EXPENSE) ? expenseLimit : primaryProject.getMemberExpenseLimit();
 }
```