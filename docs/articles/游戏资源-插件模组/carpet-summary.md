---
title: Carpet指令速查
lastUpdated: true
tags:
  - Minecraft
  - Carpet模组
  - Fabric模组
  - 游戏优化
permalink: /article/carpet-summary/
createTime: 2025/12/12 23:51:02
---

## Carpet 主模块指令（fabric-carpet）

### 核心控制指令
Carpet Mod 核心统一入口为 **`/carpet`**：

::: details 点击展开指令
```
# 显示 Carpet 版本信息和功能分类
/carpet
# 列出所有规则
/carpet list
# 列出指定标签的规则(生存/红石/创意/BUG修复/优化等)
/carpet list [tag]
# 列出配置文件中的默认设置
/carpet list defaults
# 查看指定规则的详细说明
/carpet info [规则名]
# 设置规则值(仅当前世界,重启失效)
/carpet [规则名] [值]
# 移除规则的默认设置
/carpet removeDefault [规则名]
# 设置规则默认值并写入 carpet.conf (持久生效)
/carpet setDefault [规则名] [值]
```
:::

### 假人控制指令
**`/player`** 系列：

::: details 点击展开指令
```
# 生成假人
/player <name> spawn
# 攻击(模式: continuous持续 / interval间隔 / once单次)
/player <name> attack [模式]
# 使用物品(右键交互)
/player <name> use [模式]
# 骑乘附近可骑乘实体(马/船/矿车)
/player <name> mount
# 下马/下船
/player <name> dismount
# 丢弃手持物品
/player <name> drop
# 丢弃所有手持物品
/player <name> drop all
# 丢弃整组物品
/player <name> dropStack all
# 交换主副手物品
/player <name> swapHands
# 看向指定方向(up/down/north/south/east/west)
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
# 替换为假人(服务器专用,接管真实玩家输入)
/player <name> shadow
# 随机执行动作,支持多种概率分布
/player <name> randomly [选项]
```
:::

### 日志监控指令
**`/log`** 系列：

::: details 点击展开指令
```
# 列出所有可用日志选项
/log
# 取消所有已订阅的日志
/log clear
# 显示 TPS 和 MSPT (毫秒每刻)
/log tps
# 显示生物生成限制
/log mobcaps [维度]
# 显示漏斗计数器
/log counter [颜色]
# 记录掉落方块行为
/log fallingBlocks [brief/full]
# 记录投射物(箭/三叉戟/末影珍珠等)轨迹
/log projectiles [brief/full]
# 记录 TNT 爆炸详情
/log tnt [brief/full]
# 显示网络包统计
/log packets
# 显示实体寻路信息(距离参数 2/5/10)
/log pathfinding [2/5/10]
```
:::

### 游戏时间控制
**`/tick`** 系列：

::: details 点击展开指令
```
# 显示游戏性能分析(卡顿刻排行)
/tick health [ticks]
# 显示实体性能分析(耗时排行)
/tick entities [ticks]
# 冻结游戏 (玩家可移动,方块与实体暂停)
/tick freeze
# 单步执行游戏刻 (调试用)
/tick step [ticks]
# 设置游戏刻速率 (默认 20, 常用范围 1~250)
/tick rate [tps]
# 快速执行指定游戏时间,结束后可选执行命令
/tick warp [ticks] [cmd]
# 显示 warp 状态与剩余 tick
/tick warp status
```
:::

### 信息与调试指令

::: details 点击展开指令
```
# 测量两点间距离
/distance from [起点] to [终点]
/distance from [起点]
/distance to [终点]

# 显示方块信息(状态/NBT)
/info block [坐标]
# 显示实体信息(标签/NBT/HP)
/info entity <选择器>

# 显示生物生成空间(5x5x5 立方体有效生成格)
/perimeterinfo [坐标] [生物]

# 漏斗物品计数器(支持实时显示)
/counter [颜色] [realtime]
# 经验球计数器
/xcounter [颜色] [realtime]
# 无限物品供应商计数器
/scounter [颜色] [realtime]

# 显示生物生成限制
/spawn mobcaps [维度]
# 显示本地(玩家附近)生物生成限制
/spawn mobcapsLocal [玩家]

# 测试玩家与服务器延迟
/ping

# 刷新客户端背包同步
/refresh inventory
# 强制刷新区块(重发 chunk 数据包)
/refresh chunk [范围]

# 移除指定实体(支持选择器)
/removeentity <选择器>
```
:::

## TIS Addition 指令扩展

### 实体生命周期追踪
**`/lifetime`** 提供实体从生成到移除的全周期数据统计：

::: details 点击展开指令
```
# 显示实体生命周期统计(平均存活/最老/生成原因/移除原因)
/lifetime <实体类型> [查询类型]
# 设置过滤条件(按选择器精确筛选)
/lifetime filter <实体类型> set <选择器>
# 清除过滤条件
/lifetime filter <实体类型> clear
# 生命周期记录器管理(start/stop/reset)
/lifetime recorder [操作]
```
:::

### 世界操作指令
**`/manipulate`** 直接修改世界与实体状态：

