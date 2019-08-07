# 导入 RSVP 数据
IFS RSVP Bot 的功能设计逻辑是这样的：用户预先导入 RSVP 至数据库（也就是 Airtable 服务），签到/签退时，从数据库读取 RSVP 数据，然后以列表检索的形式，让 PoC 或签到人员进行选择，并进行操作。

除了避免不必要的用户名输入确认的低效率过程之外，预先导入 RSVP 名单的做法也有助于现场 PoC 确认玩家是否已经 RSVP。

那么问题来了：如何导入数据呢？

## 快速方法
在 [v0.3.0](https://github.com/Astrian/IFS-RSVP-Bot/releases/tag/v0.3.0) 版本及之后版本的程序中，你可以通过复制 FevGames 的 RSVP 名单进行快速导入。

首先，进入你所在场次的 FevGames RSVP 名单页面。一般而言，FevGames 会以两个名单列表，显示两个阵营的 RSVP 名单。类似如下（当然只是类似……）：

![RSVP 列表示例](https://i.imgur.com/G0plMY7.png)

（嗯，只是 FevGames 刚好关闭了 RSVP 名单显示，所以…… 不要在意这些细节……）

复制你管理的阵营名单。比如你在现场，负责对 Enl 特工进行签到/签退管理，那么你应该复制 Enl 的名单。

接下来，在 bot 中：

- 输入 `‌/importrsvp` 指令
- 输入空格
- 粘贴你刚才的 RSVP 列表
- 确认表头展示的 PoC 在列表中。如果发现 PoC 没有在 RSVP 列表，请手动新建一行，并将 PoC 的 agent name 写上去。

完成后发送给 bot，bot 就会对列表进行读识，并将列表写入至 Airtable 相应表格中。

![通过 bot 导入名单及确认信息](https://i.imgur.com/pxbNXrI.png)

请注意，bot 已经自动排除已在对应表格中的特工名单（无论这位 agent 的阵营是否与你的负责阵营相同）。

同时，bot 不支持修改或删除错误的 RSVP 信息。如果需要进行 RSVP 信息更新，请手动到 Airtable 进行修改。

## 手动导入
所有版本的 bot 都可以接受该方法导入 RSVP 数据，就是…… 麻烦了一些。

在相应的表格中，点击底部的「+」添加数据行。然后填入特工用户名和阵营即可。为了确保 bot 工作正常，在不了解 bot 工作原理的前提下，建议不要尝试更改新行的其他数据。

## 接下来……
万事俱备，只欠东风！确认 RSVP 信息无误后，工作人员就可以在现场使用 bot [进行签到和签退](/zh-cn/CheckinAndCheckout)。