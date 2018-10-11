---
layout: book
title: 接口
java: basic
group: interfacelambdainnerclass
version: 1.0
---

## 接口

> 接口(interface)技术，主要用来描述类具有什么功能，而并不给出每个功能的具体实现。
>
> 一个类可以实现(implement)—个或多个接口。


### 接口的特性
- 接口不是类，不能被实例化；

- 可以声明接口的变量；

```java
public interface Comparable<T> {
    int compareTo(T other);
}

Comparable x;
```

- 接口变量必须引用用实现了接口的类对象；

```java
x = new Employee(. . .); // provided Employee implements Comparable
```

- 可以使用instanceof检查一个对象是否实现了某个特定的接口；

```java
if (anObject instanceof Comparable) { . . . }
```


- 接口可以被扩展，在Java中，类的多继承是不合法，但接口允许多继承；

```java
public interface Moveable
{
    void move(double x, double y); 
}

public interface Powered extends Moveable {
    double milesPerGallon();
}

public interface Hockey extends Sports, Event{}
```


- 在接口中不能包含实例域或静态方法，可以包含常量；

```java
public interface Powered extends Moveable {
    double milesPerCallon();
.   double SPEED_LIHIT = 95; // a public static final constant double SPEED
}
```


- 与接口中的方法都自动地被设置为public—样，接口中的域将被自动设为public static final。



最常用的继承接口是没有包含任何方法的接口（标记接口）；

```java
package java.util;
public interface EventListener
{}
```
> 标记接口没有任何方法和属性的，它仅仅表明它的类属于一个特定的类型，供其他代码来测试允许做一些事情。
>
> 标记接口的作用：就是给某个对象打个标记，使对象拥有某个或某些特权。

> 标记接口主要用于两种目的：
* 建立一个公共的父接口：
正如EventListener接口，这是由几十个其他接口扩展的Java API，你可以使用一个标记接口来建立一组接口的父接口。例如：当一个接口继承了EventListener接口，Java虚拟机(JVM)就知道该接口将要被用于一个事件的代理方案。
* 向一个类添加数据类型：
这种情况是标记接口最初的目的，实现标记接口的类不需要定义任何接口方法(因为标记接口根本就没有方法)，但是该类通过多态性变成一个接口类型。


### 静态方法

> 在Java SE8中，允许在接口中增加静态方法。 


```java
public interface Path {
    public static Path get(String first, String... more) { 
        return Fi1eSystems.getDefault().getPath(first, more);
    }
}
```

### 默认方法

- 可以为接口方法提供一个默认实现。必须用`default`修饰符标记这样一个方法。

```java
public interface Comparable<T> {
    // By default, all elements are the same
    default int compareTo(T other) {  
        return 0; 
    } 
}
```

- 解决默认方法冲突

1. 超类优先。如果超类提供了一个具体方法，同名而且有相同参数类型的默认方法会被忽略。

2. 接口冲突。如果一个超接口提供了一个默认方法，另一个接口提供了一个同名而且参数类型(不论是否是默认参数)相同的方法，必须覆盖这个方法来解决冲突。示例如下：

```java
interface Named {
    default String getName() { 
        return getClass().getName() + "_" + hashCodeO; 
    } 
}

class Student implements Person, Named {
    public String getName() {
        return Person.super.getName(); 
    }
}
```
Student类会继承Person和Named接口提供的两个不一致的getName方法，并不是从中选择一 个，Java编译器会报告一个错误，让程序员来解决这个二义性。 只需要在Student类中提供一个 getName方法。在这个方法中可以选择两个冲突方法中的一个。

总结：
- 如果至少有一个接口提供了一个实现， 编译器就会报告错误，而程序员就必须解决这个二义性。
- 如果两个接口都没有为共享方法提供默认实现，那么就不存在冲突。实现类可以有两个选择：实现这个方法；或者不实现（不实现的话，这个类就是抽象类）。


##  接口示例

### 接口与回调

> 回调(callback)是一种常见的程序设计模式。在这种模式中，可以指出某个特定事件发生时应该采取的动作。

在java.swing包中有一个Timer类，可以使用它在到达给定的时间间隔时发出通告。
如何告之定时器做什么呢? 在很多程序设计语言中，可以提供一个函数名，定时器周期性地调用它。 但是，在Java标准类库中的类采用的是面向对象方法。它将某个类的对象传递给定时器， 然后，定时器调用这个对象的方法。由于对象可以携带一些附加的信息，所以传递一个对象比传递一个函数要灵活得多。


