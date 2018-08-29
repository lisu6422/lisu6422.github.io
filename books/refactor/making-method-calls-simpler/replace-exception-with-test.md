---
layout: book
title: Replace Exception with Test（以测试取代异常）
book: refactor
group: making-method-calls-simpler
pre: replace-error-code-with-exception
next: ../dealing-with-generalization/pull-up-field
version: 1.0
---


## What

面对一个调用前可能预先检查的条件，你抛出了一个异常。

**修改调用者，使它在调用函数之前先做检查。**


**原始代码：**

```java
double getValueForPeriod (int periodNumber) {
    try {
        return _values[periodNumber];
    } catch (ArrayIndexOutOfBoundsException e) {
        return 0;
    }
}
```

**以测试取代异常：**

```java
double getValueForPeriod (int periodNumber) {
    if (periodNumber >= _values.length) return 0;
    return _values[periodNumber];
}
```