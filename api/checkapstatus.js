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
  let loggingstatus = await base(location).select({
    maxRecords: 1,
    view: "Grid view",
    filterByFormula: `AND(NOT({正在登记经验值} = ''), {阵营} = '${faction}', {操作人} = ${identity})`
  }).firstPage().then(async (res) => {
    if (res.length) {
      let error = await i18n("datainput_error_inputstatus", {agent: res[0].get(' 特工代号')})
    } else {
      return
    }
  })
  debug('infomation fetched.')
}
