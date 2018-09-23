---
layout: book
title: Stream流
java: basic
group: stream
version: 1.0
---


# Stream

## 如何构建

当我们使用一个流的时候，通常包括三个基本步骤：

获取一个数据源（source）→ 数据转换→执行操作获取想要的结果，每次转换原有 Stream 对象不改变，返回一个新的 Stream 对象（可以有多次转换），这就允许对其操作可以像链条一样排列，变成一个管道，如下图所示。

![流管道 (Stream Pipeline) 的构成](https://www.ibm.com/developerworks/cn/java/j-lo-java8streamapi/img001.png)



多种方式生成`Stream Source:`

* 从`Collection`数组
  * `Collection.stream()`
  * `Collection.parallelStream()`
  * `Arrays.stream(T array)` or `Stream.of()`
* 从`BufferedREader`
  * `java.io.BufferedReader.lines()`
* 静态工厂
  * `java.util.stream.IntStream.range()`
  * `java.nio.file.Files.walk()`
* 自己构建
  * `java.util.Spliterator`
* 其它
  * `Random.ints()`
  * `BitSet.stream()`
  * `Pattern.splitAsStream(java.lang.CharSequence)`
  * `JarFile.stream()`

## 操作方式

流的操作类型分为两种：

- **Intermediate**：一个流可以后面跟随零个或多个 `intermediate` 操作。其目的主要是打开流，做出某种程度的数据映射/过滤，然后返回一个新的流，交给下一个操作使用。这类操作都是惰性化的（lazy），就是说，仅仅调用到这类方法，并没有真正开始流的遍历。
- **Terminal**：一个流只能有一个 `terminal` 操作，当这个操作执行后，流就被使用“光”了，无法再被操作。所以这必定是流的最后一个操作。`Terminal` 操作的执行，才会真正开始流的遍历，并且会生成一个结果，或者一个 `side effect`。

### 流的操作

常见的操作可以归类如下。

- `Intermediate`：

  `map (mapToInt, flatMap 、、、)`、 `filter`、 `distinct`、 `sorted`、 `peek`、 `limit`、 `skip`、 `parallel`、 `sequential`、 `unordered`

- `Terminal`：

  `forEach`、 `forEachOrdered`、 `toArray`、 `reduce`、 `collect`、 `min`、 `max`、 `count`、 `anyMatch`、 `allMatch`、 `noneMatch`、 `findFirst`、 `findAny`、 `iterator`

- `Short-circuiting`：

  `anyMatch`、 `allMatch`、 `noneMatch`、 `findFirst`、 `findAny`、 `limit`

#### 1. map/flatMap

`map`的作用就是把 `input Stream` 的每一个元素，映射成 `output Stream` 的另外一个元素。

* 转换大写

```java
List<String> output = wordList.stream().map(String::toUpperCase).collect(Collectors.toList());
```

这段代码把所有的单词转换为大写。

* 平方数

```java
List<Integer> nums = Arrays.asList(1, 2, 3, 4);
List<Integer> squareNums = nums.stream().map(n -> n * n).collect(Collectors.toList());
```

这段代码生成一个整数 list 的平方数 {1, 4, 9, 16}。

从上面例子可以看出，map 生成的是个 1:1 映射，每个输入元素，都按照规则转换成为另外一个元素。还有一些场景，是一对多映射关系的，这时需要 `flatMap`。

* 一对多

```java
Stream<List<Integer>> inputStream = Stream
        .of(Arrays.asList(1), Arrays.asList(2, 3), Arrays.asList(4, 5, 6));
    Stream<Integer> outputStream = inputStream.flatMap((childList) -> childList.stream());
```

`flatMap`把`input Stream`中的层级结构扁平化，就是将最底层元素抽出来放到一起，最终`output`的新`Stream`里面已经没有`List`了，都是Integer类型的元素。

#### 2. filter

`filter`对原始`Stream`进行某项测试，通过测试的元素被留下来生成一个新`Stream`。

* 保留大于3的元素

```java
List<Integer> lists = asList(4, 3, 6, 1, 5, 2);
List<Integer> collect = lists.stream()
        .filter(elem -> elem > 3).collect(Collectors.toList());
```

经过条件“>3”的 filter，剩下的数字为 {4, 6, 5}。



#### 3. forEach

> `forEach`方法接收一个Lambda表达式，然后在Stream的每一个元素上执行该表达式。

> `forEach`是terminal操作，因此它执行后，Stream的元素就被“消费”掉了，你无法对一个Stream进行两次terminal运算。

> `forEach`不能修改自己包含的本地变量值，也不能用break/return之类的关键字提前结束循环。


具有相似功能的intermediate操作peek:

* `peek`对每个元素执行操作并返回一个新的Stream

```java
Stream.of("one", "two", "three", "four").filter(e -> e.length() > 3)
        .peek(e -> System.out.println("Filtered value: " + e)).map(String::toUpperCase)
        .peek(e -> System.out.println("Mapped value: " + e)).collect(Collectors.toList());
```



#### 4. findFirst

> 这是一个termimal兼short-circuiting操作，它总是返回Stream的第一个元素，或者空。

> 它的返回值类型：Optional。

> Stream中的`findAny、max/min、reduce`等方法等返回Optional值。


#### 5. reduce

> `reduce`主要作用是把Stream元素组合起来。它提供一个起始值（种子），然后依照运算规则（BinaryOperator），和前面Stream的第一个、第二个、第 n 个元素组合。从这个意义上说，字符串拼接、数值的 sum、min、max、average 都是特殊的 reduce。例如 Stream 的 sum 就相当于

```java
List<Integer> lists = asList(4, 3, 6, 1, 5, 2);
Optional<Integer> sum1 = lists.stream().reduce((a, b) -> a + b); 
Integer sum2 = lists.stream().reduce(0, (a, b) -> a + b);
Integer sum3 = lists.stream().reduce(0, Integer::sum);
```

没有起始值的情况，会把Stream的前面两个元素组合起来，返回的是 Optional。


#### 6. limit/skip

> `limit`返回Stream的前n个元素。
> `skip`则是扔掉前n个元素。



#### 7. sorted

> `sorted`用于对Stream的排序，它可以先对Stream进行各类`map、filter、limit、skip`甚至`distinct`来减少元素数量后，再排序，这能帮助程序明显缩短执行时间。

##### 清单 18. 优化：排序前进行 limit 和 skip

```java
public static class Person {

    private int no;
    private int age;
    private String name;

    public Person(int no, int age, String name) {
      this.no = no;
      this.age = age;
      this.name = name;
    }

    public int getNo() {
      return no;
    }

    public int getAge() {
      return age;
    }

    private String getName() {
      return name;
    }
  }

List<Person> persons = new ArrayList<>();
for (int i = 1; i <= 10; i++) {
    Person person = new Person(i, i + 10, "name" + i);
    persons.add(person);
}
List<Person> personSortedList = persons.stream().sorted(Comparator.comparing(Person::getNo))
    .collect(Collectors.toList());
```


#### 8. min/max/distinct

> `min`和`max`用于求最大最小值，它们的功能也可以通过对Stream元素先排序，再findFirst来实现，但前者的性能会更好，时间复杂度为 O(n)，而sorted的成本 O(nlogn)。

> `distinct`用于去重。

* 找出最大、最小值

```java

lists.stream().min(Integer::compareTo).ifPresent(System.out::println);

lists.stream().max(Integer::compareTo).ifPresent(System.out::println);
```


* 去除重复元素

```java
List<String> dataList = Arrays.asList("1,2", "3,4", "5,6", "6,8");

dataList.stream()
        .flatMap(elems -> Arrays.stream(elems.split(",")))
        .distinct()
        .forEach(System.out::print);
```

#### 9. Match

> Stream有三个`match`方法，从语义上说： 

> - allMatch：Stream 中全部元素符合传入的 predicate，返回 true
> - anyMatch：Stream 中只要有一个元素符合传入的 predicate，返回 true
> - noneMatch：Stream 中没有一个元素符合传入的 predicate，返回 true

它们都不是要遍历全部元素才能返回结果。例如allMatch只要一个元素不满足条件，就skip剩下的所有元素，返回false。

* 使用 Match

```java
boolean isAllMatch = persons.stream().allMatch(p -> p.getAge() > 18);
System.out.println("All are match? " + isAllMatch);
boolean isThereAnyChild = persons.stream().anyMatch(p -> p.getAge() < 12);
System.out.println("Any child? " + isThereAnyChild);
boolean isNoMatch = persons.stream().noneMatch(p -> p.getAge() > 20);
System.out.println("No match? " + isNoMatch);
```

输出结果：

```
All are match? false
Any child? true
No match? true
```

