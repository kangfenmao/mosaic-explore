# 万象探索

[English](./README.md)

万象探索是一款 Cherry Studio 小程序。它会从一个问题出发，一边流式生成直接答案，一边并发准备探索卡片、趣味知识和相关主题，把搜索变成可继续深入的知识旅程。

[在 Cherry Studio 中安装](https://kangfenmao.github.io/mosaic-explore/manifest.json)

![万象探索首页](./screenshots/home.png)

![万象探索详情页](./screenshots/exploration.png)

## 功能

- 流式生成直接答案，同时并发生成探索内容。
- 每次提供六个探索方向、三条趣味知识和多个下一站主题。
- 可以从首页快捷建议进入包含 20 个话题的探索页，每小时在后台更新一次，并在下次进入时显示。
- 推荐内容按类别均衡轮换，并尽量避开历史中已经探索过的主题。
- 相同搜索优先打开本地缓存，也可以明确选择重新生成。
- 本地保存最多 100 条完整探索记录和 12 条收藏，支持单条收藏和删除。
- 可以结合当前答案继续追问。
- 开启可选权限后，可以将探索结果导出为便于分享的文本文件。
- 内容基于模型已有知识生成，并明确提示不代表实时信息。

## 权限说明

| 权限 | 用途 |
| --- | --- |
| `ai.chat` | 生成答案、探索卡片、趣味知识和相关主题。 |
| `file.load` | 读取本地探索历史缓存。 |
| `file.save` | 在本地保存最多 100 条完整探索结果。 |
| `file.export`（可选） | 由用户选择位置，将当前探索结果导出为文本文件。 |
| `storage.get` | 读取收藏，并兼容迁移旧版历史数据。 |
| `storage.set` | 保存收藏。 |

小程序不申请网络权限。AI 请求通过 Cherry Studio 中已配置的模型服务完成。

## 安装

在 Cherry Studio 中通过下面的 manifest 地址安装：

```text
https://kangfenmao.github.io/mosaic-explore/manifest.json
```

也可以从 [GitHub Releases](https://github.com/kangfenmao/mosaic-explore/releases) 下载各版本的 `.miniapp` 文件。

## 源码与打包

安装包源码位于 [`app`](./app/) 目录。`.miniapp` 是以 `manifest.json` 为根文件的 zip 归档：

```sh
cd app
zip -X -r ../mosaic-explore.miniapp . -x '.*' -x '__MACOSX/*'
```

将 `app/manifest.json` 中的新版本推送到 `main` 后，发布工作流会自动构建安装包、计算摘要与大小、生成 distribution manifest、部署到 GitHub Pages，并创建对应的 GitHub Release。

## 问题反馈

请通过 [GitHub Issues](https://github.com/kangfenmao/mosaic-explore/issues) 报告问题或提出功能建议。

## 许可证

[MIT](./LICENSE)
