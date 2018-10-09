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


### 函数式接口

> 对于只有一个抽象方法的接口（在JavaSE 8中，接口可以声明非抽象方法），需要这种接口的对象时，就可以提供一个lambda表达式。这种接口称为函数式接口(functional interface)。  


* 下面以Arrays.sort方法为例展示如何转换为函数式接口。
它的第二个参数需要一个Comparator实例，Comparator就是只有一个方法的接口，所以可以提供一个lambda表达式：

```java
Arrays .sort (words ,
(first, second) -> first.length() - second.length());
```

在底层，Arrays.sort方法会接收实现了Comparator<String>接口的某个类的对象，在这个对象上调用compare方法会执行lambda表达式的方法体。 这些对象和类的管理完全取决于具体实现。（把lambda表达式看作是一个函数，而不是一个对象，lambda表达式可以传递到函数式接口）


* 在Java中，对lambda表达式所能做的也只是能转换为函数式接口。


* 类似Comparator的接口往往有一个特定的用途，而不只是提供一个有指定参数和返回类型的方法。例如：

ArrayList类有一个removelf方法，它的参数就是一个Predicate（谓词），这个接口专门用来传递lambda表达式。 例如，`list.removelf(e -> e == null)`将从一个数组列表删除所有null值。


### 方法引用

  > 当已经有现成的方法可以完成你想要传递到其他代码的某个动作，可以直接传递该方法。


方法引用要用`::`操作符分隔方法名与对象或类名。主要有3种情况：
* object :: instanceMethod
* Class :: static Method
* Class :: instanceMethod

1. 在前2种情况中，方法引用等价于提供方法参数的lambda表达式。例如，`System.out::println`等价于 `x -> System.out.println(x)`；`Math::pow`等价于`(x，y) -> Math.pow(x, y)`。

2. 对于第3种情况，第1个参数会成为方法的目标。例如，`String::compareToIgnoreCase`等同于`(x, y) -> x.compareToIgnoreCase(y)`。

3. notice：如果有多个同名的重栽方法，编译器就会尝试从上下文中找出你指的那一个方法。

4. 可以在方法引用中使用`this`参数。例如，`this::equals`等同于`x -> this.equals(x)`；使用`super`，例如：`super::instanceMethod`，会调用给定方法的超类版本。


### 构造器引用

> 构造器引用与方法引用很类似，只不过方法名为`new`。
>
> 例如，`Person::new`是Person构造器的一个引用。哪一个构造器呢? 这取决于上下文。


```java
List<String> names = Arrays.asList("name1", "name2");
Stream<Person> stream = names.stream().map(Person::new); 
List<Person> people = stream.col1ect(Col1ectors.toList());
```

上述代码可以把一个字符串列表转换为一个Person对象数组。

* 可以用数组类型建立构造器引用。 例如，`int[]::new`是一个构造器引用，它有一个参数：即数组的长度。这等价于lambda表达式`x -> new int[x]`。

* 但是，Java有一个限制，无法构造泛型类型T的数组。

* 例如，假设我们需要一个Person对象数组。Stream接口有一个toArray方法可以返回Object数组：

  ```java
  Object[] people = stream.toArray();
  ``` 
可以把`Person[]::new`传入toArray方法：

  ```java
  Person[] people = stream.toArray(Person[]::new);
  ```
toArray方法调用这个构造器来得到一个正确类型的数组，然后填充这个数组并返回。


### 变量作用域

* lambda表达式有3个部分：
1. 一个代码块；
2. 参数；
3. 自由变量的值，这是指非参数而且不在代码中定义的变量。


* lambda表达式可以捕获外围作用域中变量的值。lambda表达式中捕获的变量必须实际上是最终变量：
1. 在lambda表达式中，只能引用值不会改变的变量（如果在lambda表达式中改变变量，并发执行多个动作时就会不安全）。
2. 如果在lambda表达式中引用变量，而这个变量可能在外部改变，这也是不合法的。


### 处理lambda表达式

使用lambda表达式的重点是延迟执行（deferred execution）。之所以希望以后再执行代码，有很多原因：
1. 在一个单独的线程中运行代码；
2. 多次运行代码；
3. 在算法的适当位置运行代码(例如：排序中的比较操作) ；
4. 发生某种情况时执行代码(例如：点击了一个按钮，触发事件) ；
5. 只在必要时才运行代码；













