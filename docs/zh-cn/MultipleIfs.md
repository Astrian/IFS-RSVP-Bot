# 一个城市多场 IFS 的处理方法
在最初版本的 IFS RSVP Bot 中，就已经支持「一个城市多 IFS 场次」的情况了。在这篇说明中，将展示如何让 bot 能够处理多场 IFS。

## 建立新的表格
首先，跟随 [快速部署指南](/zh-cn/QuickDeployGuide) 的 Airtable 部分，建立一场 IFS 的表格。

然后，在顶部的表格标签栏，点击当前标签右边的下拉箭头。在弹出的菜单中选择「Duplicate Table」，然后取消选择「Duplicate records」并确定。

![Duplicate Table](https://i.imgur.com/rOKNBZK.png)

此时，一个新的「copy」表就会建立。依然在标签栏中，点击新表右侧的下拉箭头，选择「Rename table」，并将它改名为另一场 IFS 的名称。

![更名表格](https://i.imgur.com/PNur06i.png)

还有更多场 IFS？照葫芦画瓢，生成更多场次的表格就可以了。

::: tip 不同表格间可以共用一套数据、视图和分享链接吗？
表格间的数据、视图和分享链接并不共享。如有需要，请为每一个表格进行个性化编辑操作。
:::

## 为 Bot 更新场次信息
Bot 读取 IFS 场次信息，是通过解析环境变量中的 `IFS_INFO` 变量，并转换为 JSON 的方式来进行的。例如，以下就是一个有效的、可被 bot 读取的 `IFS_INFO` 变量。

```json
[{"location":"五华","enlpoc":[123456],"respoc":[789012]},{"location":"呈贡","enlpoc":[345678],"respoc":[901234]}]
```

其中，每一场独立的 IFS 信息如下：

```json
{"location":"五华","enlpoc":[123456],"respoc":[789012]}
```

其中的 `location` 对应的就是表格名称（上文的「五华」、「呈贡」等）。请务必确保 `location` 名称准确，确保 bot 可以正确读取对应的 Airtable 表格。

理论上，你可以建立无穷多个表格——况且 Airtable 并不限制每个 base 的表格数量。每一位工作人员的操作都会限定在特定的表格中，包括导入 RSVP 信息、签到与签退。