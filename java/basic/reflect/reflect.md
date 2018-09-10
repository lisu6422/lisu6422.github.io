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


### 获取Class

* `类.class`
* `object.getCLass()`
* `Class.forName("clazzName")`


### 获取Constructor

* `getConstructors()`
* `getConstructor(Class<?>... parameterTypes)`
* `getDeclaredConstructors()`
* `getDeclaredConstructor(Class<?>... parameterTypes)`

### 创建对象实例

* `clazz.newInstance()`
* `constructor.newInstance(Object ... initargs)`

### 获取Field

* `getFields()`
* `getField(String fieldName)`
* `getDeclaredFields()`
* `getDeclaredField(String fieldName)`

### 获取Method

* `getMethods()`
* `getMehtod(String methodName,Class<?>... parameterTypes)`
* `getDeclaredMethods()`
* `getDeclaredMethod(String methodName,Class<?>... parameterTypes)`