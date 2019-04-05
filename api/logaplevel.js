// Import Airtable API and config
const Airtable = require('airtable');
const debug = require('debug')('rsvpbot:logaplevel.js')

// Import RSVP base
const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.BASE_ID);

module.exports = async function (faction, location, level, ap, Trekker, operator) {
  debug(faction, location, level, ap, Trekker, operator)
  // get agent record
  let agentsbase = await base(location).select({
    view: "Grid view",
    filterByFormula: `AND({阵营} = '${faction}', NOT({正在登记经验值} = ''), {操作人} = ${operator})`
  }).firstPage()
  if (!agentsbase.length) throw `目前你还没有为任何一个 agent 进行签到。`
  await agentsbase.forEach(async record => {
    let data = {}
    debug('ap logging status = ' + record.get('正在登记经验值'))
    if (record.get('正在登记经验值') === 1) {
      data['已签到'] = true
      data['入场初始经验'] = parseInt(ap)
      data['入场初始等级'] = level
      data['活动开始步行距离'] = parseInt(Trekker)
      data['正在登记经验值'] = null
      data['操作人'] = null
    }
    else if (record.get('正在登记经验值') === 2) {
      data['活动结束经验'] = parseInt(ap)
      data['活动结束等级'] = level
      data['活动结束步行距离'] = parseInt(Trekker)
      data['正在登记经验值'] = null
      data['操作人'] = null
    }
    await base(location).update(record.getId(), data, (err, res) => {
      if (err) {
        console.log(err)
        throw `在输入数据过程中出现错误。${err}`
      }
      else return record.get('特工代号')
    })
  })
}
