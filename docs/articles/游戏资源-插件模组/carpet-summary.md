---
title: Carpet指令速查
lastUpdated: true
tags:
  - Minecraft
  - Carpet模组
  - Fabric模组
  - 游戏优化
permalink: /article/carpet-summary/
---

## Carpet 主模块指令

### 核心控制指令
Carpet Mod 的核心控制指令是 **`/carpet`**，为所有功能的统一入口：

::: details 点击展开指令
```
# 显示Carpet版本信息和功能分类
/carpet
# 列出所有规则
/carpet list
# 列出指定标签的规则
/carpet list [tag]
# 列出配置文件中的默认设置
/carpet list defaults
# 设置规则值
/carpet [规则名] [值]
# 移除规则的默认设置
/carpet removeDefault [规则名]
# 设置规则默认值并保存
/carpet setDefault [规则名] [值]
```
:::

### 假人控制指令
假人系统核心指令为 **`/player`** 系列，支持多种自动化操作：

::: details 点击展开指令
```
# 生成假人
/player <name> spawn
# 攻击(continuous持续/interval间隔/once单次)
/player <name> attack [模式]
# 使用物品(右键)
/player <name> use [模式]
# 骑乘附近可骑乘实体
/player <name> mount
# 下马
/player <name> dismount
# 丢弃手持物品
/player <name> drop
# 丢弃一组物品
/player <name> drop all
# 丢弃所有物品
/player <name> dropStack all
# 交换主副手物品
/player <name> swapHands
# 看向指定方向(up/down/north等)
/player <name> look [方向]
# 移动(backward/forward/left/right)
/player <name> move [方向]
# 跳跃
/player <name> jump
# 杀死假人
/player <name> kill
# 潜行
/player <name> sneak
# 取消潜行
/player <name> unsneak
# 奔跑
/player <name> sprint
# 取消奔跑
/player <name> unsprint
# 停止所有动作
/player <name> stop
# 替换为假人(服务器)
/player <name> shadow
# 随机执行动作(支持多种分布)
/player <name> randomly [选项]
```
:::

### 日志监控指令
**`/log`** 系列指令可实时监控游戏内关键活动：

::: details 点击展开指令
```
# 列出所有日志选项
/log
# 取消所有日志订阅
/log clear
# 显示TPS和MSPT
/log tps
# 显示生物生成限制
/log mobcaps [维度]
# 显示漏斗计数器
/log counter [颜色]
# 记录掉落方块
/log fallingBlocks [brief/full]
# 记录投射物轨迹
/log projectiles [brief/full]
# 记录TNT爆炸详情
/log tnt [brief/full]
# 显示数据包统计
/log packets
# 显示寻路信息
/log pathfinding [2/5/10]
```
:::

### 游戏时间控制
**`/tick`** 系列指令支持精确控制游戏刻与时间流速：

::: details 点击展开指令
```
# 显示游戏性能分析
/tick health [ticks]
# 显示实体性能分析
/tick entities [ticks]
# 冻结游戏(玩家可移动)
/tick freeze
# 单步执行游戏刻
/tick step [ticks]
# 设置游戏刻速率(默认20)
/tick rate [tps]
# 快速执行游戏时间
/tick warp [ticks] [cmd]
# 显示warp状态
/tick warp status
```
:::

### 其他核心指令

::: details 点击展开指令
```
# 测量两点间距离
/distance from [起点] to [终点]
# 记录起点
/distance from [起点]
# 计算到终点的距离
/distance to [终点]
# 绘制球体
/draw sphere [中心] [半径] [方块]
# 显示方块信息
/info block [坐标]
# 显示实体信息
/info entity [选择器]
# 显示生物生成空间
/perimeterinfo [坐标] [生物]
# 测试延迟
/ping
# 刷新背包
/refresh inventory
# 刷新区块
/refresh chunk [范围]
# 移除实体
/removeentity <选择器>
# 显示漏斗计数器
/counter [颜色] [realtime]
# 显示经验值计数器
/xcounter [颜色] [realtime]
# 显示无限物品供应商计数器
/scounter [颜色] [realtime]
# 显示生物生成限制
/spawn mobcaps [维度]
# 显示本地生物生成限制
/spawn mobcapsLocal [玩家]
```
:::

## TIS Addition 指令扩展

### 实体生命周期追踪
**`/lifetime`** 指令提供实体全周期数据追踪：

::: details 点击展开指令
```
# 显示实体生命周期统计
/lifetime <实体类型> [查询类型]
# 设置过滤条件
/lifetime filter <实体类型> set <选择器>
# 清除过滤条件
/lifetime filter <实体类型> clear
# 管理生命周期数据记录
/lifetime recorder [操作]
```
:::

### 世界操作指令
**`/manipulate`** 指令支持直接修改世界与实体状态：

::: details 点击展开指令
```
# 操作区块
/manipulate block <区域> [操作]
# 执行区块事件
/manipulate block ... execute
# 发送更新事件
/manipulate block ... emit
# 操作区块
/manipulate chunk <区域> [操作]
# 擦除区块(危险)
/manipulate chunk erase
# 重新计算光照
/manipulate chunk relight
# 操作游戏数据容器
/manipulate container [容器] [操作]
# 操作实体
/manipulate entity <选择器> [操作]
```
:::

### 其他 TIS 指令

::: details 点击展开指令
```
# 显示当前维度的游戏刻顺序
/info world ticking_order
# 显示天气属性(天气预报格式)
/info world weather
# 测试下载速度
/speedtest download [size_mib]
# 测试上传速度
/speedtest upload [size_mib]
# 测试延迟
/speedtest ping [count] [interval]
```
:::

