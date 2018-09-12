---
layout: book
title: 反射
java: basic
group: reflect
version: 1.0
---

## Java反射

### Class的组成

* 包名
* 类名
* Class对象
* Constructor
* Field
* Method
* Annotation


### 获取Class对象
反射机制的入口为Class对象，获取Class对象的几种方式：

* `类.class`
* `对象.getCLass()`
* `Class.forName("clazzName")`

#### 类.class
这种方式最直接，但仅能获取到已知的类的Class对象，也就是工程内可见的类可以通过这种方式获取Class对象；但是对于未知的类（或者说不可见的类）是不能获取到Class对象的。

#### 对象.getClass()
Java中的祖先类Object提供了一个方法getClass()来获取当着实例的Class对象，这种方式是开发中用的最多的方式，同样，它也不能获取到未知的类，比如说某个接口的实现类的Class对象。

#### Class.forName("className")
这种方式是可以获取到任何类的Class对象，前提是该类存在，否则会抛出ClassNotFoundException异常。通过这种方式，我们只需要知道类的名称（完全限定名）即可获取到其Class对象（如果存在的话）。


### 获取Constructor

* `getConstructors()`
* `getConstructor(Class<?>... parameterTypes)`
* `getDeclaredConstructors()`
* `getDeclaredConstructor(Class<?>... parameterTypes)`

### 创建对象实例

* `clazz.newInstance()`
* `constructor.newInstance(Object ... initargs)`

### 获取Field

* `getFields()`:获取`Class`对象中所有的被`public`修饰的`Field`，包含继承子父类的。
* `getField(String fieldName)`：获取`Class`对象中名称为`name`被`public`修饰的`Field`，包含继承子父类的。
* `getDeclaredFields()`：获取`Class`对象中所有的`Field`，不包含继承子父类的。
* `getDeclaredField(String fieldName)`：获取`Class`对象中名称为`name`的`Field`，不包含继承子父类的。

### 获取Method

* `getMethods()`
* `getMehtod(String methodName,Class<?>... parameterTypes)`
* `getDeclaredMethods()`
* `getDeclaredMethod(String methodName,Class<?>... parameterTypes)`