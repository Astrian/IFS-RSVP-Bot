(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{266:function(t,e,r){"use strict";r.r(e);var o=r(38),a=Object(o.a)({},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"版本更新方法"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#版本更新方法","aria-hidden":"true"}},[t._v("#")]),t._v(" 版本更新方法")]),t._v(" "),r("h2",{attrs:{id:"通过「deploy-to-heroku」模式进行部署"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#通过「deploy-to-heroku」模式进行部署","aria-hidden":"true"}},[t._v("#")]),t._v(" 通过「Deploy to Heroku」模式进行部署")]),t._v(" "),r("p",[t._v("如果你使用「Deploy to Heroku」的一键部署工具，那么版本更新可能就会相对头痛了。因为 Heroku 并没有提供自动部署等相关的功能，一旦部署完成，需要用户手动拉取至本地，以及一堆有的没的骚操作，才能让 Heroku 中的代码更新至最新版本。")]),t._v(" "),r("p",[t._v("所以，如果不是因为有不可抗力原因（比如你已经为这个应用空间付费——早跟你说免费的够用你不信 233），我个人建议你直接删除该空间，并重新进行部署。这是更新 bot 版本最快也是最方便的方法。")]),t._v(" "),r("p",[t._v("删除应用很简单。打开 "),r("a",{attrs:{href:"https://dashboard.heroku.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("Heroku 的控制台"),r("OutboundLink")],1),t._v("，选择你的 bot 空间，点击 Settings，在页面最底端你可以找到「Delete app」的红色按钮。输入你的 bot 空间名称（他给你写出来的那个），就可以直接删除。")]),t._v(" "),r("p",[t._v("删除后，重新按照 "),r("a",{attrs:{href:"/zh-cn/QuickDeployGuide"}},[t._v("快速部署指南")]),t._v(" 部署一次，bot 就会自动更新至最新版本。")]),t._v(" "),r("p",[t._v("如果你不希望使用重部署的方法进行更新，那么你也可以 "),r("a",{attrs:{href:"https://devcenter.heroku.com/articles/git",target:"_blank",rel:"noopener noreferrer"}},[t._v("跟随 Heroku 的官方指南"),r("OutboundLink")],1),t._v("，将 bot 的 repo 拉取并推送至 Heroku 中你的 bot 空间。")]),t._v(" "),r("p",[t._v("实在想要自动更新，也许直接在 GitHub fork repo，并在 Heroku "),r("a",{attrs:{href:"https://devcenter.heroku.com/articles/github-integration",target:"_blank",rel:"noopener noreferrer"}},[t._v("设置从自己的 GitHub 自动更新代码"),r("OutboundLink")],1),t._v(" 也是可行的？但其实这个「自动化」也并非完全自动化，版本更新时，你仍然需要手动从主 repo 拉取更改，只不过不需要像重部署那样要填一大堆东西就是了。")]),t._v(" "),r("h2",{attrs:{id:"通过-vps-或云服务器进行部署"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#通过-vps-或云服务器进行部署","aria-hidden":"true"}},[t._v("#")]),t._v(" 通过 VPS 或云服务器进行部署")]),t._v(" "),r("p",[t._v("如果你是用 Git 拉取来完成部署的，那么直接进入相关目录，使用 "),r("code",[t._v("git pull")]),t._v(" 指令来拉取 "),r("code",[t._v("master")]),t._v(" 分支最新代码即可。必要时请重启 bot。")]),t._v(" "),r("p",[t._v("使用其他方法部署的，建议停止运行 bot 后，删除 bot 目录，并重新进行部署。具体请根据你的实际部署方式，到互联网搜索相关方法。")]),t._v(" "),r("h2",{attrs:{id:"另外……"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#另外……","aria-hidden":"true"}},[t._v("#")]),t._v(" 另外……")]),t._v(" "),r("p",[t._v("如果两场 IFS 之间，bot 没有版本更新，你也并不需要进行重新部署或者版本更新等等操作。直接修改环境变量，就能洗洗再用了。")])])},[],!1,null,null,null);e.default=a.exports}}]);