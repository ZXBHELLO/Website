---
title: 玩家指令
date: 2025-11-03
article: false
permalink: /mcmmo/players/commands/
---

# MCMMO玩家指令

::: tip 💡 简介
MCMMO为玩家提供了丰富的指令来查看技能信息、管理队伍和控制技能设置。
:::

## 基本信息指令

### /mcmmo

::: info ℹ️ 基本信息
- **描述**：显示MCMMO插件的简要介绍和完整指令列表
- **别名**：无
- **权限节点**：无
:::

### /mcstats 或 /stats

::: info ℹ️ 技能信息
- **描述**：显示你的MCMMO技能等级和经验
- **别名**：/stats
- **权限节点**：mcmmo.commands.mcstats
:::

### /mcrank

::: info ℹ️ 排名信息
- **描述**：显示你的MCMMO排名
- **别名**：无
- **权限节点**：mcmmo.commands.mcrank
:::

### /mctop

::: info ℹ️ 排行榜
- **描述**：显示MCMMO排行榜
- **别名**：无
- **权限节点**：mcmmo.commands.mctop
:::

## 技能特定指令

::: tip 💡 技能详细信息
这些指令用于查看特定技能的详细信息：
:::

| 指令 | 描述 | 权限节点 |
|------|------|----------|
| /excavation | 查看挖掘技能详细信息 | mcmmo.commands.excavation |
| /herbalism | 查看草药学技能详细信息 | mcmmo.commands.herbalism |
| /mining | 查看挖矿技能详细信息 | mcmmo.commands.mining |
| /woodcutting | 查看伐木技能详细信息 | mcmmo.commands.woodcutting |
| /axes | 查看斧技技能详细信息 | mcmmo.commands.axes |
| /archery | 查看箭术技能详细信息 | mcmmo.commands.archery |
| /crossbows | 查看弩技技能详细信息 | mcmmo.commands.crossbows |
| /swords | 查看剑术技能详细信息 | mcmmo.commands.swords |
| /taming | 查看驯养技能详细信息 | mcmmo.commands.taming |
| /tridents | 查看三叉戟技能详细信息 | mcmmo.commands.tridents |
| /unarmed | 查看格斗技能详细信息 | mcmmo.commands.unarmed |
| /acrobatics | 查看杂技技能详细信息 | mcmmo.commands.acrobatics |
| /repair | 查看修理技能详细信息 | mcmmo.commands.repair |
| /fishing | 查看钓鱼技能详细信息 | mcmmo.commands.fishing |
| /smelting | 查看熔炼技能详细信息 | mcmmo.commands.smelting |
| /alchemy | 查看炼药学技能详细信息 | mcmmo.commands.alchemy |
| /salvage | 查看分解技能详细信息 | mcmmo.commands.salvage |
| /maces | 查看锤技技能详细信息 | mcmmo.commands.maces |

## 队伍指令

### /party

- **描述**：创建或加入队伍
- **别名**：无
- **权限节点**：mcmmo.commands.party

### /ptp [玩家名]

- **描述**：传送到队伍成员身边
- **别名**：无
- **权限节点**：mcmmo.commands.ptp
- **示例**：`/ptp Steve` 传送到玩家Steve身边

### /partychat 或 /pc 或 /p

- **描述**：切换队伍聊天或发送队伍聊天消息
- **别名**：/pc, /p
- **权限节点**：mcmmo.chat.partychat
- **用法**：
  - `/partychat` 切换队伍聊天模式
  - `/partychat [消息]` 发送一条队伍聊天消息

## 设置指令

### /mcability

- **描述**：切换右键是否激活技能能力
- **别名**：无
- **权限节点**：mcmmo.commands.mcability

### /mcnotify

- **描述**：切换技能能力的聊天通知显示
- **别名**：/notify
- **权限节点**：mcmmo.commands.mcnotify

### /mcscoreboard 或 /mcsb

- **描述**：管理MCMMO计分板
- **别名**：/mcsb
- **权限节点**：mcmmo.commands.mcscoreboard

### /mmoxpbar 或 /xpbarsettings

- **描述**：更改经验条设置
- **别名**：/xpbarsettings
- **权限节点**：mcmmo.commands.mmoxpbar

## 参考资料

- [MCMMO官方Wiki - Commands](https://wiki.mcmmo.org/Commands)