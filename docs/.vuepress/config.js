module.exports = {
  locales: {
    '/zh-cn/': {
      lang: 'zh-CN',
      title: 'IFS RSVP Bot',
      description: 'Ingress First Saturday 辅助用 bot。'
    },
    '/en-us/': {
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
      title: 'IFS RSVP Bot',
      description: 'A assistant bot forIngress First Saturday events.'
    }
  },
  themeConfig: {
    locales: {
      '/zh-cn/': {
        selectText: '语言 / Language',
        label: '简体中文 - Simplified Chinese',
        sidebar: [
          ['/zh-cn/', '欢迎'],
          {
            title: '手把手教你用',
            children: [
              ['/zh-cn/QuickDeployGuide', '快速部署指南'],
              ['/zh-cn/ImportRsvpData', '导入 RSVP 数据'],
              ['/zh-cn/CheckinAndCheckout', '签到与签退操作'],
              ['/zh-cn/DataRankPublish', '数据排名与公开'],
              ['/zh-cn/ExportData', '导出 CSV 并提交数据']
            ]
          },
          {
            title: '奇技淫巧',
            children: [
              ['/zh-cn/VersionUpdate', '版本更新方法'],
              ['/zh-cn/MultipleIfs', '处理单城多活动'],
              ['/zh-cn/ModifyConfigWithNewIfs', '为新 IFS 重新配置 Bot'],
              ['/zh-cn/FastBotCmds', 'Bot 指令快捷方式']
            ]
          },
          {
            title: '高手请进',
            children: [
              ['/zh-cn/AdvancedDeployGuide', '高级部署指南'],
              ['/zh-cn/OldVersion', '使用旧版本'],
              ['/zh-cn/ModifyCode', '代码修改指南']
            ]
          }
        ]
      },
      '/en-us/': {
        selectText: 'Language',
        label: 'English',
        sidebar: [
          ['/en-us/', 'Welcome']
        ]
      }
    }
  }
}