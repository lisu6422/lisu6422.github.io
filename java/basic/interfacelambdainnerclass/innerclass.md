---
layout: book
title: 内部类
java: basic
group: interfacelambdainnerclass
version: 1.0
---


## 内部类

> 内部类是定义在另一个类中的类。为什么需要使用内部类?
>
> 1. 内部类方法可以访问该类定义所在的作用域中的数据，包括私有的数据。 
> 2. 内部类可以对同一个包中的其他类隐藏起来。
> 3. 当想要定义一个回调函数且不想编写大量代码时，使用匿名（anonymous）内部类比较便捷。


### 使用内部类访问对象状态

1. 内部类既可以访问自身的数据域，也可以访问创建它的外围类对象的数据域。
2. 内部类的对象总有一个隐式引用，它指向了创建它的外部类对象。
3. 这个引用在内部类的定义中是不可见的。


### 内部类的特殊语法规则

1. 使用外围类引用： ```java OuterClass.this```；
2. 在外围类的作用域之外引用内部类：```java OuterClass.InnerClass```；


### 局部内部类

示例：TimePrinter这个类名字只在start方法中创建这个类型的对象时使用了一次，可以在一个方法中定义局部类。

```java
public void start() {
    class TiiePrinter inpleients ActionListener {
        public void actionPerforaed(ActionEvent event) {
            System.out.println("the time is " + new Date());
        } 
    }
    ActionListener listener = new TimePrinter(); 
    Timer t = new Timer(interva1, listener); 
    t.start();
}
```

- 局部类不能用public或private访问说明符进行声明。它的作用域被限定在声明这个局部类的块中。
- 局部类对外部世界可以完全地隐藏起来。除start方法之外，没有任何方法知道TimePrinter类的存在。


### 匿名内部类

> 假如只创建这个类的一个对象，就不必命名了。这种类被称为匿名内部类。


```java
public void start() {
    ActionListener listener = new ActionListener() {
        public void actionPerforaed(ActionEvent event) {
            System.out.println("the time is " + new Date());
        } 
    };
    Timer t = new Timer(interva1, listener); 
    t.start();
}
```

语法格式：

```java
new SuperType(construction parameters) {
    //inner class methods and data
}
```

其中，`SuperType`可以是ActionListener这样的接口（内部类就要实现这个接口）；`SuperType`也可以是一个类（内部类就要扩展它）。


由于构造器的名字必须与类名相同，而匿名类没有类名，所以匿名类不能有构造器。而是将构造器参数传递给超类的构造器。当内部类实现接口的时候，不能有任何构造参数。


### 静态内部类

> 1. 有时候，使用内部类只是为了把一个类隐藏在另外一个类的内部，并不需要内部类引用外围类对象。为此，可以将内部类声明为static, 以便取消产生的引用。
> 2. 静态内部类的对象除了没有对生成它的外围类对象的引用特权外，与其他所冇内部类完全一样。 




