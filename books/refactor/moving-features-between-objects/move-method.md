---
layout: book
title: Move Method（搬移函数）
book: refactor
group: moving-features-between-objects
pre: ../composing-methods/substitute-algorithm
next: move-field
version: 1.0
---


## What

你的程序中，有个函数与其所驻类之外的另一个类进行更多交流：调用后者，或被后者调用。

**在该函数最常引用的类中建立一个有着类似行为的新函数。将旧函数变成一个单纯的委托函数，或是将旧函数完全移除。**


![Move Method](../images/move-method.png)
