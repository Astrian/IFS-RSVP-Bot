# 代码修改指南
如果你对 bot 有个性化功能的需求，或是为 IFS RSVP Bot 项目贡献代码，你可以参照这份指南，以自己的需求进行修改，并提交合并请求至主 repo。

::: danger 警告！
如果你不熟悉 JavaScript，且 bot 可以完成你的大部分需求，建议你不要随意这样做。建议你[加入反馈群](https://t.me/joinchat/A0P0mxHipaEeJ-4vzKgTuQ)，向作者提出功能请求。
:::

~~上面的提示完全只是为了吓唬萌新 hhhhh……~~

## 代码结构
IFS RSVP Bot 的代码结构如下：

```
├api
│├cancelaprec.js
│├checkapstatus.js	
│├checkoutstatus.js
│├checkpoc.js
│├checkstatus.js
│├checkupagents.js	
│├importrsvp.js
│├index.js	
│└logdata.js
├docs
├.gitignore	
├LICENSE
├Procfile
├app.js	
├app.json	
├debug.js	
├package-lock.json
├package.json	
└readme.md
```

其中：

- `/app.js` 是与 Telegram 对接的模块，Telegram（即用户）与程序具体功能的交互枢纽。
- `/debug.js` 是功能调试模块。如果你添加了新功能，可以在这里将 *带有测试数据* 的调试代码写进去。
- `/api/index.js` 担负「接口集线器」的作用。所有功能函数通过这段代码，统一输出为 `require('./api')` 实例，便于调用。
- `/api/` 下的其他 JS 文件，就是具体实现功能的代码。
- `/app.json`、`/Procfile`、`/package.json` 等等，都是 Node.js 或 Heroku 部署时的必要配置。
- `/docs` 文件夹驱动着你现在看到的这个页面。

不同文件中，都有相对应的 `debug()` 调试信息输出，以及相对应的注释。这些也许有助于你理解整体代码运行逻辑。

## 请求处理步骤
在 Telegram 中，所有的功能，大体上遵循这样的运行顺序：

1. 检查用户是否为工作人员（`API.checkpoc()`），若不是则抛出错误，阻止继续使用 bot。
2. 检查用户是否在数据输入状态（`API.checkapstatus()`），若是则抛出错误，阻止继续使用 bot。
3. 检查输入，若输入有误，抛出错误。
4. 调用对应的功能函数实例，完成请求。
5. 返回请求结果。

## 新增功能函数
如果你希望为 bot 新增功能函数，务必先完成功能 API，并在 `/api/index.js` 集成函数。之后，请在 `/debug.js` 代码中新增有关的调试代码和示例数据。

Telegram 对接部分可写可不写，因为这并不是整体功能中非常核心的重点。

## 修改功能
如果是在原有的函数上进行修改，直接对代码进行修改即可。若修改对输入函数有新的要求，建议你同时修改 `/debug.js` 和 Telegram 对接部分。

如果你要修改 Telegram 对接部分，请留意修改文案，以及签到/签退行为的对称性（需要同时修改两份文案）。

必要时，请提供注释。

## 提交代码
如果确定代码可以提交至主 repo，请尝试发起合并请求至主 repo 的 `dev` 分支。如果你尝试发起合并请求至 `master`，我会强制修改到 `dev`。

这样做，可以让其他人部署时，避免使用开发中的代码，因而造成不必要的麻烦。非常感谢。