## Carpet Extra 指令
Carpet Extra 新增大量实用功能，核心指令分类如下：

### 物品相关指令

::: details 点击展开指令
```
# 启用自动合成漏斗
/autoCraftingDropper
# 修复F3调试模式方块状态同步问题
/blockStateSyncing
# 花盆加载区块
/flowerPotChunkLoading
```
:::

### 红石相关指令

::: details 点击展开指令
```
# 允许发射器放置方块
/dispenserPlacesBlocks
# 发射器雕刻南瓜
/dispensersCarvePumpkins
# 发射器喂养动物
/dispensersFeedAnimals
# 发射器填充矿车
/dispensersFillMinecarts
# 发射器挤奶
/dispensersMilkAnimals
# 发射器在冰上放置船
/dispensersPlaceBoatsOnIce
# 发射器将花放入花盆
/dispensersPotPlants
# 发射器去皮方块
/dispensersStripBlocks
# 发射器耕地
/dispensersTillSoil
# 还原1.8版本活塞双重收缩
/doubleRetraction
```
:::

### 其他 Carpet Extra 指令

::: details 点击展开指令
```
# 允许剪取鸡毛
/chickenShearing
# 牧师自动种植地狱疣
/clericsFarmWarts
# 丛林神庙仅生成苦力怕
/creeperSpawningInJungleTemples
```
:::

## Carpet AMS Addition 指令
提供自定义规则与实用功能扩展：

### 自定义指令

::: details 点击展开指令
```
# 设置方块爆炸抗性
/customBlockBlastResistance set <方块> <抗性>
# 移除方块爆炸抗性
/customBlockBlastResistance remove <方块>
# 移除所有自定义抗性
/customBlockBlastResistance removeAll
# 获取/设置方块硬度
/customBlockHardness [方块]
# 设置指令权限等级
/customCommandPermissionLevel [命令] [等级]
# 广播导游坐标
/leader <导游名> broadcast <消息>
# Discord风格@提醒功能
/@ <玩家名>
```
:::

### 其他 AMS 指令

::: details 点击展开指令
```
# 背包内物品支持经验修补
/powerfulExpMending [true/false]
# 大收纳袋(9x3/9x6界面)
/largeBundle [true/false]
```
:::

## Carpet Ayaka Addition 指令
专为 AyakaCraft 服务器设计的功能扩展：

### 路点系统

::: details 点击展开指令
```
# 列出附近区块路点
/waypoint list
# 列出固定路点
/waypoint pinned
# 添加/修改路点
/waypoint set <id> <维度> <坐标> [描述]
# 移除指定路点
/waypoint remove <id>
# 显示路点详情
/waypoint detail <id>
# 传送到路点
/waypoint tp <id>
# 重命名路点
/waypoint rename <旧id> <新id>
# 修改路点描述
/waypoint desc <id> <描述>
```
:::

### 其他 Ayaka 指令

::: details 点击展开指令
```
# 快速切换游戏模式(camera/spectator/survival)
/c [gamemode]
# 增强操作日志
/ayaka betterOplog
# 设置天气
/ayaka setWeather <天气>
```
:::

## Carpet Fixes 指令
专注修复游戏原生BUG，核心指令：

::: details 点击展开指令
```
# 修复末影水晶被爆炸破坏不触发爆炸的问题
/crystalExplodeOnExplodedFix
# 修复海绵吸水不发送方块更新的问题
/spongeUpdateFix
# 修复字符串标签漏洞
/stringTagExploitFix
# 修复不正确的反弹逻辑
/incorrectBounceLogicFix
# 修复方向性格挡减速问题
/directionalBlockSlowdownFix
# 修复末地虚空环异常问题
/endVoidRingsFix
```
:::

## 其他重要附属模块指令

### Carpet SkyAdditions（空岛生存专用）

::: details 点击展开指令
```
# 打开岛屿自定义GUI
/islands
# 打开管理员控制面板
/islands-admin
# 启用空岛数据包
/datapack enable carpetskyadditions:skyblock
```
:::

### Carpet Gamerules

::: details 点击展开指令
```
# 直接设置游戏规则
/gamerule <规则名> <值>
# 查看/设置游戏规则
/carpet gamerule <规则名> [值]
```
:::

### Carpet Extra Extras

::: details 点击展开指令
```
# 启用自由视角模式
/cam
# 记录末影珍珠轨迹(需先启用trackenderpearls规则)
/log pearls
```
:::

## Scarpet 指令
Carpet 内置 LUA 脚本引擎，核心指令：

::: details 点击展开指令
```
# 显示Scarpet版本
/scar
# 显示帮助信息
/scar help [命令]
# 运行脚本文件
/scar run [文件] [参数]
# 执行单行代码
/scar eval [代码]
# 定义函数
/scar function [函数名] [参数]
# 执行数学计算
/scar math [表达式]
# 操作表格数据
/scar table [操作]
# 列出所有函数
/scar list
# 列出所有模块
/scar modules
# 加载指定模块
/scar require [模块]
```
:::

### 参考链接
- [Carpet TIS Addition 官方文档](https://carpet.tis.world/)
- [Carpet Extra GitHub 仓库](https://github.com/gnembon/carpet-extra)
- [Carpet Fixes GitHub Wiki](https://github.com/fxmorin/carpet-fixes/wiki)
- [Carpet Mod 官方 Wiki](https://github.com/gnembon/fabric-carpet/wiki)