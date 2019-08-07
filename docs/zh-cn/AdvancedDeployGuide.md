# 高级部署指南
如果你有以下的情况：

- 希望使用自己的 VPS 或云服务器进行部署。
- 需要针对你所在城市的 IFS 活动有额外需求，且对 JavaScript、Node.js 等语言有开发经验。

那么，你可以尝试此指南中的方式，进行自己部署。

## 通过 Git 下载代码并部署
如果你想在 VPS 或者云服务器中部署 IFS RSVP Bot，那么通过 Git 下载代码是一个比较合适的方式。

在开始之前，请确保你的 VPS 已经安装 Node.js 环境和 Git 程序。同时，你需要拥有一个域名，并有相关的 HTTP 服务器程序（比如 Nginx 或是 Apache）。

1. 使用 `git clone https://github.com/Astrian/IFS-RSVP-Bot` 指令下载（克隆）代码
2. 使用 `npm install` 来安装依赖
3. 使用 `node app.js` 或 `pm2 start app.js`（若你安装了 pm2）来启动 bot 程序

注意，如果你 fork 并修改了代码，在第一步时，请将后面的地址改为 fork 后的 repo 地址。

配置环境变量。你需要配置这些变量：

- `TELEGRAM_TOKEN`：找 [BotFather](https://t.me/botfather) 建立 bot 时，他会返回给你一个形如 `123456:1234567890ABCDEFGabcefg` 的密钥，将它填在这个变量里。
- `DOMAIN`：你的域名，必须 HTTPS 开头，最后不能留有 `/`。
- `RANDOM_ADDRESS`：以 `/` 开头的随机字符串，建议只有数字和英文字符，万不可有第二个 `/`。你可以用 1Password 生成一个。
- `AIRTABLE_TOKEN`：你的 Airtable 帐户 API 密钥。
- `‌BASE_ID`：对应 Airtable 的 base ID。
- `IFS_INFO`：IFS 场次信息 JSON。
- `PORT`：bot 可以占用的端口号。

如果你不知道以上环境变量该如何填写，请参照 [快速部署指南](/zh-cn/QuickDeployGuide) 中的说明，这里不再赘述。

在 HTTP 服务器程序中，配置指向 `127.0.0.1:<env.PORT>` 的反向代理。

记得配置 SSL 证书和 HTTPS 相关设置，因为 Telegram 要求 bot 服务器必须使用 HTTPS 才能发送指令。建议使用 [Certbot](https://certbot.org)。
