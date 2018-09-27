---
layout: book
title: lambda表达式
java: basic
group: interfacelambdainlineclass
version: 1.0
---

## lambda表达式

> lambda表达式是一个可传递的代码块，可以在以后执行一次或多次。

### lambda 表达式的语法

> lambda表达式就是一个代码块，以及必须传人代码的变量规范。

* lambda表达式形式：参数，箭头(->)以及一个表达式：

```java
(String first, String second)
-> first.length() - second.length()
```

* 如果代码要完成的计算无法放在一个表达式中，就可以像写方法一样，把这些代码放在{}中，并包含显式的return语句：

```java
(String first, String second) ->
{ 
    if (first.lengthO < second.lengthO) return -1;
    else if (first.lengthO > second.lengthO) return 1;
    else return 0;
 }
```

* 如果方法只有一个参数，而且这个参数的类型可以推导得出，那么甚至还可以省略小括号：

```java
ActionListener listener = event ->
    Sysyem.println("The time is " + new Date()");
```


* 即使lambda表达式没有参数，仍然要提供空括号，就像无参数方法一样：

```java
() -> {
      for (int i = 100; i >= 0; i--) {
        System.out.println(i);
      }
    }
```

* 无需指定lambda表达式的返回类型，lambda表达式的返回类型总是会由上下文推导得出；


* `notice:`
如果一个lambda表达式只在某些分支返回一个值，而在另外一些分支不返回值，这是不合法的。例如，```java (int x) -> { if (x >= 0) return 1; } ```就不合法。


示例：在一个比较器和一个动作监听器中使用lambda表达式：
```java
import java.util.Arrays;
import java.util.Date;
import javax.swing.Timer;

public class LambdaPractice {
  public static void main(String[] args) {
    String[] planets = new String[] { "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune" };
    System.out.println (Arrays.toString (planets)) ;
    System.out.println("Sorted in dictionary order:");
    Arrays.sort(planets);
    System.out.println (Arrays.toString(planets));
    System.out.println("Sorted by length:");
    Arrays.sort(planets, (first, second) -> first.length() - second.length());
    System.out.println(Arrays.toString(planets));
    Timer t = new Timer(1000, event -> System.out.println("The time is " + new Date()));
    t.start();
  }
}
```
