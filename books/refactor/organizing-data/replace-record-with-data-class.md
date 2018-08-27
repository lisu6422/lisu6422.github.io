---
layout: book
title: Replace Record with Data Class（以数据类取代记录）
book: refactor
group: organizing-data
pre: encapsulate-collection
next: replace-type-code-with-class
version: 1.0
---


## What

你需要面对传统编程环境中的记录结构。

**为该记录创建一个“哑”数据对象。**


## Why

记录型结构是许多编程环境的共同性质。有一些理由使它们被带进面向对象程序之中Lwq可能面对的是一个遗留程序，也可能需要通过一个传统API来与记录结构交流，或是处理从数据库读出的记录。这些时候你就有必要创建一个接口类，用以处理这些外来数据。最简单的做法就是先建立一个看起来类似自问记录的类，以便日后将某些字段和函数搬移到这个类之中。一个不太常见见非常令人注目的情况是：数组中的每个位置上的元素都有特定含义，这种情况下应该使用**[Replace Array with Object](replace-array-with-object.md)**。

## How

1. 新建一个类，表示这个记录。

2. 对于记录中的每一项数据，在新建的类中建立对应的一个`private`字段，并提供相应的取值/设值函数。

现在，你拥有了一个“哑”数据对象。这个对象现在还没有任何有用的行为，但是更进一步的重构会解决这个问题。