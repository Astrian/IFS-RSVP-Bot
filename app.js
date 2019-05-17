// Import frameworks and packages
const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const express = require('express')
const debug = require('debug')('rsvpbot:app.js')

// Import APIs
const API = require('./api')

// Generate express app, and get the port number
const expressApp = express()
const PORT = process.env.PORT || 5000

// Initial Telegram bot
const telegrafbot = new Telegraf(process.env.TELEGRAM_TOKEN)
const telegrambot = new Telegram(process.env.TELEGRAM_TOKEN, {
  agent: null,
  webhookReply: true
})
expressApp.use(telegrafbot.webhookCallback(process.env.RANDOM_ADDRESS))
telegrafbot.telegram.setWebhook(process.env.DOMAIN + process.env.RANDOM_ADDRESS)

// Bot commands
telegrafbot.command('start', async (ctx) => {
  try {
    let info = await API.checkpoc(ctx.message.from.id)
    telegrambot.sendMessage(ctx.message.from.id, await API.i18n("welcome_text", info), {parse_mode: "Markdown"})
  } catch (err) {
    telegrambot.sendMessage(ctx.message.from.id, err, {parse_mode: "Markdown"})
  }
})
telegrafbot.command('checkin', async (ctx) => {
  try {
    let info = await API.checkpoc(ctx.message.from.id)

    // check up poc info and ap logging status
    await API.checkapstatus(info.faction, info.location, ctx.message.from.id)

    // list all agents id first letter
    let checkuplist = await API.checkupagents(info.faction, info.location, null, 'in', ctx.message.from.id)

    telegrambot.sendMessage(
      ctx.message.from.id,
      await API.i18n("checkin_choosefirstletter", {}),
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: checkuplist
        }
      }
    )
  } catch (err) {
    console.log('error accourd!')
    console.log(err)
    telegrambot.sendMessage(ctx.message.from.id, err, {parse_mode: "Markdown"})
  }
})
telegrafbot.command('checkout', async (ctx) => {
  try {
    let info = await API.checkpoc(ctx.message.from.id)

    // check up poc info and ap logging status
    await API.checkapstatus(info.faction, info.location, ctx.message.from.id)

    // list all agents id first letter
    let checkuplist = await API.checkupagents(info.faction, info.location, null, 'out', ctx.message.from.id)

    telegrambot.sendMessage(
      ctx.message.from.id,
      '请选择签退 agent 的 ID 首字母：',
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: checkuplist
        }
      }
    )
  } catch (err) {
    console.log('error accourd!')
    console.log(err)
    telegrambot.sendMessage(ctx.message.from.id, err, {parse_mode: "Markdown"})
  }
})
telegrafbot.command('cancelaprec', async (ctx) => {
  try {
    let info = await API.checkpoc(ctx.message.from.id)

    // check up poc info and ap logging status
    await API.cancelaprec(info.faction, info.location, ctx.message.from.id)

    telegrambot.sendMessage(
      ctx.message.from.id,
      '已取消填充 AP/等级的状态。',
      {
        parse_mode: "Markdown",
      }
    )
  } catch (err) {
    console.log('error accourd!')
    console.log(err)
    telegrambot.sendMessage(ctx.message.from.id, err, {parse_mode: "Markdown"})
  }
})
telegrafbot.command('importrsvp', async (ctx) =>{
  try {
    let info = await API.checkpoc(ctx.message.from.id)

    // check up poc info and ap logging status
    await API.checkapstatus(info.faction, info.location, ctx.message.from.id)

    // if user only send the '/importrsvp' command, reply the help infomation
    if (ctx.message.text.slice(12) === '') {
      let reply = ''
      reply += '请以 `/importrsvp+空格+RSVP 玩家列表` 的形式，来导入你所管理阵营的签到/签退特工。例如：\n'
      reply += '```\n'
      reply += '/importrsvp sampleagent1\n'
      reply += 'sampleagent2\n'
      reply += 'sampleagent3\n'
      reply += '```\n'
      reply += '小提示：直接从 FevGames 中复制特工列表并直接粘贴，效率更高噢，但请记得在指令后添加一个空格。'
      throw reply
    }

    // process list into array
    let list = (ctx.message.text.slice(12)).split('\n')

    // import info
    let recinfo = await API.importrsvp(info.faction, info.location, list)

    // output list result
    telegrambot.sendMessage(ctx.message.from.id, recinfo, {parse_mode: "Markdown"})
  } catch (err) {
    console.log('error accourd!')
    console.log(err)
    telegrambot.sendMessage(ctx.message.from.id, err, {parse_mode: "Markdown"})
  }
})
telegrafbot.command('help', async (ctx) =>{
  try {
    let info = await API.checkpoc(ctx.message.from.id)

    // check up poc info and ap logging status
    await API.checkapstatus(info.faction, info.location, ctx.message.from.id)

    let message = '需要帮助吗？这些链接可能可以帮到你。\n'
    telegrambot.sendMessage(
      ctx.message.from.id,
      message,
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{
              text: '查阅帮助文档',
              url: `https://github.com/Astrian/IFS-RSVP-Bot/wiki`
            }],
            [{
              text: '订阅频道',
              url: `https://t.me/ifsrsvpbot`
            }],
            [{
              text: '加入反馈群',
              url: `https://t.me/joinchat/A0P0mxHipaEeJ-4vzKgTuQ`
            }]
          ]
        }
      }
    )

  } catch (err) {
    console.log('error accourd!')
    console.log(err)
    telegrambot.sendMessage(ctx.message.from.id, err, {parse_mode: "Markdown"})
  }
})

