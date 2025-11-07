---
title: Carpet Extra
date: 2025-11-04T00:00:00.000Z
permalink: /carpet/addons/carpet-extra/
createTime: 2025/11/04 00:33:26
---

# Carpet Extra

Carpet Extra是Carpet模组的一个官方扩展模组，添加了许多额外的功能，特别是大量的发射器行为扩展、可再生资源获取方式等。

## 功能概述

Carpet Extra为原版Carpet模组添加了大量额外功能，主要包括：

| 功能类别 | 描述 |
|----------|------|
| 发射器扩展 | 大量的发射器行为扩展 |
| 资源再生 | 可再生资源获取方式 |
| 生物调整 | 生物行为调整 |
| 红石增强 | 红石机制增强 |
| 实用工具 | 实用工具添加 |

## 发射器行为扩展

### dispenserPlacesBlocks
允许发射器放置方块。

### renewableLava
可再生熔岩，发射器可以将熔岩桶转换为空桶并生成新的熔岩源。

### renewableSoulFire
可再生灵魂火，发射器可以制作灵魂火。

**应用场景：**
- 发射器放置方块实现自动化建造
- 可再生资源获取，减少资源消耗

## 可再生资源获取

### renewableNetherrack
可再生下界岩，通过特定方式获得下界岩。

### renewableCoral
可再生珊瑚，通过特定条件使珊瑚可再生。

### renewableSponges
可再生海绵，通过特定条件使海绵可再生。

**设计理念：**
- 可持续发展游戏机制
- 提升自动化农场产出

## 生物行为调整

### stackableShulkerBoxes
潜影盒堆叠，允许潜影盒在特定条件下堆叠。

### xpNoCooldown
经验球无冷却，移除经验球拾取的冷却时间。

### accurateBlockPlacement
精确方块放置，允许更精确地放置方块。

**使用优势：**
- 潜影盒堆叠提升存储效率
- 移除冷却提升游戏流畅度

## 红石机制增强

### railPowerLimit
铁轨充能限制，修改铁轨充能范围限制。

### movableBlockEntities
可移动方块实体，允许活塞推动方块实体。

**创新应用：**
- 扩展红石电路可能性
- 实现移动机械结构

## 实用工具添加

### creativeNoClip
创造模式穿墙，创造模式玩家可以穿墙。

### instantCommandBlock
即时命令方块，命令方块中的命令即时执行。

**工具价值：**
- 创造模式穿墙便于建筑
- 即时执行命令提升测试效率

## 配置和使用

### 命令设置
Carpet Extra的规则可以通过命令进行设置：

```
/carpet [规则名] [值]
```

例如：
```
/carpet dispenserPlacesBlocks true
```

### 配置文件
Carpet Extra的配置文件通常保存在`config/carpet.conf`中，可以手动编辑以设置默认值。

要将设置保存为默认值（重启后仍然有效）：
```
/carpet setDefault dispenserPlacesBlocks true
```

| 配置方式 | 说明 |
|----------|------|
| 命令配置 | 使用命令即时生效 |
| 文件配置 | 编辑配置文件或使用setDefault命令 |

## 参考资料

::: info 相关链接
- [Carpet Extra GitHub仓库](https://github.com/gnembon/carpet-extra)
:::
