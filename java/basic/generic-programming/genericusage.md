---
layout: book
title: 范型的使用
java: basic
group: generic-programming
version: 1.0
---


## 泛型的使用

### 什么是泛型

**泛型**的作用是限定参数的一个范围，比如常用的集合`Collection<E>`表示集合中的元素的`E`类型。

### 使用泛型

- 限定`List`的元素只能是`String`

```java
List<String> list = new ArrayString<>();
list.add("hello");
list.add("world");
//list.add(i);//编译不通过
```

- 限定`List`的元素只能是`Integer`

```java
List<Integer> list = new ArrayString<>();
list.add(10010);
list.add(10086);
//list.add("hello world");//编译不通过
```

### 声明泛型

- 简单泛型

```java
public class Result<T>{
    //声明Result的data为T类型
    private T data;
    public Result<T>(T data){
        this.data = data;
    }
    //getter and setter
    ...
}

//Inteter
Result<Integer> intResult = new Result<>(100);
//String
Result<String> stringResult = new Result<>("hello world");
//List<String>
Result<List<String>> listStringResult = new Result<>(Arrays.asList("hello","world"));
```

- 泛型上限

```java
public interface Entity{}

//限定Result的data为Entity的子集
public class Result<T extends Entity>{}
```



### 获取泛型

- 获取字段`List`中的泛型


```java
public class TestClass{
    private List<String> list;
}

//get List String
Field listField = TestClass.class.getField("list");
Clsss stringClass = (Class)(((ParameterizedType)listField.getGenericType()).getActualTypeArguments()[0]);
```

- 获取类上的泛型

```java
public interface Entity<ID>{
    void setId(ID id);
}

public class Person implements Entity<Long>{}

// get Person Long
Type[] genericInterfaces = Person.class.getGenericInterfaces();
Type entityInterface = Arrays.stream(genericInterfaces)
.filter(it -> it instanceof ParameterizedType && ((ParameterizedType) it).getRawType().equals(Entity.class))
.collect(Collectors.toList()).get(0);
Class longClass = (Class) ((ParameterizedType) genericInterface).getActualTypeArguments()[0];
```
