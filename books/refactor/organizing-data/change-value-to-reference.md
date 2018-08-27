---
layout: book
title: Change Value to Reference（将值对象改为引用对象）
book: refactor
group: organizing-data
pre: replace-data-value-with-object
next: change-reference-to-value
version: 1.0
---


## What

你从一个类衍生出许多彼此相等的实例，希望将它们替换为同一个对象。

**将这个值对象变成引用对象。**


![Change Value to Reference](../images/change-value-to-reference.png)

## Why
在许多系统中，你都可以对对象做一个有用的分类：引用对象和值对象。
* 前者：每个对象都代表真实世界中的一个实物，你可以直接以相等操作符（==，用来检验对象同一性）检查两个对象是否相等。
* 后者：它们完全由其所含的数据值来定义，你并不在意副本的存在。

## When
有时侯，你会从一个简单的值对象开始，在其中保存少量不可修改的数据。而后，你可能会希望给这个对象加入一些可修改数据，并确保对任何一个对象的修改都能影响到所有引用此一对象的地方。这时候你就需要将这个对象变成一个引用对象。

## How
1. 使用**[Replace Constructor with Factor Method（以工厂函数取代构造函数）](replace-constructor-with-factor-method.html)**

2. 编译，测试。

3. 决定由什么对象负责提供访问新对象的途径。

   >* 可能是个静态字典或一个注册对象。

   >* 你也可以使用多个对象作为新对象的访问点。

4. 决定这些引用对象应该预先创建好，或是应该动态创建。

   >* 如果这些引用对象是预先创建好的，而你必须从内存中被它们读取出来，那么就得确保它们在被需要的时候能够被及时加载。

5. 修改工厂函数，令它返回引用对象。

   >* 如果对象是预先创建好的，你就需要考虑：万一有人索求一个其实并不存在的对象，要如何处理错误？

   >* 你可能希望对工厂使用**[Rename Method（函数改名）](rename-method.html)**（273），使其传达这样的信息：它返回的是一个既存对象。

6. 编译，测试。


## Example
Customer class：

```java
class Customer {
    public Customer(String name) {
       _name = name;
    }

    public String getName() {
       return _name;
    }
    private final String _name;
}
```

它被以下的order class使用：

```java
class Order...
    public Order(String customerName) {
       _customer = new Customer(customer);
    }

    public String getCustomerName() {
       return _customer.getName();
    }
    
    public void setCustomer(String customerName) {
       _customer = new Customer(customerName);
    }
    private Customer _customer;
```

此外，还有一些代码也会使用Customer对象：

```java
private static int numberOfOrdersFor(Collection orders, String customer) {
    int result = 0;
    Iterator iter = orders.iterator();
    while(iter.hasNext()) {
       Order each = (Order)iter.next();
       if(each.getCustomerName().equals(customer)) result ++;
    }
    return result;
}
```

到目前为止，Customer对象还是值对象。就算多份定单属于同一客户，但每个order对象还是拥有各自的Customer对象。我希望改变这一现状，使得一旦同一客户拥有多份不同定单，代表这些定单的所有Order对象就可以共享同一个Customer对象。

首先使用**[Replace Constructor with Factor Method（以工厂函数取代构造函数）](replace-constructor-with-factor-method.html)**。这样，就可以控制Customer对象的创建过程，这在以后会是非常重要的。


在Customer class中定义这个factory method：

```java
class Customer {
    public static Customer create(String name) {
       return new Customer(name);
    }
}
```

然后把[对构造函数的调用]替换成[对factory method的调用]

```java
class Order {
    public Order(String customer) {
       _customer = Customer.create(customer);
    }
}
```

然后再把构造函数声明为private：

```java
class Customer {
    private Customer(String name) {
       _name = name;
    }
}
```

通常，创建一个注册表对象来保存所有Customer对象，以此作为访问点。

把Customer对象保存在Customer class的一个static字段中，让Customer class作为访问点：

```java
private static Dictionary _instance = new Hashtable();
```

然后，先把需要使用的Customer对象加载妥当。这些对象可能来自数据库，也可能来自文件（为求简单起见，在代码中明确生成这些对象）。

```java
class Customer...
    static void loadCustomers() {
       new Customer("Lemon Car Hire").store();
        new Customer("Associated Coffee Machines").store();
        new Customer("Bilston Gasworks").store();
    }
    private void store() {
       _instance.put(this.getName(), this);
    }
```

修改factory method，让它返回预先创建好的Customer对象：

```java
public static Customer create(String name) {
    return (Customer)_instance.get(name);
}
```

由于create()总是返回既有的Customer对象，所以应该修改这个factory method的名称，以便强调（说明）这一点。

```java
class Customer...
public static Customer getNamed(String name) {
    return (Customer)_instances.get(name);
}
```