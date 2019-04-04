// Import Airtable API and config
const Airtable = require('airtable');

// Import RSVP base
const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.BASE_ID);

module.exports = async function (faction, location) {
  // Check AP log status
  let loggingstatus = await base(location).select({
    maxRecords: 1,
    view: "Grid view",
    filterByFormula: `AND(NOT({正在登记经验值} = ''), {阵营} = '${faction}')`
  }).firstPage()
  loggingstatus.forEach(record => {
    throw `你目前正在登记 ${record.get('特工代号')} 的 AP，请先登记或发送 /cancelaprec 来放弃登记。`
  })
  return
}
