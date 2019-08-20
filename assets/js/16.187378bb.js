(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{285:function(e,a,t){"use strict";t.r(a);var v=t(38),_=Object(v.a)({},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"代码修改指南"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#代码修改指南","aria-hidden":"true"}},[e._v("#")]),e._v(" 代码修改指南")]),e._v(" "),t("p",[e._v("如果你对 bot 有个性化功能的需求，或是为 IFS RSVP Bot 项目贡献代码，你可以参照这份指南，以自己的需求进行修改，并提交合并请求至主 repo。")]),e._v(" "),t("div",{staticClass:"danger custom-block"},[t("p",{staticClass:"custom-block-title"},[e._v("警告！")]),e._v(" "),t("p",[e._v("如果你不熟悉 JavaScript，且 bot 可以完成你的大部分需求，建议你不要随意这样做。建议你"),t("a",{attrs:{href:"https://t.me/joinchat/A0P0mxHipaEeJ-4vzKgTuQ",target:"_blank",rel:"noopener noreferrer"}},[e._v("加入反馈群"),t("OutboundLink")],1),e._v("，向作者提出功能请求。")])]),e._v(" "),t("p",[t("s",[e._v("上面的提示完全只是为了吓唬萌新 hhhhh……")])]),e._v(" "),t("h2",{attrs:{id:"代码结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#代码结构","aria-hidden":"true"}},[e._v("#")]),e._v(" 代码结构")]),e._v(" "),t("p",[e._v("IFS RSVP Bot 的代码结构如下：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("├api\n│├cancelaprec.js\n│├checkapstatus.js\t\n│├checkoutstatus.js\n│├checkpoc.js\n│├checkstatus.js\n│├checkupagents.js\t\n│├importrsvp.js\n│├index.js\t\n│└logdata.js\n├docs\n├.gitignore\t\n├LICENSE\n├Procfile\n├app.js\t\n├app.json\t\n├debug.js\t\n├package-lock.json\n├package.json\t\n└readme.md\n")])])]),t("p",[e._v("其中：")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("/app.js")]),e._v(" 是与 Telegram 对接的模块，Telegram（即用户）与程序具体功能的交互枢纽。")]),e._v(" "),t("li",[t("code",[e._v("/debug.js")]),e._v(" 是功能调试模块。如果你添加了新功能，可以在这里将 "),t("em",[e._v("带有测试数据")]),e._v(" 的调试代码写进去。")]),e._v(" "),t("li",[t("code",[e._v("/api/index.js")]),e._v(" 担负「接口集线器」的作用。所有功能函数通过这段代码，统一输出为 "),t("code",[e._v("require('./api')")]),e._v(" 实例，便于调用。")]),e._v(" "),t("li",[t("code",[e._v("/api/")]),e._v(" 下的其他 JS 文件，就是具体实现功能的代码。")]),e._v(" "),t("li",[t("code",[e._v("/app.json")]),e._v("、"),t("code",[e._v("/Procfile")]),e._v("、"),t("code",[e._v("/package.json")]),e._v(" 等等，都是 Node.js 或 Heroku 部署时的必要配置。")]),e._v(" "),t("li",[t("code",[e._v("/docs")]),e._v(" 文件夹驱动着你现在看到的这个页面。")])]),e._v(" "),t("p",[e._v("不同文件中，都有相对应的 "),t("code",[e._v("debug()")]),e._v(" 调试信息输出，以及相对应的注释。这些也许有助于你理解整体代码运行逻辑。")]),e._v(" "),t("h2",{attrs:{id:"请求处理步骤"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#请求处理步骤","aria-hidden":"true"}},[e._v("#")]),e._v(" 请求处理步骤")]),e._v(" "),t("p",[e._v("在 Telegram 中，所有的功能，大体上遵循这样的运行顺序：")]),e._v(" "),t("ol",[t("li",[e._v("检查用户是否为工作人员（"),t("code",[e._v("API.checkpoc()")]),e._v("），若不是则抛出错误，阻止继续使用 bot。")]),e._v(" "),t("li",[e._v("检查用户是否在数据输入状态（"),t("code",[e._v("API.checkapstatus()")]),e._v("），若是则抛出错误，阻止继续使用 bot。")]),e._v(" "),t("li",[e._v("检查输入，若输入有误，抛出错误。")]),e._v(" "),t("li",[e._v("调用对应的功能函数实例，完成请求。")]),e._v(" "),t("li",[e._v("返回请求结果。")])]),e._v(" "),t("h2",{attrs:{id:"新增功能函数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#新增功能函数","aria-hidden":"true"}},[e._v("#")]),e._v(" 新增功能函数")]),e._v(" "),t("p",[e._v("如果你希望为 bot 新增功能函数，务必先完成功能 API，并在 "),t("code",[e._v("/api/index.js")]),e._v(" 集成函数。之后，请在 "),t("code",[e._v("/debug.js")]),e._v(" 代码中新增有关的调试代码和示例数据。")]),e._v(" "),t("p",[e._v("Telegram 对接部分可写可不写，因为这并不是整体功能中非常核心的重点。")]),e._v(" "),t("h2",{attrs:{id:"修改功能"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#修改功能","aria-hidden":"true"}},[e._v("#")]),e._v(" 修改功能")]),e._v(" "),t("p",[e._v("如果是在原有的函数上进行修改，直接对代码进行修改即可。若修改对输入函数有新的要求，建议你同时修改 "),t("code",[e._v("/debug.js")]),e._v(" 和 Telegram 对接部分。")]),e._v(" "),t("p",[e._v("如果你要修改 Telegram 对接部分，请留意修改文案，以及签到/签退行为的对称性（需要同时修改两份文案）。")]),e._v(" "),t("p",[e._v("必要时，请提供注释。")]),e._v(" "),t("h2",{attrs:{id:"提交代码"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#提交代码","aria-hidden":"true"}},[e._v("#")]),e._v(" 提交代码")]),e._v(" "),t("p",[e._v("如果确定代码可以提交至主 repo，请尝试发起合并请求至主 repo 的 "),t("code",[e._v("dev")]),e._v(" 分支。如果你尝试发起合并请求至 "),t("code",[e._v("master")]),e._v("，我会强制修改到 "),t("code",[e._v("dev")]),e._v("。")]),e._v(" "),t("p",[e._v("这样做，可以让其他人部署时，避免使用开发中的代码，因而造成不必要的麻烦。非常感谢。")])])},[],!1,null,null,null);a.default=_.exports}}]);