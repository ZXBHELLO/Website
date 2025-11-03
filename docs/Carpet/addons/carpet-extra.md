---
title: Carpet Extra
date: 2025-11-04
permalink: /carpet/addons/carpet-extra/
---

# Carpet Extra

Carpet Extra是Carpet模组的一个官方扩展模组，添加了许多额外的功能，特别是大量的发射器行为扩展、可再生资源获取方式等[^1]。

## 简介

Carpet Extra由Carpet原作者gnembon开发，为Fabric Carpet添加额外的特性。它包含了许多有趣的发射器行为扩展、新的可再生资源获取方式等[^1]。

## 安装方法

1. 确保已安装对应版本的Carpet模组
2. 从[GitHub发布页面](https://github.com/gnembon/carpet-extra/releases)下载对应版本的Carpet Extra
3. 将下载的.jar文件放入Minecraft的mods文件夹中
4. 启动游戏

## 主要功能分类

### 发射器行为扩展 (Dispenser Behaviours)

Carpet Extra最显著的特点是添加了大量发射器行为扩展：

#### dispenserPlacesBlocks
允许发射器放置方块。

#### dispensersFeedAnimals
发射器可以使用繁殖物品喂养动物。

#### dispensersFillMinecarts
发射器可以给矿车添加箱子、漏斗、熔炉或TNT。

#### dispensersMilkAnimals
发射器可以使用空桶挤奶，使用碗获取蘑菇煲或可疑的炖菜。

#### dispensersPotPlants
发射器可以将花放入花盆。

#### dispensersStripBlocks
发射器可以使用斧头剥离原木、除锈或除蜡。

#### dispensersTillSoil
发射器可以使用锄头耕种土地。

#### dispensersToggleThings
发射器可以使用木棍切换/激活按钮、红石粉、音符盒、比较器、中继器、阳光传感器等。

#### dispensersUseCauldrons
发射器可以使用桶或玻璃瓶装填/清空炼药锅，以及去除皮革盔甲/潜影盒/旗帜的染料。

#### dispensersCarvePumpkins
发射器可以使用剪刀雕刻南瓜。

#### autoCraftingDropper
如果一个发射器对着工作台并且包含有效的3x3合成配方，激活该发射器将合成（作为物品掉落）该配方。

### 生存功能类 (Survival Features)

#### betterBonemeal
骨粉可以催熟甘蔗、仙人掌和睡莲。

#### blazeMeal
烈焰粉可以催熟下界疣。

#### chickenShearing
可以剪羊毛鸡获得羽毛（每次剪毛会对鸡造成伤害）。

#### clericsFarmWarts
牧师村民可以催熟下界疣。

#### renewableEndstone
发射器使用龙息可以将圆石转化为末地石。

#### renewableIce
下落的铁砧可以将霜冰压缩成普通冰，普通冰压缩成浮冰，浮冰压缩成蓝冰。

#### renewableNetherrack
发射器使用火焰弹可以将圆石转化为下界岩。

#### renewableSand
下落的铁砧可以将圆石粉碎成沙子。

### 技术功能类 (Technical Features)

#### accurateBlockPlacement
客户端可以提供替代的方块放置方式。

#### blockStateSyncing
修复F3调试模式下某些方块的状态更新问题。

#### comparatorBetterItemFrames
允许比较器检测其前方水平方向和前方方块顶部的物品展示框。

#### comparatorReadsClock
允许比较器读取一天中的时间而不是物品展示框中时钟的旋转角度。

#### creeperSpawningInJungleTemples
只有苦力怕在丛林神庙中生成。

#### disablePlayerCollision
禁用玩家实体碰撞。

#### doubleRetraction
重新添加1.8版本的活塞双重缩回功能。

#### dragonEggBedrockBreaking
重新引入1.12版本的龙蛋破坏基岩的bug。

#### emptyShulkerBoxStackAlways
空潜影盒总是可以堆叠，即使在物品栏中也是如此。

#### fallingBlockDispensers
发射器/投掷器在被激活时，会将前方的方块转化为下落的方块。

#### flowerPotChunkLoading
在花盆中放置凋零玫瑰可以加载该区块。

#### hopperMinecartItemTransfer
允许漏斗矿车将物品传输到下方的容器中。

#### mobInFireConvertsSandToSoulsand
如果一个活体实体在火上的沙子上死亡，沙子将转化为灵魂沙。

#### pistonRedirectsRedstone
活塞和粘性活塞可以重定向红石信号。

#### reloadSuffocationFix
防止生物在重新加载时卡入方块中。

### 命令类 (Commands)

#### commandPing
启用/player ping命令，让玩家可以获取他们的延迟。

### 调整类 (Tweaks)

#### maxSpongeRange
调整海绵的最大作用范围。

#### maxSpongeSuck
调整海绵的最大吸水数量。

## 使用方法

Carpet Extra的功能通过Carpet的规则系统控制，使用[/carpet](../../commands.md#carpet)命令进行配置：

```
/carpet [规则名] [值]
```

例如，要启用发射器放置方块功能：
```
/carpet dispenserPlacesBlocks true
```

要将设置保存为默认值（重启后仍然有效）：
```
/carpet setDefault dispenserPlacesBlocks true
```

## 参考资料

[^1]: https://github.com/gnembon/carpet-extra