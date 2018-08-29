---
layout: book
title: Replace Parameter with Explicit Methods（以明确函数取代参数）
book: refactor
group: making-method-calls-simpler
pre: parameterize-method
next: preserve-whole-object
version: 1.0
---


## What

你有一个函数，其中完全取决于参数值而采取不同行为。

**针对该参数的每一个可能值，建立一个独立函数。**


**原始代码：**

```java
void setValue (String name, int value) {
 if (name.equals("height"))
 _height = value;
 if (name.equals("width"))
 _width = value;
 Assert.shouldNeverReachHere();
}
```

**以明确函数取代参数：**

```java
void setHeight(int arg) {
    _height = arg;
}
void setWidth (int arg) { 
    _width = arg; 
}
```