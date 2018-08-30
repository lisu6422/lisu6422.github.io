---
layout: book
title: Replace Inheritance with Delegation（以委托取代继承）
book: refactor
group: dealing-with-generalization
pre: form-template-method
next: replace-delegation-with-inheritance
version: 1.0
---


## What

某个子类只使用超类接口中的一部分，或是根本不需要继承而来的数据。

**在子类中新建一个字段以保存超类；调整子类函数，令它改而委托超类；然后去掉两者之间的继承关系。**


**以委托取代继承：**

![Replace Inheritance with Delegation](../images/replace-inheritance-with-delegation.png)