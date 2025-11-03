---
title: MCMMO安装与配置指南
shortTitle: 安装配置
date: 2025-11-03
article: false
permalink: /MCMMO/admins/install/
---

# MCMMO安装与配置指南

本指南将帮助服务器管理员（腐竹）正确安装和配置MCMMO插件。

## 前置要求

### Java和Minecraft版本

- 推荐使用最新版本的Java Minecraft
- 使用兼容版本的Spigot、Paper或Folia

> MCMMO官方支持Spigot、Paper和Folia。对于这些平台之外的支持最多只是非官方的。

现代版本的MCMMO期望您运行最新可用的Java Minecraft版本，但旧版本的MCMMO仍然可用，并且应该可以很好地支持旧版本。

MCMMO是Spigot API的插件，这使得运行Spigot或Paper成为必需，其他Spigot/Paper的分支可能会工作，但对于那些想要无痛安装并让一切正常工作的用户，我们官方推荐坚持使用Spigot或Paper。

历史上，非常旧版本的MCMMO直接针对CraftBukkit（Spigot的精神前身）运行，但这种情况不再存在，MCMMO如果不运行Spigot或Paper将无法工作。

## 安装最新版MCMMO

### 步骤

1. 从以下来源获取最新版本的MCMMO：
   - [SpigotMC](https://www.spigotmc.org/resources/mcmmo.1447/)
   - [Polymart](https://polymart.org/resource/mcmmo.142)

2. 将mcMMO.jar放置在服务器目录的`plugins`文件夹中：
   ```
   /path/to/your/spigot-or-paper-server/plugins/
   ```

3. 启动或重启服务器

## 升级MCMMO

升级MCMMO旨在尽可能简单，您永远不需要删除数据或配置。

### 步骤

1. 从SpigotMC或Polymart获取最新版本的MCMMO
2. 确保您的Spigot或Paper服务器是最新的
3. 将mcMMO.jar放置在服务器目录的`plugins`文件夹中
4. 替换现有的mcMMO.jar

恭喜，您已升级MCMMO。请确保您运行的是兼容版本的Java Minecraft和Spigot/Paper。最新版本的MCMMO针对最新版本的Java Minecraft，因此可能不适用于旧版本。

## 配置更新

如果您已经运行MCMMO一段时间，您可能使用的是旧版本的配置。MCMMO会尽可能尊重用户配置设置，因此除非有必要保持MCMMO正常工作，否则不会修改配置。

有时MCMMO会更新其默认配置文件值，在某些配置文件中，如果您不自己添加新值，它们就不存在。这适用于宝藏配置文件、修理配置文件和分解配置文件。

### 更新MCMMO配置文件

如果您是不自定义上述配置文件的服务器所有者，您可以简单地删除mcMMO目录中的.yml文件以重新生成具有最新默认值的文件。如果您是广泛自定义MCMMO安装的类型，那么您需要遵循每次发布的更新日志，并根据需要自己更新这些配置文件中的值。请注意不要删除mcMMO目录本身，因为那是默认保存玩家数据的地方。

## 旧版本兼容性

### 从MCMMO经典版升级

如果您从MCMMO经典版升级，您可以遵循升级说明，一切应该正常工作。但是，一旦您执行此操作，您将无法回到MCMMO经典版，因为配置文件已更新为与MCMMO中的最新更改兼容。一个简单的解决方法是切换回经典版时删除.yml文件，经典版将生成新的文件。

### 旧版本安装和前置要求

在针对旧版本游戏使用MCMMO时，您必须确保使用与该游戏版本兼容的MCMMO版本，并且必须将其与该版本的Java Minecraft的最新版本的Spigot或Paper匹配。旧版本按原样提供，其中发现的任何错误/漏洞都保持原样。目前没有MCMMO开发人员致力于维护旧版本。

- 获取与您使用的Java Minecraft版本兼容的MCMMO版本
- 获取该版本Java Minecraft的最新Spigot或Paper软件
- 将mcMMO.jar放置在旧版Spigot或Paper服务器的plugins目录中

如果您在运行旧版本时遇到任何错误/问题，请确保您拥有最新版本的Spigot（来自BuildTools）或最新版本的Paper。如果问题仍然存在，您可能运气不好，因为旧版本按原样提供且不接收更新，但MCMMO源代码在GitHub上自由获取，因此具有编程背景的人可以分叉旧版本的代码库并自行修复问题。

## 参考资料

- [MCMMO官方Wiki - Installation](https://wiki.mcmmo.org/Installation)