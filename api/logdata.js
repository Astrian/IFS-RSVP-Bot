// Import Airtable API and config
const Airtable = require('airtable');
const debug = require('debug')('rsvpbot:api/logdata.js')

// Import i18n function
const i18n = require('./i18nparse')

module.exports = async function (faction, location, level, ap, trekker, operator) {
  // Import RSVP base
  const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.BASE_ID);
  // get agent record
  let agent = await getData(base, faction, location, operator)
  debug(agent)
  let data = {}
  if (agent.status === 1) {
    data['已签到'] = true
    data['入场初始经验'] = parseInt(ap)
    data['入场初始等级'] = level
    data['入场步行距离'] = parseInt(trekker)
    data['正在登记经验值'] = null
    data['操作人'] = null
  } else if (agent.status === 2) {
    debug('aaaaa')
    if ((parseInt(ap) - parseInt(agent.apatin)) < 5000) {
      let error = await i18n('checkout_error_notenoughapearned', {agent: agent.agentname, apvalue: agent.apatin})
      throw error
    } else {
      data['活动结束经验'] = parseInt(ap)
      data['活动结束等级'] = level
      data['活动结束步行距离'] = parseInt(trekker)
      data['正在登记经验值'] = null
      data['操作人'] = null
    }
  }
  await base(location).update(agent.id, data, (err, res) => {
    if (err) {
      console.log(err)
      throw `在输入数据过程中出现错误。${err}`
    }
    else return agent.agentname
  })
}

function getData(base, faction, location, operator) {
  return new Promise((res, rej) => {
    base(location).select({
      view: "Grid view",
      filterByFormula: `AND({阵营} = '${faction}', NOT({正在登记经验值} = ''), {操作人} = ${operator})`
    }).eachPage((records, fetchNextPage) => {
      records.forEach(function(record) {
        res({id: record.getId(), status: record.get('正在登记经验值'), apatin: record.get('入场初始经验'), agentname: record.get('特工代号')})
      })
      let error = await i18n('datainput_error_notlogging', {})
      rej(error)
    }, (error) => {
      debug('error occured!')
      if (error) { rej(error) }
    })
  })
}
