---
title: Carpet基础介绍
date: 2025-11-04
permalink: /carpet/carpet/intro/
---

# Carpet基础介绍

Carpet Mod是一个为原版Minecraft设计的功能强大的模组，它允许玩家从技术角度完全控制游戏。通过精心设计的改动，它消除了游戏中一些烦人的问题，并提供了一些原版缺少的内容，填补了原版游戏功能的空白[^1]。

## Carpet的起源

Carpet模组最初由gnembon开发，基于Fabric模组框架。它最初的设计理念是允许玩家放置地毯来获取游戏信息，因此得名"Carpet"。随着版本更新，Carpet已经发展成为一个功能丰富的技术模组[^2]。

## Carpet的主要用途

Carpet一般多用于以下场景：

::: tip 主要用途
- 需要对游戏环境进行精细控制的服务器管理者
- 深入探索游戏机制并通过模组实现高级自动化和优化的玩家
- 技术型生存服务器（生电服）
- 红石工程师和建筑大师
:::

## Carpet的三大核心功能

### 1. 性能优化

Carpet提供了一系列性能优化功能，帮助玩家提升游戏体验：

- 使用[/tick warp](./commands.md#tick)命令可以在几分钟内模拟数小时的游戏时间
- [hopperCounters](./rules.md#hoppercounters)可以详细统计漏斗收集的物品数量
- 优化了多种游戏机制，减少资源占用

### 2. 游戏机制改进

Carpet为原版游戏添加了许多实用的新机制：

- 允许活塞推动方块实体（如箱子）([movableBlockEntities](./rules.md#movableblockentities))
- 添加了大量新的游戏规则
- 改进了方块放置、实体交互等机制

### 3. 调试与监控

Carpet增强了游戏内的数据监控功能：

- 使用[/log](./commands.md#log)命令实时监控服务器状态
- 查看生物上限(mobcap)、TPS等关键性能指标
- 提供详细的性能分析工具

## Carpet与其他模组的关系

::: warning 兼容性注意
需要注意的是，在Fabric环境中，Carpet模组会与OptiFabric发生冲突（仅为部分版本）。根据GitHub Issue的作者原话，主要是由于OptiFine的更新导致的冲突，OptiFabric会对冲突进行修复。在1.19.2版本下运行正常[^1]。
:::

## Carpet的生态系统

Carpet拥有丰富的扩展生态系统，包括：

- [Carpet Extra](../addons/carpet-extra.md)：提供更多有趣的附加功能
- [Carpet TIS Addition](../addons/carpet-tis-addition.md)：TIS团队开发的功能扩展
- 以及许多其他社区开发的扩展模组

## 安装与使用

Carpet模组需要Fabric作为支持环境。安装步骤如下：

1. 下载并安装[Fabric Loader](https://fabricmc.net/use/)
2. 下载[Carpet模组](https://github.com/gnembon/fabric-carpet)
3. 将下载的.jar文件放入Minecraft的mods文件夹中
4. 启动游戏并选择带有Fabric Loader的版本

## 参考资料

[^1]: https://www.mcmod.cn/class/2361.html
[^2]: https://github.com/gnembon/fabric-carpet