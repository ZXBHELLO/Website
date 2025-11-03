---
title: Carpet规则分类
date: 2025-11-04
permalink: /carpet/rules/
---

# Carpet规则分类

Carpet模组通过规则系统来控制各种功能的开启与关闭。每个规则都有特定的分类和用途。以下是对Carpet模组中主要规则的分类介绍。

## 规则使用方法

要查看和修改规则，可以使用以下命令：

- [/carpet](../commands.md#carpet)：显示当前Carpet版本和非原版规则列表
- [/carpet list](../commands.md#carpet)：列出所有可用的地毯规则
- [/carpet list [tag]](../commands.md#carpet)：列出指定分类的地毯规则
- [/carpet [规则名] [值]](../commands.md#carpet)：设置指定规则的值

## 规则分类详解

### 性能优化类 (OPTIMIZATION)

这些规则主要用于提升游戏性能和加速测试：

#### tickRate
控制游戏刻速率，默认为20。降低该值可以减慢游戏速度，提高该值可以加速游戏。

#### hopperCounters
启用漏斗计数器，可以统计特定颜色地毯下方漏斗收集的物品数量。

#### antiCheatDisabled
禁用反作弊系统，允许玩家飞行和快速移动而不被踢出。

#### portalSuffocationFix
修复传送门窒息bug（MC-2025）。

### 游戏机制类 (FEATURE)

这些规则修改或增强了原版游戏机制：

#### movableBlockEntities
允许活塞推动方块实体（如箱子、熔炉等）。

#### chainStone
锁链在长的一端会相互粘连，并且会粘在直接连接到它们的方块上。

#### renewableSand
下落的铁砧可以将圆石粉碎成沙子。

#### renewableIce
下落的铁簪可以将冰压缩成蓝冰。

#### stackableShulkerBoxes
允许潜影盒堆叠（在特定条件下）。

### 创造模式类 (CREATIVE)

这些规则主要在创造模式下使用：

#### creativeFlyDrag
修改创造模式飞行时的阻力。

#### creativeNoClip
在创造模式下禁用碰撞检测。

#### creativeOpenShulkerBoxForcibly
创造模式下可以强制打开对着实体方块的潜影盒。

### 生存模式类 (SURVIVAL)

这些规则在生存模式下特别有用：

#### accurateBlockPlacement
允许客户端提供替代的方块放置方式。

#### betterBonemeal
骨粉可以用于催熟甘蔗、仙人掌和睡莲。

#### chickenShearing
可以剪羊毛鸡获得羽毛。

### 红石类 (REDSTONE)

这些规则修改了红石相关机制：

#### wirelessRedstone
激活的红石粉可以无线激活相邻的红石粉。

#### quasiConnectivity
启用或禁用活塞的准连接性。

#### railPowerLimit
修改铁轨的红石信号传输距离。

### 实体类 (ENTITY)

这些规则影响实体的行为：

#### entitiesDoWaterVibrations
实体在水中会产生振动粒子。

#### entityInspection
允许通过特定方式检查实体信息。

#### persistentEntityTracker
追踪持续存在的实体。

### 调试监控类 (DEBUG)

这些规则用于调试和监控游戏状态：

#### debugLogger
启用调试日志记录。

#### extendedConnectivity
扩展方块连接性检测。

#### cleanLogs
从日志中删除令人讨厌的消息。

### 实验性类 (EXPERIMENTAL)

这些规则仍在实验阶段，可能存在不稳定因素：

#### netherWaterPlacement
允许在下界放置水源。

#### renewableNetherite
添加获取下界合金的新方法。

#### xpNoCooldown
移除经验球拾取的冷却时间。

## 规则保存

使用[/carpet setDefault [规则名] [值]](../commands.md#carpet)可以将规则设置为默认值，这些设置会保存在carpet.conf文件中，对特定世界生效。

## 参考资料

- [Carpet GitHub仓库](https://github.com/gnembon/fabric-carpet)
- [Carpet Wiki](https://github.com/gnembon/fabric-carpet/wiki)