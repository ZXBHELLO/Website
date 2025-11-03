---
title: Carpet TIS Addition
date: 2025-11-04
permalink: /carpet/addons/carpet-tis-addition/
---

# Carpet TIS Addition

Carpet TIS Addition是由TIS团队开发的Carpet模组扩展，包含了许多有趣的功能和游戏监控特性[^1]。

## 简介

Carpet TIS Addition是基于fabric-carpet的扩展模组，提供了一系列有用的工具和有趣的特性，符合Carpet模组的风格。在默认配置下，该模组不会改变任何原版行为[^1]。

## 安装方法

1. 确保已安装对应版本的Carpet模组
2. 从[GitHub发布页面](https://github.com/TISUnion/Carpet-TIS-Addition/releases)下载对应版本的Carpet TIS Addition
3. 将下载的.jar文件放入Minecraft的mods文件夹中
4. 启动游戏

## 主要功能

### 性能优化功能

#### optimizedFastEntityMovement
优化快速移动实体的计算，提高性能。

#### optimizedTileEntityCollision
优化方块实体碰撞检测，减少服务器负担。

#### optimizedTntMovement
优化TNT实体的移动计算。

### 游戏机制扩展

#### bambooModelNoOffset
竹子模型不会产生偏移，使建筑更加精确。

#### betterFireExtinguisher
改进灭火机制，提高灭火效率。

#### blockEventPacketRange
调整方块事件数据包的传输范围。

#### buddingAmethystBreaking
允许破坏紫水晶母岩。

#### cakeAlwaysEat
在任何情况下都可以吃蛋糕。

#### campfireSmokeParticle
改进篝火烟雾粒子效果。

#### creativeDealDamage
创造模式玩家可以造成伤害。

#### ctrlQCraftingFix
修复Ctrl+Q制作的bug。

#### disconnectOverdueEntity
断开过期实体的连接。

### 红石与机械相关

#### comparatorCap
比较器可以读取容器的容量信息。

#### fakePlayerNoScoreboardCounter
假玩家不会增加记分板计数器。

#### fakePlayerResident
假玩家可以常驻服务器。

#### hopperCountersUnlimitedSpeed
漏斗计数器无速度限制。

#### instantCommandBlock
命令方块立即执行命令。

#### movableBlockEntities
增强的方块实体移动支持。

### 监控与调试工具

#### counterMeasureTPS
监控TPS性能指标。

#### counterMeasureMSPT
监控MSPT（每刻毫秒数）性能指标。

#### despawnEggFix
修复刷怪蛋消失的bug。

#### dimensionHook
维度钩子功能，用于监控维度变化。

#### entityMomentumLoss
监控实体动量损失。

#### fakePlayerSupport
增强假玩家支持功能。

#### fluidCollisionBoxFix
修复流体碰撞箱bug。

#### hopperCounters
增强的漏斗计数器功能。

#### lightningKiller
闪电击杀监控。

#### microTiming
微时序监控功能。

#### movableTileEntity
可移动的方块实体支持。

#### railDuplicationFix
修复铁轨复制bug。

#### renewableElytra
可再生的鞘翅获取方式。

#### renewableSponges
可再生的海绵获取方式。

#### spawnReporter
生物生成报告器。

#### stackableShulkerBoxes
增强的潜影盒堆叠功能。

#### tntDuplicationFix
修复TNT复制bug。

#### tntFuseDuration
调整TNT引信时长。

#### tntPrimeMomentum
调整TNT引爆时的动量。

#### xpTracking
经验球追踪功能。

### 命令扩展

#### commandCarpet
增强的Carpet命令支持。

#### commandCounter
计数器命令。

#### commandDataTracker
数据追踪命令。

#### commandDraw
绘图命令。

#### commandLightning
闪电命令。

#### commandLog
日志命令。

#### commandMicroTiming
微时序命令。

#### commandPlayerAction
玩家动作命令。

#### commandProfile
性能分析命令。

#### commandRemoveEntity
移除实体命令。

#### commandScript
脚本命令。

#### commandStructure
结构命令。

#### commandTick
时序命令。

#### commandTPS
TPS命令。

#### commandUtils
工具命令。

## 使用方法

与原版Carpet类似，Carpet TIS Addition的功能通过规则系统控制：

```
/carpet [规则名] [值]
```

例如，要启用假玩家常驻功能：
```
/carpet fakePlayerResident true
```

要查看所有可用规则：
```
/carpet list
```

## 配置文件

Carpet TIS Addition的配置文件通常保存在`config/carpet-tis-addition.conf`中，可以手动编辑以设置默认值。

## 参考资料

[^1]: https://github.com/TISUnion/Carpet-TIS-Addition