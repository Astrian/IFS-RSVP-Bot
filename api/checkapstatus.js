// Import Airtable API and config
const Airtable = require('airtable');
const debug = require('debug')('rsvpbot:api/checkapstatus.js')

// Import i18n function
const i18n = require('./i18nparse')

// Import RSVP base
const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.BASE_ID);

module.exports = async function (faction, location, identity) {
  // Check AP log status
  debug('fetching infomation from airtable...')
  let loggingstatus = await status
  debug(loggingstatus)
}

function status(location, faction, identity) {
  return new Promise((err, res) {
    base(location).select({
      maxRecords: 1,
      view: "Grid view",
      filterByFormula: `AND(NOT({正在登记经验值} = ''), {阵营} = '${faction}', {操作人} = ${identity})`
    }).firstPage().then(result => res(result))
  })
}
