---
layout: book
title: Push Down Field（字段下移）
book: refactor
group: dealing-with-generalization
pre: push-down-method
next: extract-subclass
version: 1.0
---


## What

超类中的某个字段只被部分（而非全部）子类用到。

**将这个字段移到需要它的那些子类去。**


**字段下移：**

![Push Down Field](../images/push-down-field.png)

## About

* [Pull Up Field:(字段上移)](pull-up-field.md)