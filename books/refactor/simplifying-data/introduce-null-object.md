---
layout: book
title: Introduce Null Object（引入Null对象）
book: refactor
group: simplifying-data
pre: replace-conditional-with-polymorphism
next: introduce-assertion
version: 1.0
---


## What

你需要再三检查某对象是否为`null`。

**将`null`值替换为`null`对象。**

**原始代码：**

```java
if (customer == null){
    plan = BillingPlan.basic();
}else{
    plan = customer.getPlan();
}
```

**引入Null对象：**

![Introduce Null Object](../images/introduce-null-object.png)