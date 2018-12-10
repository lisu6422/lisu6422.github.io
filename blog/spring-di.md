---
layout: book
title: Spring 依赖注入
java: basic
group: expectionassertlog
version: 1.0
---

## Spring 依赖注入

Spring的依赖注入功能可以有效的帮助开发人员来管理容器中的Bean的依赖关系。


定义Person类

```java
package com.spring.di;

public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Person() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

```

定义测试类：

```java
package com.spring.di;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
public class DiMain(){
    public static void main(String[] args){
        ApplicationContext context = 
             new ClassPathXmlApplicationContext("Beans.xml");
        Person person = (Person) context.getBean("person");
        System.out.println(person);
    }
}
```


### 基于构造器注入

创建`Beans.xml`文件，内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

  <!-- Definition for person bean -->
  <bean id="person" class="com.spring.di.Person">
    <constructor-arg type="java.lang.String" value="Xiao Ming"/>
    <constructor-arg type="int" value="18"/>
  </bean>
</beans>
```

运行`DiMain`类，得到输出结果：

```
Person{name='Xiao Ming', age=18}
```

### 基于Setter注入

* property

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

  <bean id="person" class="com.spring.di.Person">
    <property name="name" type="java.lang.String" value="Xiao Ming"/>
    <property name="age" type="int" value="18"/>
  </bean>
</beans>
```

* p-namespace

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

  <bean id="person" class="com.spring.di.Person"
    p:name="Xiao Ming"
    p:age="18">
  </bean>
</beans>
```

将`Beans.xml`中的内容分别用`property`和`p-namespace`的方式配置后，运行`DiMain`，结果与使用构造器注入相同。

### 注入集合

Spring 提供了四种类型的集合的配置元素：```<list>```、 ```<set>```、 ```<map>```、 ```<props>```。

* 使用```<list>```或```<set>```来连接任何java.util.Collection 的实现或数组；

* 使用```<property>```标签的ref属性来配置对象引用；

* 可以将引用和值混合在一起；

举例

```java
package com.spring.di;

import java.util.List;
import java.util.Map;
import java.util.Properties;

public class CollectionBean {

  private Object[] arr;
  private List list;
  private Map map;
  private Properties prop;

  public void setArr(Object[] arr) {
    this.arr = arr;
  }

  public void setList(List list) {
    this.list = list;
  }

  public void setMap(Map map) {
    this.map = map;
  }

  public void setProp(Properties prop) {
    this.prop = prop;
  }

  public Object[] getArr() {
    return arr;
  }

  public List getList() {
    return list;
  }

  public Map getMap() {
    return map;
  }

  public Properties getProp() {
    return prop;
  }
}
```

配置如下：
```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

  <bean id="clooectionBean" class="com.spring.di.CollectionBean">
    <!--Arrary类型注入-->
    <!--只注入一个元素（值/对象），直接使用value/ref
    <property name="arr" value="tom"></property>
    -->

    <!--注入多个元素-->
    <property name="arr">
      <array>
        <value>tom</value>
        <value>jerry</value>
        <!--注入Bean引用-->
        <ref bean="person" />
      </array>
    </property>

    <!-- List类型注入 -->
    <property name="addressList">
      <list>
        <value>INDIA</value>
        <value>Pakistan</value>
      </list>
    </property>

    <!-- Map类型注入 -->
    <property name="addressMap">
      <map>
        <entry key="1" value="INDIA"/>
        <!--注入Bean引用-->
        <entry key="2" value-ref="address1"/>
      </map>
    </property>

    <!-- Properties类型注入 -->
    <property name="addressProp">
      <props>
        <prop key="one">INDIA</prop>
        <prop key="two">Pakistan</prop>
      </props>
    </property>
  </bean>
</beans>
```

### 注入null和空字符串

```xml
<bean id="..." class="...">
   <property name="address" value=""></property>
</bean>
```

```xml
<bean id="..." class="...">
   <property name="address"><null/></property>
</bean>
```