// Inline button
telegrafbot.on('callback_query', async (ctx) => {
  try {
    switch ((ctx.update.callback_query.data.split(':'))[0]) {
      case 'findagent4in': {
        // check up poc info and ap logging status
        let info = await API.checkpoc(ctx.update.callback_query.from.id)
        await API.checkapstatus(info.faction, info.location, ctx.update.callback_query.from.id)

        // check up agents of the ID start with the specific letter
        let agentlist = await API.checkupagents(info.faction, info.location, (ctx.update.callback_query.data.split(':'))[1], 'in', ctx.update.callback_query.from.id)
        console.log(agentlist)

        telegrambot.editMessageText(
          ctx.update.callback_query.from.id,
          ctx.update.callback_query.message.message_id,
          null,
          await API.i18n("checkin_chooseagent", {}),
          {
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: agentlist
            }
          }
        )
        break
      }
      case 'specificagent4in': {
        // check up poc info and ap logging status
        let info = await API.checkpoc(ctx.update.callback_query.from.id)
        await API.checkapstatus(info.faction, info.location, ctx.update.callback_query.from.id)

        // log ap status
        let agentname = await API.checkstatus(info.faction, info.location, (ctx.update.callback_query.data.split(':'))[1], 'in', ctx.update.callback_query.from.id)

        // edit message
        telegrambot.editMessageText(
          ctx.update.callback_query.from.id,
          ctx.update.callback_query.message.message_id,
          null,
          await API.i18n("checkin_logdata", {}),
          {
            parse_mode: 'Markdown'
          }
        )

        break
      }
      case 'checkedin': {
        telegrambot.answerCbQuery(ctx.update.callback_query.id, await API.i18n("checkin_error_checkedin", {agent: (ctx.update.callback_query.data.split(':'))[1]}))
        break
      }
      case 'findagent4out': {
        // check up poc info and ap logging status
        let info = await API.checkpoc(ctx.update.callback_query.from.id)
        await API.checkapstatus(info.faction, info.location, ctx.update.callback_query.from.id)

        // check up agents of the ID start with the specific letter
        let agentlist = await API.checkupagents(info.faction, info.location, (ctx.update.callback_query.data.split(':'))[1], 'out', ctx.update.callback_query.from.id)
        console.log(agentlist)

        telegrambot.editMessageText(
          ctx.update.callback_query.from.id,
          ctx.update.callback_query.message.message_id,
          null,
          `请选择签退 agent：`,
          {
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: agentlist
            }
          }
        )
        break
      }
      case 'specificagent4out': {
        // check up poc info and ap logging status
        let info = await API.checkpoc(ctx.update.callback_query.from.id)
        await API.checkapstatus(info.faction, info.location, ctx.update.callback_query.from.id)

        // log ap status
        let agentname = await API.checkstatus(info.faction, info.location, (ctx.update.callback_query.data.split(':'))[1], 'out', ctx.update.callback_query.from.id)

        // edit message
        telegrambot.editMessageText(
          ctx.update.callback_query.from.id,
          ctx.update.callback_query.message.message_id,
          null,
          `请在消息框中写上 agent ${(ctx.update.callback_query.data.split(':'))[1]} 目前等级、AP 和步行距离数据，以半角逗号 \`,\` 区隔。\n例如：\`16,40000000,2500\`（大部分设备点击/长按示例可复制）`,
          {
            parse_mode: 'Markdown'
          }
        )

        break
      }
      case 'checkedout': {
        telegrambot.answerCbQuery(ctx.update.callback_query.id, `⚠️ 特工 ${(ctx.update.callback_query.data.split(':'))[1]} 已经完成签退。请选择一个不同的特工。`)
        break
      }
      case 'notin': {
        telegrambot.answerCbQuery(ctx.update.callback_query.id, `⚠️ 特工 ${(ctx.update.callback_query.data.split(':'))[1]} 尚未进行签到，无法签退。`)
        break
      }
      default: {
        debug(ctx.update.callback_query.data)
        telegrambot.editMessageText(
          ctx.update.callback_query.from.id,
          ctx.update.callback_query.message.message_id,
          null,
          `你什么也没有选择。`,
          {
            parse_mode: 'Markdown'
          }
        )
      }
    }
  } catch(e) {
    debug('error')
    telegrambot.editMessageText(
      ctx.update.callback_query.from.id,
      ctx.update.callback_query.message.message_id,
      null,
      `*无法完成请求*\n${e}`,
      {
        parse_mode: 'Markdown'
      }
    )
  }
})

// recive AP/Level/trekker data
telegrafbot.hears(new RegExp(/\d{1,2},\d{1,},\d{1,}/), async (ctx) => {
  try {
    if (parseInt(ctx.message.text.split(',')[0]) > 16 || parseInt(ctx.message.text.split(',')[0]) < 1) throw `等级错误，请尝试重新输入。`
    let info = await API.checkpoc(ctx.message.from.id)
    await API.logdata(info.faction, info.location, (ctx.message.text.split(','))[0], (ctx.message.text.split(','))[1], (ctx.message.text.split(','))[2], ctx.message.from.id)
    telegrambot.sendMessage(ctx.message.from.id, `签到/签退已完成。`, {parse_mode: "Markdown"})
  } catch (err) {
    telegrambot.sendMessage(ctx.message.from.id, err, {parse_mode: "Markdown"})
  }
})

// Launch App
expressApp.listen(PORT, () => {
  debug(`Example app listening on port ${PORT}!`)
})
