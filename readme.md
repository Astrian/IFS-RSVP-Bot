# IFS RSVP 登记助手机器人

## 介绍 & 功能
这是一款专用于 Ingress First Saturday 活动中 PoC 统计到场人员 RSVP、AP 与等级情况的 Telegram Bot。

目前拥有功能：

- 一键部署至 Heroku
- 快速签到 / 签退
- 登记玩家等级与 AP（经验值）
- 限定 PoC 访问 Bot
- 联动 Airtable 服务，快速根据 AP 差额生成全阵营榜单、独立阵营榜单，并可链接访问

## 部署方法
### 准备 AirTable

你需要一个 Airtable 帐户（如果没有，[点击这里注册](https://airtable.com/invite/r/TCqAJZhy)）。

访问 [示例库](https://airtable.com/invite/l?inviteId=inv61JtROyXz3yLfa&inviteToken=d27558b20f20a5f78c5768cbd11a914e41e21faf3e7916fd4ab569f17f2778f5)，

在 Bases 中，点击「Add a workspace」来新建一个工作空间，你可以任意定名你的工作空间。

![新工作空间示例](https://i.imgur.com/VjKJ0et.png)

在 Bases 中的「IFS Base Sample」空间中，点击「Base Sample」右下角的箭头，选择「Duplicate base」，然后在 Choose workspace 中找到你刚才新建的工作空间。切记关闭「Duplicate records」选项。

![复制 Base](https://i.imgur.com/puxE12J.png)

进入你刚才复制的 Base 中。给表格改个名字，改成 IFS 所在地区的名字。如果你所在城市有多场 IFS，那么可以选择「Duplicate table」，并用相同方式，为新表改名为另一个地区的名字。

![改名字](https://i.imgur.com/lxpozq6.png)

在表中登记 agents 信息。只需要登记特工代号和阵营即可。

然后，[进入你的 Airtable 设置](https://airtable.com/account)，点击「Generate API Key」并保留你的 API 密钥。

然后到 [API 文档](https://airtable.com/api)，找到你刚才复制的 Base（如果你没有改 Base 的名字，那它应该是「Base Sample Copy」）。

按照下图，找到你的 base 的 ID（右侧选中部分）。保留好。

![获取 Base ID](https://i.imgur.com/5zPDjFQ.png)

## 准备 Telegram bot

与 [BotFather](https://t.me/botfather) 对话，新建一个 bot。BotFather 会在创建 bot 之后给你这个 bot 的 token（形如 `123456:1234567890ABCDEFGabcdefg`），保留它。

然后 ENL PoC 和 RES PoC 各向 [Get ID Bot](https://t.me/get_id_bot) 发送一条消息。这个 bot 会将你的数字 ID 返回给你（`Your Chat ID = 000000`，后面的数字就是你的数字 ID）。也要保留它。

## 部署至 Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

点击以上按钮进入部署页面（如果你还没有注册 Heroku，上面的链接也可以进入注册），然后填写一堆上面刚刚收集好的信息：

- `AIRTABLE_TOKEN`：Airtable 帐户 API 密钥。
- `BASE_ID`：Airtable 库 ID。
- `DOMAIN`：你先填好页面上方的 `App name`，那么这一项就是 `https://<App name>.herokuapp.com`。切记 `https://` 开头，末尾不要有 `/`。
- `IFS_INFO`：填写 IFS 场次的 JSON 信息（后文给示例）。
- `RANDOM_ADDRESS`：以 `/` 开头，然后随便输入一些符合 URL 规范的字符串。
- `TELEGRAM_TOKEN`：BotFather 给你的 bot token。

`IFS_INFO` 的示例如下：

```
[{"location":"南海","enlpoc":123456,"respoc":789012}]
```

```
[{"location":"天河","enlpoc":123456,"respoc":789012},{"location":"海珠","enlpoc":345678,"respoc":901234}]
```

其中：

- `location` 字段要与上面你自己改的表格名字一样，否则 bot 无法读取是哪一场 IFS 活动的名单。
- `enlpoc` 字段填写 ENL PoC 的 Telegram 数字 ID。
- `respoc` 字段填写 RES PoC 的 Telegram 数字 ID。

## TODO

- 支援多个 PoC 进行操作
- 快速登记 RSVP 信息
- OCR 识别 agent AP/等级资料
