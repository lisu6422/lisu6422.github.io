---
layout: book
title: Substitute Algorithm（替换算法）
book: refactor
group: composing-methods
pre: replace-method-with-method-object
next: ../moving-features-between-objects/move-method
version: 1.0
---


## What

你想要把某个算法替换为另一个更清晰的算法。

**将函数本体替换为另一个算法。**


**原始代码：**

```java
String fonudPerson(String[] people){
    for(int i = 0; i < people.length; i++) {
        if(people[i].equals("Don") {
            return "Don";
        }
        if(people[i].equals("John") {
            return "John";
        }
        if(people[i].equals("Kent") {
            return "Kent";
        }
    }
}
```

**替换算法：**

```java
String fonudPerson(String[] people){
    List candidates = Arrays.asList(new String[]{"Don","John","Kent"})
    for(int i = 0; i < people.length; i++) {
        if(candidates.contains(people[i])){
            return people[i];
        }
    }
    return "";
}


```