---
layout: book
title: Move Field（搬移字段）
book: refactor
group: moving-features-between-objects
pre: move-method
next: extract-class
version: 1.0
---

## What

你的程序中，某个字段被其所驻类之后的另一个类更多地用到。

**在目标类新建一个字段，修改源字段的所有用户，令它们改用新字段。**


**搬移字段:**

![Move Field](../images/move-field.png)