// Import Airtable API and config
const Airtable = require('airtable');
const debug = require('debug')('rsvpbot:api/logdata.js')

// Import i18n function
const i18n = require('./i18nparse')

module.exports = async function (faction, location, level, ap, trekker, operator) {
  // Import RSVP base
  const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.BASE_ID);
  // get agent record
  let agentsbase = await getData(base, faction, location, operator)
  /* if (!agentsbase.length) throw `目前你还没有为任何一个 agent 进行签到。`
  let error = ''
  let sth = await agentsbase.forEach(async record => {
    let data = {}
    debug('ap logging status = ' + record.get('正在登记经验值'))
    if (record.get('正在登记经验值') === 1) {
      data['已签到'] = true
      data['入场初始经验'] = parseInt(ap)
      data['入场初始等级'] = level
      data['入场步行距离'] = parseInt(trekker)
      data['正在登记经验值'] = null
      data['操作人'] = null
    }
    else if (record.get('正在登记经验值') === 2) {
      if (parseInt(record.get('入场初始经验')) - parseInt(ap) < 5000) {
        error = await i18n('checkout_error_notenoughapearned', {agent: record.get('特工代号'), apvalue: record.get('入场初始经验')})
      } else {
        data['活动结束经验'] = parseInt(ap)
        data['活动结束等级'] = level
        data['活动结束步行距离'] = parseInt(trekker)
        data['正在登记经验值'] = null
        data['操作人'] = null
      }
    }
    if (error !== '') {
      throw error
    } else {

    }
  }) */
  debug(sth)

  /* await base(location).update(id, data, (err, res) => {
    if (err) {
      console.log(err)
      throw `在输入数据过程中出现错误。${err}`
    }
    else return record.get('特工代号')
  }) */
  return
}

function getData(base, faction, location, operator) {
  return new Promise((res, rej) => {
    base(location).select({
      view: "Grid view",
      filterByFormula: `AND({阵营} = '${faction}', NOT({正在登记经验值} = ''), {操作人} = ${operator})`
    }).eachPage((records, fetchNextPage) => {
      records.forEach(function(record) {
        res({id: record.get('id'), status: record.get('正在登记经验值')})
      })
      rej(`目前你还没有为任何一个 agent 进行签到。`)
    }, (error) => {
      debug('error occured!')
      if (error) { rej(error) }
    })
  })
}
