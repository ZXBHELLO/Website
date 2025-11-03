---
title: MCMMO高级配置
shortTitle: 高级配置
date: 2025-11-03
article: false
permalink: /MCMMO/admins/config/
---

# MCMMO高级配置

MCMMO提供了丰富的配置选项，允许服务器管理员根据自己的需求定制插件行为。

## 配置文件位置

MCMMO的配置文件位于服务器的以下目录中：
```
plugins/mcMMO/
```

主要配置文件包括：
- `config.yml` - 主配置文件
- `experience.yml` - 经验值配置
- `treasures.yml` - 宝藏掉落配置
- `repair.yml` - 修理配置
- `salvage.yml` - 分解配置
- `skills.yml` - 技能配置
- `locale/` - 本地化文件目录

## 主配置文件 (config.yml)

主配置文件包含MCMMO的核心设置：

### 通用设置

```yaml
# 是否启用特定功能
Skills:
  # 是否启用特定技能
  Mining:
    Enabled: true
  Woodcutting:
    Enabled: true
  # ...其他技能设置

# 经验设置
Experience:
  # 经验倍率
  Multiplier:
    Global: 1.0
  # PVP经验设置
  PVP:
    Rewards: true
    
# 能力设置
Abilities:
  # 是否启用右键激活能力
  Activation:
    Right_Click: true
  # 冷却时间设置
  Cooldowns:
    Enabled: true
```

### 数据库设置

MCMMO支持多种数据库后端：

```yaml
Database:
  # 数据库类型 (FLATFILE, SQL)
  Type: FLATFILE
  # SQL数据库设置
  SQL:
    Host: localhost
    Port: 3306
    Database: mcmmo
    Username: mcmmo
    Password: password
```

## 经验值配置 (experience.yml)

经验配置文件允许您调整各种技能的经验获取：

```yaml
# 每个技能的经验设置
Skills:
  Mining:
    # 基础经验
    Base_XP: 10
    # 最大等级
    Max_Level: 1000
    # 等级公式
    Formula:
      XP_to_Level: (10 * (level + 1)) ^ 1.2
  Woodcutting:
    Base_XP: 10
    Max_Level: 1000
```

## 宝藏配置 (treasures.yml)

宝藏配置文件控制钓鱼等技能的掉落物：

```yaml
Fishing:
  # 不同稀有度的物品
  Common:
    - Item: LEATHER_BOOTS
      Amount: 1
    - Item: WOODEN_SHOVEL
      Amount: 1
  Uncommon:
    - Item: STONE_SWORD
      Amount: 1
    - Item: GOLDEN_APPLE
      Amount: 1
  Rare:
    - Item: IRON_SWORD
      Amount: 1
    - Item: BOW
      Amount: 1
```

## 修理配置 (repair.yml)

修理配置文件控制修理功能：

```yaml
Repairables:
  # 可修理的物品
  IRON_SWORD:
    # 修理所需材料
    Material: IRON_INGOT
    # 修理倍率
    Repair_Material_Multiplier: 2
    # 最大修理量
    Maximum_Durability: 250
```

## 分解配置 (salvage.yml)

分解配置文件控制分解功能：

```yaml
Salvageables:
  # 可分解的物品
  IRON_SWORD:
    # 分解所得材料
    Material: IRON_INGOT
    # 分解倍率
    Material_Multiplier: 1
    # 最大耐久度
    Maximum_Durability: 250
```

## 本地化配置

MCMMO支持多语言本地化，配置文件位于`locale/`目录中。您可以修改这些文件来自定义插件显示的文本。

## Hardcore模式和Vampirism模式

虽然这些模式的指令已被移除，但配置选项仍然可用：

```yaml
# Hardcore模式设置
Hardcore:
  # 是否启用
  Enabled: false
  # 死亡时技能等级减少百分比
  Death_Stat_Loss:
    Percentage: 75.0
    # 是否启用特定技能的损失
    Mining: true
    Woodcutting: true
    # ...其他技能

# Vampirism模式设置
Vampirism:
  # 是否启用
  Enabled: false
  # PVP中偷取经验百分比
  Leech_Percentage: 5.0
```

## 性能优化设置

```yaml
# 性能设置
Performance:
  # 是否启用缓存
  Cache:
    Enabled: true
  # 是否启用预取
  Prefetch:
    Enabled: false
```

## 世界黑名单

您可以配置MCMMO在特定世界中禁用：

```yaml
# 世界黑名单
World_Blacklist:
  - world_nether
  - world_the_end
```

## 参考资料

- [MCMMO官方Wiki - Configuration](https://wiki.mcmmo.org/Configuration)