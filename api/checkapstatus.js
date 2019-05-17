// Import Airtable API and config
const Airtable = require('airtable');
const debug = require('debug')('rsvpbot:api/checkapstatus.js')

// Import i18n function
const i18n = require('./i18nparse')

module.exports = async function (faction, location, identity) {
  const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.BASE_ID)
  let sth = await getData(base, faction, location, identity)
  debug(sth)
  return
}

function getData(base, faction, location, identity) {
  new Promise((err, res) => {
    base(location).select({
      maxRecords: 1,
      view: "Grid view",
      filterByFormula: `AND (NOT ({正在登记经验值} = ''), {阵营} = '${faction}', {操作人} = ${identity})`
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
          console.log('Retrieved', record.get('特工代号'));
      });
      res('ok')
    }, function done(error) {
      if (error) { err(error) }
    });
  })
}
