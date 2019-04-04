// Import Airtable API and config
const Airtable = require('airtable');

// Import RSVP base
const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.BASE_ID);

module.exports = async function (faction, location, level, ap) {
  // get agent record
  let agentsbase = await base(location).select({
    view: "Grid view",
    filterByFormula: `AND({阵营} = '${faction}', NOT({正在登记经验值} = ''))`
  }).firstPage()
  if (!agentsbase.length) throw `目前你还没有为任何一个 agent 进行签到。`
  await agentsbase.forEach(async record => {
    let data = {}
    console.log(record.get('正在登记经验值'))
    if (record.get('正在登记经验值') === 1) {
      data['已签到'] = true
      data['入场初始经验'] = parseInt(ap)
      data['入场初始等级'] = level
      data['正在登记经验值'] = null
    }
    else if (record.get('正在登记经验值') === 2) {
      data['活动结束经验'] = parseInt(ap)
      data['活动结束等级'] = level
      data['正在登记经验值'] = null
    }
    await base(location).update(record.getId(), data, (err, res) => {
      if (err) {
        console.log(err)
        throw `在输入数据过程中出现错误。`
      }
      else return record.get('特工代号')
    })
  })
}
