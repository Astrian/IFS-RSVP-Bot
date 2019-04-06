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
    telegrambot.sendMessage(ctx.message.from.id, `欢迎你，${info.location} 场 ${info.faction} PoC。\n/checkin - 进行签到\n/checkout - 进行签退`, {parse_mode: "Markdown"})
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
      '请选择签到 agent 的 ID 首字母：',
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
          `请选择签到 agent：`,
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
          `请在消息框中写上 agent ${(ctx.update.callback_query.data.split(':'))[1]} 目前等级和 AP，以半角逗号 \`,\` 区隔。\n例如：\`16,40000000\`（大部分设备点击/长按示例可复制）`,
          {
            parse_mode: 'Markdown'
          }
        )

        break
      }
      case 'checkedin': {
        telegrambot.answerCbQuery(ctx.update.callback_query.id, `⚠️ 特工 ${(ctx.update.callback_query.data.split(':'))[1]} 已经完成签到。请选择一个不同的特工。`)
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
          `请在消息框中写上 agent ${(ctx.update.callback_query.data.split(':'))[1]} 目前等级和 AP，以半角逗号 \`,\` 区隔。\n例如：\`16,40000000\`（大部分设备点击/长按示例可复制）`,
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

// recive AP/Level
telegrafbot.hears(new RegExp(/\d{1,2},\d{1,}/), async (ctx) => {
  try {
    let info = await API.checkpoc(ctx.message.from.id)
    await API.logaplevel(info.faction, info.location, (ctx.message.text.split(','))[0], (ctx.message.text.split(','))[1], (ctx.message.text.split(','))[2], ctx.message.from.id)
    telegrambot.sendMessage(ctx.message.from.id, `签到/签退已完成。`, {parse_mode: "Markdown"})
  } catch (err) {
    telegrambot.sendMessage(ctx.message.from.id, err, {parse_mode: "Markdown"})
  }
})

// Launch App
expressApp.listen(PORT, () => {
  debug(`Example app listening on port ${PORT}!`)
})
