---
layout: book
title: Replace Error Code with Exception（以异常取代错误码）
book: refactor
group: making-method-calls-simpler
pre: encapsulate-downcast
next: replace-exception-with-test
version: 1.0
---

## What

某个函数返回一个特定的代码，用以表示某种错误情况。

**改用异常。**


**原始代码：**

```java
int withdraw(int amount) {
    if (amount > _balance)
        return -1;
    else {
        _balance -= amount;
        return 0;
    }
}
```

**以异常取代错误码：**

```java
void withdraw(int amount) throws BalanceException {
     if (amount > _balance) throw new BalanceException();
 _balance -= amount;
}
```