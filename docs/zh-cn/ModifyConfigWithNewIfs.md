# 希望举办新一轮 IFS，该如何修改 Bot 配置？
如果你的城市已经举办过一轮 IFS，并且 [bot 版本在期间没有更新](/zh-cn/VersionUpdate)，那么你可以直接以「复制 base + 修改环境变量」的方法来对 bot 进行重新配置。

## 复制 Base
和 [快速部署指南](/zh-cn/QuickDeployGuide) 中的方法一样，直接使用「Duplicate base」来复制之前用过的 base。所在城市有多场 IFS，也可以根据 [这篇指南](/zh-cn/MultipleIfs) 配置多场 IFS 的表格。

> **注意！** 务必取消选中「Duplicate records」选项，以便于导入新的 RSVP 名单。

## 修改环境变量
### 通过「Deploy to Heroku」部署
进入 [Heroku 控制台](https://dashboard.heroku.com/)，点击 Settings，找到 Config Vars 部分的「Reveal Config Vars」按钮。找到 `IFS_INFO` 变量，点击右侧的编辑按钮，修改其中的 JSON 代码即可。

![Config Vars 界面](https://i.imgur.com/k95YxI7.png)

保存后，即时生效。新工作人员可以尝试对 bot 发送 `/start` 指令，查看配置是否正确。

### 通过自定义方式部署
请通过互联网，搜索你所使用的部署方式的环境变量修改方法。