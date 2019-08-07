# 快速部署指南
本文档是一个 step-by-step 的 IFS RSVP Bot 部署指南，旨在为希望快速完成 IFS 签到/签退 bot 部署的玩家所准备的。

跟随本指南，你将可以在 Heroku 免费服务中部署这个 bot [注 1]，并拥有 bot 相对完整的功能。如果需要定制化功能，你需要进行高级部署。

## 准备 Airtable

你需要一个 Airtable 帐户（如果没有，[点击这里注册](https://airtable.com/invite/r/TCqAJZhy)）。

访问 [示例库](https://airtable.com/invite/l?inviteId=invHAheLd4lx9hWiI&inviteToken=f23d0248c93fe1e058d2da07470b44f6f8788d0ade9a8033885595d2d2e82787)，在 Bases 中，点击「Add a workspace」来新建一个工作空间，你可以任意定名你的工作空间。

![新工作空间示例](https://i.imgur.com/VjKJ0et.png)

在 Bases 中的「IFS Base Sample」空间中，点击「Base Sample」右下角的箭头，选择「Duplicate base」，然后在 Choose workspace 中找到你刚才新建的工作空间。切记关闭「Duplicate records」选项。

![复制 Base](https://i.imgur.com/puxE12J.png)

进入你刚才复制的 Base 中。给表格改个名字，改成 IFS 所在地区的名字。

::: tip 另请关注
如果你所在城市有多场 IFS，请参阅 [这篇指南](/zh-cn/MultipleIfs)。
:::

![改名字](https://i.imgur.com/lxpozq6.png)

然后，[进入你的 Airtable 设置](https://airtable.com/account)，点击「Generate API Key」并保留你的 API 密钥。

然后到 [API 文档](https://airtable.com/api)，找到你刚才复制的 Base（如果你没有改 Base 的名字，那它应该是「Base Sample Copy」）。

按照下图，找到你的 base 的 ID（右侧选中部分）。保留好。（该 ID 在 URL 中也可以找到。）

![获取 Base ID](https://i.imgur.com/5zPDjFQ.png)

## 准备 Telegram bot

与 [BotFather](https://t.me/botfather) 对话，新建一个 bot。BotFather 会在创建 bot 之后给你这个 bot 的 token（形如 `123456:1234567890ABCDEFGabcdefg`），保留它。

然后 ENL PoC 和 RES PoC 各向 [Get ID Bot](https://t.me/get_id_bot) 发送一条消息。这个 bot 会将你的数字 ID 返回给你（`Your Chat ID = 000000`，后面的数字就是你的数字 ID）。也要保留它。

## 部署至 Heroku

点击 [项目主页](https://github.com/Astrian/IFS-RSVP-Bot) 中的「Deploy to Heroku」按钮进入部署页面（如果你还没有注册 Heroku，上面的链接也可以进入注册），然后填写一堆上面刚刚收集好的信息：

- `AIRTABLE_TOKEN`：Airtable 帐户 API 密钥。
- `BASE_ID`：Airtable 库 ID。
- `DOMAIN`：你先填好页面上方的 `App name`，那么这一项就是 `https://<App name>.herokuapp.com`。切记 `https://` 开头，末尾不要有 `/`。
- `IFS_INFO`：填写 IFS 场次的 JSON 信息（后文给示例）。
- `RANDOM_ADDRESS`：以 `/` 开头，然后随便输入一些符合 URL 规范的字符串。
- `TELEGRAM_TOKEN`：BotFather 给你的 bot token。

`IFS_INFO` 的示例如下：

```json
[{"location":"南海","enlpoc":[123456,789012],"respoc":[345678,901234]}]
```

```json
[{"location":"天河","enlpoc":[123456],"respoc":[789012]},{"location":"海珠","enlpoc":[345678],"respoc":[901234]}]
```

其中：

- `location` 字段要与上面你自己改的表格名字一样，否则 bot 无法读取是哪一场 IFS 活动的名单。
- `enlpoc` 字段填写 ENL PoC 的 Telegram 数字 ID，以数组包裹。
- `respoc` 字段填写 RES PoC 的 Telegram 数字 ID，以数组包裹。

接着，PoC 就可以尝试 `/start` 机器人，检查是否成功被机器人读取身份了。

## 接下来……
到这里，你的 bot 程序已经可以正常工作。不过，为了让它认识已经 RSVP 的特工，我们需要进行 [数据导入](/zh-cn/ImportRsvpData) 操作。

## 注释

1. Heroku 免费的云应用空间有如下限制：一段时间无人访问将会自动待机（意味着长时间不发送消息给 bot，会导致下次反应时间过慢）、不绑定信用卡将至多建立 5 个应用。不过已经足够使用。如果有需求，你可以尝试购买 Heroku 的高级空间服务，但一般没有这个必要。