::: details 点击展开指令
```
# 操作区域方块(set/fill/replace 等)
/manipulate block <区域> [操作]
# 触发方块事件(如容器打开动画)
/manipulate block ... execute
# 手动发送方块更新
/manipulate block ... emit

# 操作区块
/manipulate chunk <区域> [操作]
# 擦除区块(危险!删除所有方块与实体)
/manipulate chunk erase
# 重新计算光照
/manipulate chunk relight

# 操作方块实体数据容器(箱子/熔炉/刷怪笼等)
/manipulate container [容器] [操作]

# 操作实体 NBT
/manipulate entity <选择器> [操作]
```
:::

### 其他 TIS 工具指令

::: details 点击展开指令
```
# 显示当前维度的游戏刻执行顺序
/info world ticking_order
# 显示天气预报与属性
/info world weather

# 网络速度测试(测速带宽与延迟)
/speedtest download [size_mib]
/speedtest upload [size_mib]
/speedtest ping [count] [interval]
```
:::

## Carpet Extra 指令

Carpet Extra 新增大量实用功能，核心规则如下（均来自 carpet-extra 官方仓库）：

### 物品与玩家交互

::: details 点击展开指令
```
# 启用漏斗自动合成(合成配方型漏斗)
/autoCraftingDropper
# 修复 F3 调试界面方块状态同步问题
/blockStateSyncing
# 花盆作为区块加载器(空区块常驻加载)
/flowerPotChunkLoading
```
:::

### 发射器行为扩展（红石机械常用）

::: details 点击展开指令
```
# 发射器可以放置方块
/dispenserPlacesBlocks
# 发射器雕刻南瓜
/dispensersCarvePumpkins
# 发射器喂养动物(狼/猫/马等)
/dispensersFeedAnimals
# 发射器填充矿车(物品/漏斗/TNT矿车)
/dispensersFillMinecarts
# 发射器对牛/哞菇挤奶
/dispensersMilkAnimals
# 发射器在冰上放置船
/dispensersPlaceBoatsOnIce
# 发射器将花放入花盆
/dispensersPotPlants
# 发射器用斧去皮原木为木头
/dispensersStripBlocks
# 发射器用锄头耕地
/dispensersTillSoil
# 还原 1.8 版本活塞双重收缩特性
/doubleRetraction
```
:::

### 生物与游戏特性扩展

::: details 点击展开指令
```
# 剪刀可以剪取鸡的羽毛
/chickenShearing
# 牧师村民自动种植地狱疣
/clericsFarmWarts
# 丛林神庙只生成苦力怕
/creeperSpawningInJungleTemples
```
:::

## Carpet Fixes 指令

专注修复游戏原生 BUG，以下条目来自 Carpet Fixes 官方 Wiki 确认存在：

::: details 点击展开指令
```
# 修复末影水晶被爆炸破坏时不触发二次爆炸
/crystalExplodeOnExplodedFix
# 修复海绵吸水时不发送方块更新
/spongeUpdateFix
# 修复字符串标签 NBT 漏洞(物品复制/崩溃)
/stringTagExploitFix
# 修复玩家撞墙时不正确的反弹减速逻辑
/incorrectBounceLogicFix
# 修复方向性格挡减速异常
/directionalBlockSlowdownFix
# 修复末地虚空环生成异常
/endVoidRingsFix
```
:::

## 其他开源附属模块指令

### Carpet SkyAdditions（空岛专用）

::: details 点击展开指令
```
# 打开空岛自定义 GUI
/islands
# 打开空岛管理员控制面板
/islands-admin
# 启用空岛数据包(正式开始空岛玩法)
/datapack enable carpetskyadditions:skyblock
```
:::

### Carpet Gamerules

::: details 点击展开指令
```
# 直接设置原版游戏规则
/gamerule <规则名> <值>
# 通过 Carpet 查看/设置游戏规则
/carpet gamerule <规则名> [值]
```
:::

### Carpet Extra Extras

::: details 点击展开指令
```
# 切换自由视角模式(观察者快捷模式)
/cam
# 记录末影珍珠轨迹(需先启用 trackEnderPearls 规则)
/log pearls
```
:::

## Scarpet 脚本指令（fabric-carpet 内置）

Carpet 内置的 LUA 风格脚本引擎：

::: details 点击展开指令
```
# 显示 Scarpet 版本信息
/scar
# 显示帮助信息(可指定命令或函数名)
/scar help [命令]
# 运行脚本文件(可带参数)
/scar run [文件路径] [参数]
# 执行单行表达式
/scar eval [代码]
# 定义函数
/scar function [函数名] [参数]
# 执行数学计算
/scar math [表达式]
# 操作表格数据
/scar table [操作]
# 列出当前已定义的函数
/scar list
# 列出系统内置模块
/scar modules
# 加载指定内置模块(如 math/string/event/world)
/scar require [模块名]
```
:::

### 参考链接
- [fabric-carpet 官方 Wiki (最全规则速查)](https://github.com/gnembon/fabric-carpet/wiki/Current-Available-Settings)
- [Scarpet 脚本 API 参考](https://github.com/gnembon/fabric-carpet/wiki/Scarpet)
- [Carpet TIS Addition 官方文档](https://carpet.tis.world/)
- [TISUnion/Carpet-TIS-Addition 仓库](https://github.com/TISUnion/Carpet-TIS-Addition)
- [gnembon/carpet-extra 仓库](https://github.com/gnembon/carpet-extra)
- [Carpet Fixes GitHub Wiki](https://github.com/fxmorin/carpet-fixes/wiki)