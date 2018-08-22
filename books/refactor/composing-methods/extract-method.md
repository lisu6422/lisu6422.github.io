---
layout: book
title: Extract Method（提炼函数）
book: refactor
group: composing-methods
next: inline-method
---

## What

你有一段代码可以被组织在一起并独立出来。

**将这段代码放进一个独立函数中的，并让函数名称解释该函数的用途。**

**原始代码：**

```java
void printOwing(double amout){
    printBanner();
    
    //print details
    System.out.println("name:" + _name);
    System.out.println("amount:" + _amount);
}
```


**提炼函数：**

```java
void printOwing(double amout){
    printBanner();
    printDetails(amount);
}

void printDetails(double amout){
    System.out.println("name:" + _name);
    System.out.println("amount:" + _amount);
} 
```

## Why

一个**简短而命名良好的函数**有诸多好处：

* 首先，如果每个函数的粒度都很小，那么函数被复用的机会就更大；
* 其次，会使高层（调用）函数读起来就像一系列的注释；
* 再次，如果函数都是细粒度，那么函数的覆写（重写）也会更容易些。

> PS: **简短而命名良好的函数**并不是说函数的名称一定要短，重要是**闻其名，便知其意。**

## When

**Extract Method** 是最常用的重构手法之一，当看到一个**过长的函数**或者一段**需要注释**才能让人理解的代码，就可以将这段代码放进一个独立的函数中。


## How

1. 创建一个新函数，根据这个函数的意图来对它命名（以它"**做什么**"来命名，而不是以它"**怎么做**"命名）。
    
    > 即使你想要提炼的代码非常简单，例如只是一条消息或一个函数调用，只要新函数的名称能够以更好的方式昭示代码意图，你也应该提炼它。但如果你想不出一个更有意义的名称，就别动。
    
2. 将提炼出的代码放进新建的目标函数中。

3. 仔细检查提炼出的代码中是否引用了"**作用域限于源函数**"的变量（包括局部变量和源函数参数）。

4. 检查被提炼的代码段中**是否有任何局部变量的值被它修改**。

    > 如果一个临时变量值被修改了，看看是否可以将提炼代码段处理为一个查询，并将结果赋值给相关变量。
    > 如果很难这样做，或如果被修改的变量不止一个，那么就不能仅仅将这段代码**原封不动**地提炼出来。
    
5. 将被提炼代码段中需要读取的局部变量，当作参数传给目标函数。

6. 处理完所有局部变量之后，进行编译。

7. 在源函数中，将被提炼代码段替换为对目标函数的调用。

8. 编译，测试。

## Example

### 源代码片段

```java
void printOwing(){
    Enumeration e = _orders.elements();
    double outstanding = 0.0;
    
    // print banner
    System.out.println("****************************************");
    System.out.println("*********   Customer Owners    *********");
    System.out.println("****************************************");

    // calculate outstanding
    while (e.hasMoreElements()){
        Order each = (Order) e.nextElement();
        outstanding += each.getAmount();
    }

    // print details
    System.out.println("name:" + _name);
    System.out.println("amount:" + outstanding);
}
```

### case1：无局部变量

源代码中的”`打印横幅（print banner）`"的代码可以很轻松地提炼出来，只需要**剪切、粘贴、再插入一个函数调用动作**:

```java
void printOwing(){
    Enumeration e = _orders.elements();
    double outstanding = 0.0;
    
    printBanner();

    // calculate outstanding
    while (e.hasMoreElements()){
        Order each = (Order) e.nextElement();
        outstanding += each.getAmount();
    }

    // print details
    System.out.println("name:" + _name);
    System.out.println("amount:" + outstanding); 
}

void printBanner(){
    // print banner
    System.out.println("****************************************");
    System.out.println("*********   Customer Owners    *********");
    System.out.println("****************************************");
}
```

### case2：有局部变量

