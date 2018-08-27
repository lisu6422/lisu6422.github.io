---
layout: book
title: Replace Method with Method Object（以函数对象取代函数）
book: refactor
group: composing-methods
pre: remove-assignments-to-parameters
next: substitute-algorithm
version: 1.0
---


## What

你有一个大型函数，其中对局部变量的使用使你无法采用**[Extract Method](extract-method.md)**。

**将这个函数放进一个单独对象中，如此一来局部变量就成了对象内的字段。然后你可以在同一个对象中将这个大型函数分解为多个小型函数。**


**原始代码：**

```java
class Order {
    double price() {
        double primaryBasePirce;
        double secondaryBasePrice;
        doublt tertiartBasePrice;
        // long computation;
    }
}
```

**以函数对象取代函数：**

```java
class Order {
    double price() {
        return new PriceCalculator(this).compute();
    }
}

class PriceCalculator {
    private double primaryBasePirce;
    private double secondaryBasePrice;
    private double tertiartBasePrice;
    
    public PriceCalculator(Order order){
        // init field
    }

    public double compute() {
        // long computation;
    }

}
```