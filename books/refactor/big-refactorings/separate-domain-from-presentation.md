---
layout: book
title: Separate Domain from Presentation（将领域和静态/显示分离）
book: refactor
group: big-refactorings
pre: convert-procedural-design-to-objects
next: extract-hierarchy
version: 1.0
---


## What

某些GUI类之中包含了领域逻辑。

**将领域逻辑分享出来，为它们建立独立的领域类。**


**将领域和静态/显示分离**

![Separate Domain from Presentation](../images/separate-domain-from-presentation.png)