在经过[无局部变量](#无局部变量)的提炼后，再看`打印详细信息（print details）`部分，这部分只是输出局部变量`outstanding`的值，所以可以简单地将它作为参数传给目标函数。提炼结果如下：

```java
void printOwing(){
    Enumeration e = _orders.elements();
    double outstanding = 0.0;
    
    printBanner();

    // calculate outstanding
    while (e.hasMoreElements()){
        Order each = (Order) e.nextElement();
        outstanding += each.getAmount();
    }

    printDetailes(outstanding);
}

void printDetailes(double outstanding){
    // print details
    System.out.println("name:" + _name);
    System.out.println("amount:" + outstanding); 
}
```

如果局部变量是个对象，而被提炼代码段调用了会对该对象造成修改的函数，也可以**如法炮制**。同样只需要将这个对象作为参数传递给目标函数即可。

### case3：对局部变量赋值

在`计算(calculate)`代码块中，会对局部变量`outstanding`进行赋值。这里只讨论临时变量的问题，如果发现源函数的参数被赋值，应该马上使用**[Remove Assignments to Paramters](remove-assignments-to-paramters.html)**

被赋值的临时变量也分两种情况。

* 简单情况：该变量只在被提炼代码段中使用，此时可以将这个临时变量的声明移到被提炼代码中，然后一起提炼出去。
* 复杂情况：被提炼的代码段之外的代码也使用了这个变量。这又分为两种情况：
    * 如果这个变量在被提炼代码段之后未再被使用，只需直接在目标函数中修改它就好了；
    * 如果被提炼代码段之后的代码还使用了这个变量，则需要让目标函数返回该变量改变后的值。


现在把`计算(calculate outstanding)`代码提炼出来：

```java
void printOwing(){
    printBanner();
    double outstanding = getOutStanding();
    printDetailes(outstanding);
}

double getOutStanding(){
    Enumeration e = _orders.elements();
    double outstanding = 0.0;
    // calculate outstanding
    while (e.hasMoreElements()){
        Order each = (Order) e.nextElement();
        outstanding += each.getAmount();
    }
    return outstanding;
}
```
`Enumeration`变量`e`只在被提炼代码段中用到，所以可以将它整个搬到新函数中。`double`变量`outstanding`在被提炼代码段内外都被用到，所以必须让提炼出的新函数返回它。


```java
double getOutStanding(){
    Enumeration e = _orders.elements();
    double result = 0.0;
    // calculate outstanding
    while (e.hasMoreElements()){
        Order each = (Order) e.nextElement();
        result += each.getAmount();
    }
    return result;
}
```

`outstanding`变量只是很单纯地被初始化为一个明确初值，所以可以只在新函数中对它初始化。如果代码还对这个变量做了其他处理，就必须将它的值作为参数传给目标函数。

对于这种变化，最初的代码可能是这样：

```java
void printOwing(double previousAmount){
    Enumeration e = _orders.elements();
    double outstanding = previousAmount * 1.2;
    printBanner();

    // calculate outstanding
    while (e.hasMoreElements()){
        Order each = (Order) e.nextElement();
        outstanding += each.getAmount();
    }

    printDetailes(outstanding);
}
```

提炼后的代码可能是这样：

```java
void printOwing(double previousAmount){
    double outstanding = previousAmount * 1.2;
    printBanner();
    double outstanding = getOutStanding(outstanding);
    printDetailes(outstanding);
}


double getOutStanding(double initialValue){
    Enumeration e = _orders.elements();
    double result = initialValue;
    // calculate outstanding
    while (e.hasMoreElements()){
        Order each = (Order) e.nextElement();
        result += each.getAmount();
    }
    return result;
}
```

编译并测试后，再将变量`outstanding`的初始化过程整理一下：

```java
void printOwing(double previousAmount){
    printBanner();
    double outstanding = getOutstanding(previousAmount * 1.2);
    printDetailes(outstanding);
}
```

> PS: 如果需要返回的变量不止一个，又该怎么办呢？

有几种选择。最好的选择通常是：挑选另一块代码来提炼，因为函数一般都只能返回一个值，所以会提炼多个函数，用以返回多个值。如果所使用的语言支持”**出参数（output parameter）**“（如`lua`），可以使用它们带回多个回传值。但是，最好还是发送可能选择单一返回值。

临时变量往往较多，甚至会使提s炼工作举步维艰。这种情况下，可以尝试先运用**[Replace Temp with Query](replace-temp-with-query.md)**减少临时变量。如果即使这么做了提炼依旧困难重重，那么就动用**[Replace Method with Method Object](replace-method-with-method-object)**，这个重构手法不在乎代码中有多少临时变量，也不在乎如何使用它们。


## 下一篇

* [Inline Method(内联函数)](inline-method.md)
