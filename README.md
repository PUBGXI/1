# 斗鱼精简净化插件

> 基于斗鱼 iOS App v8.160 数据包（HAR）逆向分析，精确拦截直播间冗余请求

## 📦 文件说明

| 文件 | 说明 |
|------|------|
| `douyu_minimal.plugin` | Loon 插件主文件 |
| `douyu_minimal.js` | 响应处理脚本（需与插件同目录） |
| `douyu_API分析报告.md` | HAR 数据包完整 API 接口清单 |

## 🎯 功能

进入直播间后**只保留弹幕和视频**，自动屏蔽以下干扰：

| 分类 | 拦截方式 |
|------|----------|
| 礼物系统（礼物列表、特效、商城、红包） | rewrite reject-200 |
| 互动活动（投票、竞猜、抽奖、主播守护、粉丝勋章） | rewrite reject-200 |
| 广告推送（rtbapi） | 规则 REJECT |
| 统计打点（dotserver/dotab/dotbeats/dotcounter） | 规则 REJECT |
| P2P 日志上报（p2perrorlog/p2plog/sdkapi） | 规则 REJECT |
| 流媒体统计（streamdot） | 规则 REJECT |
| 第三方 SDK（Bugly、微信、微博、Geetest、腾讯分析、虎牙等） | 规则 REJECT |
| 热更新/动态配置（venus/tower/accplay/capi） | 规则 REJECT |
| 房间皮肤装饰 | rewrite reject-200 |
| 推荐/搜索/首页 | rewrite reject-200 |

## ⚙️ 可配置参数

| 参数 | 默认 | 说明 |
|------|------|------|
| 保留视频画面 | ✅ ON | 关闭后仅保留弹幕（纯聊天模式） |
| 保留礼物系统 | ❌ OFF | 开启后恢复礼物/商城/红包 |
| 保留活动互动 | ❌ OFF | 开启后恢复投票/竞猜/抽奖 |
| 保留统计上报 | ❌ OFF | 开启后恢复打点/AB测试/日志 |

## 📥 安装

### Loon

1. 插件安装地址：
   ```
   https://raw.githubusercontent.com/PUBGXI/1/main/douyu_minimal.plugin
   ```
2. 将 `douyu_minimal.js` 放入 Loon 的 `Plugin` 目录（与插件同路径）
3. 在 Loon 中开启插件

### 调整配置

插件页面 → 点击插件名 → 修改 Argument 参数

## 📊 数据来源

基于斗鱼 iOS App v8.160 的 HAR 抓包分析（578 个请求，407 个唯一 API 接口），详见 [API 分析报告](douyu_API分析报告.md)。

## 📄 许可证

MIT