---
layout: book
title: Push Down Method（函数下移）
book: refactor
group: dealing-with-generalization
pre: pull-up-constructor-body
next: push-down-field
version: 1.0
---


## What

超类中的某个函数只与部分（而非全部）子类有关。

**将这个函数移到相关的那些子类去。**


**函数下移：**

![Push Down Method](../images/push-down-method.png)

## About 

* [Pull Up Method:(函数上移)](pull-up-method.md)