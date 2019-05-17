// Import Airtable API and config
const Airtable = require('airtable');
const debug = require('debug')('rsvpbot:api/checkapstatus.js')

// Import i18n function
const i18n = require('./i18nparse')

module.exports = async function (faction, location, identity) {
  // Check AP log status
  debug('fetching infomation from airtable...')
  let loggingstatus = await status(location, faction, identity)
  if (loggingstatus.length) {
    loggingstatus.forEach(record => {
      throw (await i18n("datainput_error_inputstatus", {agent: record.get('特工代号')}))
    })
  } else {
    return
  }
}

function status(location, faction, identity) {
  return new Promise((err, res) => {
    const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.BASE_ID);
    base(location).select({
      maxRecords: 1,
      view: "Grid view",
      filterByFormula: `AND(NOT({正在登记经验值} = ''), {阵营} = '${faction}', {操作人} = ${identity})`
    }).firstPage().then(result => res(result))
  })
}
