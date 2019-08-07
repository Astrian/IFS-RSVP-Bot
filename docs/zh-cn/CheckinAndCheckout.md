# 签到与签退操作
IFS RSVP Bot 的核心功能，就是签到与签退。这里，我们就来简单了解签到与签退操作的基本操作方法。

## 正常的签到/签退流程
向 bot 发送 `/checkin`（签到）或 `/checkout`（签退）指令，此时 bot 会返回你所负责阵营所有 agents 的 agent name 首字母列表。

![首字母列表](https://i.imgur.com/4XSG4UD.png)

选择需要签到或签退的 agent 的 agent name 首字母，会返回以该字母开头的所有 agent 列表。

![Agents 列表](https://i.imgur.com/1nL17JT.png)

选择相应 agent，系统会提示以 `<等级>,<AP>,<步行距离>` 格式提交数据。按照要求进行提交即可。

![完成数据提交](https://i.imgur.com/JXhtmEy.png)

## 异常情况
### 重复签到/签退
Bot 目前不支持重复进行签到/签退操作。在 agents 列表中，已经执行过相应程序的 agent，bot 会在名称前添加一个对勾，表示该 agent 已经完成相应操作，无需重复操作。

点击带有对勾标志的 agent，bot 会在顶端提示「不能重复操作」。

![重复签到示例](https://i.imgur.com/sGbxK0n.png)

不过，这也意味着，如果在 bot 中完成记录，则相关数据不可在 bot 中直接修改。请在提交相关数据前再三确认。万一出现录入错误，请尝试手动至 Airtable 进行修改。

### 未签到则直接签退
执行签退操作的前提是之前已经签到。若一位 agent 未进行签到，在签退列表中该 agent 名字前会有一个警告标识。点击该 agent，bot 会在顶端弹出错误信息。

![未签到的签退示例](https://i.imgur.com/fEZ7GHV.png)

### 在数据录入状态下执行其他操作
如果 bot 提示你可以提交某 agent 的相关数据时发送其他指令，bot 会返回一个错误信息，提示你先对上一位 agent 进行数据提交（并完成签到或签退操作），之后才能进行其他操作。

如果你希望放弃对上一位 agent 签到或签退的操作，你可以发送 `/cancelaprec` 指令，告知 bot 放弃操作。之前所有操作将不会被保存。

![放弃操作示例](https://i.imgur.com/fOACDuv.png)

### AP 增长值不足
> 该功能自 [0.3.2 版本](https://github.com/Astrian/IFS-RSVP-Bot/releases/tag/v0.3.2) 开始提供。

[根据 FavGames 在 2019 年 5 月发布的新 First Saturday 规则](https://web.archive.org/web/20190517023812/https://fevgames.net/ingressfs/agent-reqs/)，特工需要在活动期间获取至少 5000 AP，才能获得 First Saturday 成就徽章和额外 AP 奖励。

Bot 会在特工签退时检查该特工在签到与签退 AP 值差额。如果 AP 增长值小于 5000，系统将会拒绝为该特工签退。接下来系统将会保持对该特工的签退状态，你可以检查是否是因为误操作而导致的 AP 输入错误。

你也可以使用 `/cancelaprec` 指令来退出该状态。

![AP 差额不足示例](https://i.imgur.com/tNsYoz9.png)

## 接下来……
签退开始的时候，是时候向大家 [公开 IFS 排名了](/zh-cn/DataRankPublish)。
