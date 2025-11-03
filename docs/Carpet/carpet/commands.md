---
title: Carpet指令
date: 2025-11-04
permalink: /carpet/commands/
---

# Carpet指令

Carpet模组提供了丰富的指令系统，允许玩家和管理员控制游戏的各个方面。以下是对Carpet模组中主要指令的详细介绍。

## 基础指令

### /carpet

这是Carpet模组的主要配置指令。

**用法：**
- `/carpet`：显示当前地毯版本和非原版规则列表
- `/carpet list defaults`：列出carpet.conf中储存的该世界默认配置
- `/carpet list`：列出所有可用的地毯规则
- `/carpet list [tag]`：列出所有可用的有指定类别的地毯规则
- `/carpet removeDefault [规则]`：删除该世界上指定地毯规则的自定义默认配置并将其恢复为原始默认配置
- `/carpet setDefault [规则] [值]`：将指定地毯规则的默认值设置为给定值
- `/carpet [规则] [值]`：将指定的地毯规则设置为给定值。会在重启或关闭后恢复为carpet.conf中的默认配置

**权限要求：** 默认需要OP权限（权限等级4）

### /tick

控制游戏时钟相关的指令。

**主要功能：**
- `/tick rate [数值]`：设置游戏刻速率
- `/tick warp [刻数]`：快速运行指定的游戏刻数
- `/tick freeze`：冻结游戏时间
- `/tick step [刻数]`：逐步运行指定的游戏刻数
- `/tick superHot`：启用超级热模式（只有在玩家移动时时间才流逝）

### /log

监控游戏事件的指令。

**用法：**
- `/log [事件类型]`：开始或停止记录指定事件类型
- `/log clear`：清除所有活动的日志记录

**常见事件类型：**
- `tps`：监控服务器TPS
- `mobcaps`：监控生物上限
- `counter`：监控计数器
- `errors`：监控错误日志

### /player

控制假玩家的指令。

**用法：**
- `/player [玩家名] spawn`：生成一个假玩家
- `/player [玩家名] despawn`：移除一个假玩家
- `/player [玩家名] stop`：停止假玩家的所有动作
- `/player [玩家名] shadow`：复制真实玩家的行为

### /profile

性能分析指令。

**用法：**
- `/profile [时间]`：分析指定时间内的游戏性能
- `/profile health`：分析实体AI性能

### /spawn

生物生成监控指令。

**用法：**
- `/spawn list`：列出所有生物生成尝试
- `/spawn tracking start [生物类型]`：开始追踪指定类型的生物生成
- `/spawn tracking stop`：停止追踪生物生成

### /track

追踪实体AI的指令。

**用法：**
- `/track [实体类型]`：追踪指定类型的实体AI

### /distance

测量距离的指令。

**用法：**
- `/distance`：测量玩家之间的距离
- 需要启用相应的规则才能使用

### /info

查看方块信息的指令。

**用法：**
- `/info block`：查看目标方块的信息
- 需要启用相应的规则才能使用

### /perimeterinfo

扫描周围区域寻找潜在生成位置的指令。

**用法：**
- `/perimeterinfo`：扫描周围区域

### /script

Scarpet脚本API指令。

**用法：**
- `/script load [脚本名]`：加载指定的Scarpet脚本
- `/script unload [脚本名]`：卸载指定的Scarpet脚本
- `/script invoke [函数名]`：调用脚本中的函数

## 相机模式指令

在1.16之前版本中，Carpet提供了相机模式：

- `/c`：将玩家设置为旁观模式（具有夜视和潮涌能量效果）
- `/s`：相关相机模式指令

注意：在1.16及以后版本中，由于存在F3+F4功能，相机模式已被移除，若要恢复需要安装cam Scarpet脚本。

## 权限系统

Carpet模组使用权限等级系统：

- 等级0：普通玩家
- 等级1-3：不同程度的OP权限
- 等级4：完整OP权限（默认）

可以通过[carpetCommandPermissionLevel](./rules.md)规则修改使用Carpet命令所需的权限等级。

## 参考资料

- [Carpet GitHub仓库](https://github.com/gnembon/fabric-carpet)
- [Carpet Wiki](https://github.com/gnembon/fabric-carpet/wiki)
- [Bilibili Carpet教程](https://www.bilibili.com/video/BV1hE411D7um/)