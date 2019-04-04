// Import Airtable API and config
const Airtable = require('airtable');
const debug = require('debug')('rsvpbot:api/checkapstatus.js')

// Import RSVP base
const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.BASE_ID);

module.exports = async function (faction, location, identity) {
  // Check AP log status
  debug('fetching infomation from airtable...')
  let loggingstatus = await base(location).select({
    maxRecords: 1,
    view: "Grid view",
    filterByFormula: `AND(NOT({正在登记经验值} = ''), {阵营} = '${faction}', {操作人} = ${identity})`
  }).firstPage()
  debug('infomation fetched.')
  loggingstatus.forEach(record => {
    throw `你目前正在登记 ${record.get('特工代号')} 的 AP，请先登记或发送 /cancelaprec 来放弃登记。`
  })
  return
}
