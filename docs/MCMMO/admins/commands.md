---
title: 管理员指令
date: 2025-11-03
article: false
permalink: /mcmmo/admins/commands/
---

# MCMMO管理员指令

::: tip 简介
MCMMO为服务器管理员提供了强大的管理指令，用于管理玩家技能、经验倍率、数据库等。
:::

## 管理员指令列表

### /mmoedit

::: warning 管理指令
- **描述**：编辑用户的MCMMO技能值
- **别名**：无
- **权限节点**：mcmmo.commands.mmoedit
:::

### /xprate 或 /mcxprate

::: warning 管理指令
- **描述**：修改经验倍率或开始活动
- **别名**：/mcxprate
- **权限节点**：mcmmo.commands.xprate
:::

### /mcpurge

::: warning 管理指令
- **描述**：清除技能等级为0或长期不活跃的用户
- **别名**：无
- **权限节点**：mcmmo.commands.mcpurge
:::

### /mcremove

::: warning 管理指令
- **描述**：从MCMMO数据库中删除用户
- **别名**：无
- **权限节点**：mcmmo.commands.mcremove
:::

### /mcgod

::: warning 管理指令
- **描述**：切换MCMMO上帝模式（无敌状态）
- **别名**：无
- **权限节点**：mcmmo.commands.mcgod
:::

### /mcmmoreloadlocale 或 /mcreloadlocale

::: warning 管理指令
- **描述**：重新加载MCMMO本地化设置
- **别名**：/mcreloadlocale
- **权限节点**：mcmmo.commands.reloadlocale
:::

### /mmoxpbar 或 /xpbarsettings

- **描述**：更改经验条设置
- **别名**：/xpbarsettings
- **权限节点**：mcmmo.commands.mmoxpbar

### /mcchatspy

- **描述**：切换MCMMO队伍聊天监听（可以查看所有队伍聊天）
- **别名**：无
- **权限节点**：mcmmo.commands.mcchatspy

### /mcrefresh

- **描述**：刷新所有MCMMO能力的冷却时间
- **别名**：无
- **权限节点**：mcmmo.commands.mcrefresh

### /addxp

- **描述**：给用户添加MCMMO经验值
- **别名**：无
- **权限节点**：mcmmo.commands.addxp

### /addlevels

- **描述**：给用户添加MCMMO等级
- **别名**：无
- **权限节点**：mcmmo.commands.addlevels

### /skillreset

- **描述**：重置一个或所有技能等级
- **别名**：无
- **权限节点**：mcmmo.commands.skillreset

### /mcconvert

- **描述**：在不同数据库和公式类型之间转换
- **别名**：无
- **权限节点**：mcmmo.commands.mcconvert

## 聊天管理指令

### /adminchat 或 /ac 或 /a

- **描述**：切换管理员聊天或发送管理员聊天消息
- **别名**：/ac, /a
- **权限节点**：mcmmo.chat.adminchat

## 已移除的指令

以下指令在旧版本中存在但在新版本中已被移除：

| 指令 | 别名 | 描述 | 权限节点 |
|------|------|------|----------|
| /hardcore 或 /mchardcore |  | 修改MCMMO硬核百分比或切换硬核模式（已移除） | mcmmo.commands.hardcore |
| /vampirism 或 /mcvampirism |  | 修改MCMMO吸血鬼百分比或切换吸血鬼模式（已移除） | mcmmo.commands.vampirism |
| /mcfools 或 /macho 等 |  | 愚人节指令（已移除） | mcmmo.commands.mcfools |

## 参考资料

- [MCMMO官方Wiki - Commands](https://wiki.mcmmo.org/Commands)