示例：当到达指定的时间间隔时，定时器就调用actionPerformed方法。
```java
import java.awt.Toolkit;
import java.awt.event.ActionEvent;c
import java.awt.event.ActionListener;
import java.util.Date;
import javax.swing.JOptionPane;
import javax.swing.Timer;

public class InterfaceExamplePractice {

  public static void main(String[] args) {
    ActionListener listener = new TimePrinter();
    Timer t = new Timer(10000, listener);
    t.start();
    JOptionPane.showMessageDialog(null, "Quit program?");
    System.exit(0);
  }
}

class TimePrinter implements ActionListener {

  @Override
  public void actionPerformed(ActionEvent e) {
    System.out.println("At the tone, the time is " + new Date());
    Toolkit.getDefaultToolkit().beep();
  }
}
```


### Comparator接口

> 如何对一个对象数组排序? 前提是这些对象是实现了Comparable接口的类的实例。例如：可以对一个字符串数组排序，因为String类实现了Comparable<String>；
> 
> ArrayS.Sort方法还有第二个版本，有一个数组和一个比较器(comparator)作为参数，比较器是实现了`Comparator`接口的类的实例。

```java
public interface Comparators { 
    int compare(T first, T second);
}
```

要按长度比较字符串，可以如下定义一个实现`Comparator<String>`的类：

```java
import static java.util.Arrays.asList;

import java.util.Arrays;
import java.util.Comparator;

public class ComparatorPractice {

  public static void main(String[] args) {
    String[] friends = {"Peter", "Pa", "Mary"};
    Arrays.sort(friends, new LengthComparator()); // sort result: [Pa, Mary, Peter]
  }
}

class LengthComparator implements Comparator<String> {

  public int compare(String first, String second) {
    return first.length() - second.length();
  }
}
```

具体完成比较时，需要建立一个实例，这个compare方法要在比较器对象上调用，而不是在字符串本身上调用。
```java
Comparator<String> comp = new LengthComparator();
if ( comp.compare(words[i], words[j] ) > 0) ...
```


### 对象克隆

> `Cloneable`接口，这个接口指示一个类提供了一个安全的clone方法。
>
> 如果希望copy是一个新对象，它的初始状态与original相同，但是之后它们各自会有自己不同的状态，这种情况下就可以使用clone方法。

`Cloneable`接口是Java提供的一组标记接口(tagginginterface)之一。标记接口不包含任何方法; 它唯一的作用就是允许在类型查询中使用instanceof。


```java
import java.util.Date;
import java.util.GregorianCalendar;

public class CloneablePractice {

  public static void main(String[] args) {
    try {
      Employee original = new Employee("John Q. Public", 5000);
      original.setHireDay(2018, 1, 1);
      Employee copy = original.clone();
      copy.raiseSalary(50);
      copy.setHireDay(2018, 12, 31);
      System.out.println("original: " + original.toString());
      System.out.println("copy: " + copy.toString());
    } catch (CloneNotSupportedException e) {
      e.printStackTrace();
    }
  }
}

class Employee implements Cloneable {

  private String name;
  private double salary;
  private Date hireDay;

  public Employee(String name, double salary) {
    this.name = name;
    this.salary = salary;
    this.hireDay = new Date();
  }

  public Employee clone() throws CloneNotSupportedException {
    Employee cloned = (Employee) super.clone();
    cloned.hireDay = (Date) hireDay.clone();
    return cloned;
  }

  public void setHireDay(int year, int month, int day) {
    Date newHireDay = new GregorianCalendar(year, month - 1, day).getTime();
    hireDay.setTime(newHireDay.getTime());
  }

  public void raiseSalary(double byPercent) {
    double raise = salary * byPercent / 100;
    salary += raise;
  }

  public String toString() {
    return "Employee[name=" + name + ", salary=" + salary + ", hireDay: " + hireDay + "]";
  }
}
```

运行结果：
```java
original: Employee[name=John Q. Public, salary=5000.0, hireDay: Mon Jan 01 00:00:00 CST 2018]
copy: Employee[name=John Q. Public, salary=7500.0, hireDay: Mon Dec 31 00:00:00 CST 2018]
```
