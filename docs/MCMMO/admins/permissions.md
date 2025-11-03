---
title: 权限管理
date: 2025-11-03
article: false
permalink: /mcmmo/admins/permissions/
---

# MCMMO权限管理

::: tip 简介
MCMMO使用权限节点系统来控制玩家可以访问的功能。正确配置权限可以确保玩家拥有适当的游戏体验，同时保护管理功能不被滥用。
:::

## 权限基础

::: info 基础知识
在进一步阅读之前，需要了解MCMMO权限节点被设置为默认值，这会自动确保每个玩家都能正常使用MCMMO，并为服务器操作员提供MCMMO内的管理工具。
:::

## 推荐权限设置

::: tip 推荐配置
推荐给玩家的权限是`mcmmo.defaults`，这使玩家可以访问除管理工具之外的所有内容。
:::

## 完整权限列表

::: warning 权限来源
权限的权威来源是plugin.yml，它是MCMMO源代码的一部分，当MCMMO编译时会打包在MCMMO.jar中，包含MCMMO的每个权限。
:::

## 玩家权限

以下是玩家常用的权限节点：

| 权限节点 | 描述 |
|---------|------|
| mcmmo.defaults | 访问除管理工具外的所有功能 |
| mcmmo.commands.mcmmo | 使用/mcmmo指令 |
| mcmmo.commands.mcstats | 使用/mcstats或/stats指令 |
| mcmmo.commands.mcrank | 使用/mcrank指令 |
| mcmmo.commands.mctop | 使用/mctop指令 |
| mcmmo.commands.excavation | 使用/excavation指令 |
| mcmmo.commands.herbalism | 使用/herbalism指令 |
| mcmmo.commands.mining | 使用/mining指令 |
| mcmmo.commands.woodcutting | 使用/woodcutting指令 |
| mcmmo.commands.axes | 使用/axes指令 |
| mcmmo.commands.archery | 使用/archery指令 |
| mcmmo.commands.crossbows | 使用/crossbows指令 |
| mcmmo.commands.swords | 使用/swords指令 |
| mcmmo.commands.taming | 使用/taming指令 |
| mcmmo.commands.tridents | 使用/tridents指令 |
| mcmmo.commands.unarmed | 使用/unarmed指令 |
| mcmmo.commands.acrobatics | 使用/acrobatics指令 |
| mcmmo.commands.repair | 使用/repair指令 |
| mcmmo.commands.fishing | 使用/fishing指令 |
| mcmmo.commands.smelting | 使用/smelting指令 |
| mcmmo.commands.alchemy | 使用/alchemy指令 |
| mcmmo.commands.salvage | 使用/salvage指令 |
| mcmmo.commands.maces | 使用/maces指令 |
| mcmmo.commands.party | 使用/party指令 |
| mcmmo.commands.ptp | 使用/ptp指令 |
| mcmmo.chat.partychat | 使用队伍聊天 |
| mcmmo.commands.mcability | 使用/mcability指令 |
| mcmmo.commands.mcnotify | 使用/mcnotify指令 |
| mcmmo.commands.mcscoreboard | 使用/mcscoreboard指令 |
| mcmmo.commands.mmoxpbar | 使用/mmoxpbar指令 |

## 管理员权限

以下是管理员专用的权限节点：

| 权限节点 | 描述 |
|---------|------|
| mcmmo.commands.mmoedit | 编辑用户的MCMMO技能值 |
| mcmmo.commands.xprate | 修改经验倍率或开始活动 |
| mcmmo.commands.mcpurge | 清除0级或长期不活跃的用户 |
| mcmmo.commands.mcremove | 从MCMMO数据库中删除用户 |
| mcmmo.commands.mcgod | 切换MCMMO上帝模式 |
| mcmmo.commands.reloadlocale | 重新加载MCMMO本地化设置 |
| mcmmo.commands.mcchatspy | 切换MCMMO队伍聊天监听 |
| mcmmo.commands.mcrefresh | 刷新所有MCMMO能力冷却时间 |
| mcmmo.commands.addxp | 添加MCMMO经验值给用户 |
| mcmmo.commands.addlevels | 添加MCMMO等级给用户 |
| mcmmo.commands.skillreset | 重置一个或所有技能等级 |
| mcmmo.commands.mcconvert | 在不同数据库和公式类型之间转换 |
| mcmmo.chat.adminchat | 使用管理员聊天 |

## 特权权限

MCMMO中包含特权权限，只要权限对玩家有效，就会给予玩家加成。

## 参考资料

- [MCMMO官方Wiki - Permissions](https://wiki.mcmmo.org/Permissions)