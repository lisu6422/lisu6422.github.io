---
layout: book
title: Pull Up Constructor Body（构造函数本体上移）
book: refactor
group: dealing-with-generalization
pre: pull-up-method
next: push-down-method
version: 1.0
---


## What

你在各个子类中拥有一些构造函数，它们的本体几乎完全一致。

**在超类中新建一个构造函数，并在子类构造函数中调用它。**


**原始代码：**

```java
class Manager extends Employee {
    public Manager (String name, String id, int grade) {
         _name = name;
         _id = id;
         _grade = grade;
    }
}

```

**构造函数本体上移：**

```java
public Manager (String name, String id, int grade) {
    super (name, id);
    _grade = grade;
}
```