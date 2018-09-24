---
layout: book
title: 可变参数
java: basic
group: inheritance
version: 1.0
---


## 参数数量可变的方法

```java
public PrintStream printf(String format, Object ... args) {
        return format(format, args);
    }
```

> 这里的省略号...是Java代码的一部分，它表明这个方法可以接收任意数量的对象(除format参数之外)。
> printf方法接收两个参数， 一个是格式字符串， 另一个是 Object[]数组，其中保存着所有的参数(如果调用者提供的是整型数组或者其他基本类型的值，自动装箱功能将把它们转换成对象)。现在将扫描format字符串， 并将第i个格式说明符与args[i] 的值匹配起来。


也可以自定义可变参数的方法，并将参数指定为任意类型，或者是基本类型。下面是简单的示例: 


* 示例一：打印若干字符串


```java
private static void print(String... strings) {
    StringBuffer stringBuffer = new StringBuffer();
    for (String s : strings) {
      stringBuffer.append(s).append(" ");
    }
    System.out.println(stringBuffer);
}
```


* 示例二：计算若干个数值的最大值



```java
private static double max(double... values) {
    double largest = Double.NEGATIVE_INFINITY;
    for (double v : values) {
      if (v > largest) {
        largest = v;
      }
    }
    return largest;
}

double max = max(-3.1, -40.4, -5);
```


`notice:`
* 这个可变参数必须放在所有参数的后面。
* 两个多参数，能不能放在同一个方法里面呢？答案是不可以的，其实我们尝试的去创建一个这样的方法的时候，编译器自动会提示你The variable argument type int of the method out must be the last parameter显然我们这样做是不可以的，同时也就是决定了一个方法只能有一个可变参数并且必须放置在参数列表的最后面。


`advantage:`
* 减少了参数的数量，看起来更加简洁。
* 适用于参数类型确定，但是，参数数量不确定的情况。
* 在一定程度上减少重载方法的数量。











