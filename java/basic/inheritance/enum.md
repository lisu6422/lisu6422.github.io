---
layout: book
title: 枚举类
java: basic
group: inheritance
version: 1.0
---

## 枚举类


```java
public enum Size { SMALL, MEDIUM, LARGE, EXTRAJARGE };
```

>  这个声明定义的类型是一个类，它刚好有4个实例，在此尽量不要构造新对象。

> 因此，在比较两个枚举类型的值时，永远不需要调用equals,而直接使用“ = = ”就
可以了。


可以在枚举类型中添加一些构造器、方法和域。构造器只是在构
造枚举常量的时候被调用。


```java
public enum Size {
  SMALL("S"), MEDIUM("M"), LARGE("L"), EXTRA_LARGE("XL");
  private String abbreviation;

  Size(String abbreviation) {
    this.abbreviation = abbreviation;
  }

  public String getAbbreviation() {
    return abbreviation;
  }
}
```


所有的枚举类型都是 Enum 类的子类。它们继承了这个类的许多方法。

* static Enum valueOf(Class enumClass, String name)

  返回指定名字、 给定类的枚举常量。 

* String toString()

  返回枚举常量名。 

*  static Enum[] values()
 
  每个枚举类型都有一个静态的values方法，它将返回一个包含全部枚举值的数组。


```java
Size[] values = Size.values();
``


* int ordinal()

  返回枚举常量在enum声明中的位置， 位置从0开始计数。 

* int compareTo(E other)

  如果枚举常量出现在 Other 之前， 则返回一个负值; 如果 this= othe，r 则返回 0; 否则， 返回正值。枚举常量的出现次序在 enum 声明中给出。
