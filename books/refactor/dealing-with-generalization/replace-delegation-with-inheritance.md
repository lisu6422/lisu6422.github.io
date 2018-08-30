---
layout: book
title: Replace Delegation with Inheritance（以继承取代委托）
book: refactor
group: dealing-with-generalization
pre: replace-inheritance-with-delegation
next: ../big-refactorings/tease-apart-interitance
version: 1.0
---


## What

你在两个类之间使用委托关系，并经常为整个接口编写许多极简单的委托函数。

**让委托类继承受托类。**


**以继承取代委托：**

![Replace Delegation with Inheritance](../images/replace-delegation-with-inheritance.png)