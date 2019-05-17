// Import Airtable API and config
const Airtable = require('airtable');
const debug = require('debug')('rsvpbot:logaplevel.js')

// Import RSVP base
const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.BASE_ID);

module.exports = async function (faction, location, level, ap, trekker, operator) {
  debug(faction, location, level, ap, trekker, operator)
  // get agent record
  let agentsbase = await base(location).select({
    view: "Grid view",
    filterByFormula: `AND({阵营} = '${faction}', NOT({正在登记经验值} = ''), {操作人} = ${operator})`
  }).firstPage()
  if (!agentsbase.length) throw `目前你还没有为任何一个 agent 进行签到。`
  let error = ''
  await agentsbase.forEach(async record => {
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
        error = `${record.get('特工代号')} 的活动 AP 差额不足 5000，无法进行登记。该特工的入场 AP 值为 ${record.get('入场初始经验')}。你可以尝试检查错误数据并重新登记，或使用 /cancel 取消登记。`
      } else {
        data['活动结束经验'] = parseInt(ap)
        data['活动结束等级'] = level
        data['活动结束步行距离'] = parseInt(trekker)
        data['正在登记经验值'] = null
        data['操作人'] = null
      }
    }
    await base(location).update(record.getId(), data, (err, res) => {
      if (err) {
        console.log(err)
        throw `在输入数据过程中出现错误。${err}`
      }
      else return record.get('特工代号')
    })
  })
  if (error !== '') {
    throw error
  }
}
