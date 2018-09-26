---
layout: book
title: 接口
java: basic
group: interfacelambdainlineclass
version: 1.0
---

## 接口

> 接口(interface)技术，主要用来描述类具有什么功能，而并不给出每个功能的具体实现。
>
> 一个类可以实现(implement)—个或多个接口。


### 接口的特性
- 接口不是类， 不能被实例化；

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


- 接口可以被扩展；

```java
public interface Moveable
{
    void move(double x, double y); 
}

public interface Powered extends Moveable {
    double milesPerGallon();
}
```


- 在接口中不能包含实例域或静态方法，可以包含常量；

```java
public interface Powered extends Moveable {
    double milesPerCallon();
.   double SPEED_LIHIT = 95; // a public static final constant double SPEED
}
```


- 与接口中的方法都自动地被设置为public—样，接口中的域将被自动设为public static final。



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

