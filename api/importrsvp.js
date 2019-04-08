// Import Airtable API and config
const Airtable = require('airtable');
const debug = require('debug')('rsvpbot:importrsvp.js')

// Import RSVP base
const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.BASE_ID);

module.exports = async function (faction, location, rsvplist) {
  let counter = 0
  for (let i in rsvplist) {
    // check agent imported
    let agentsbase = await base(location).select({
      view: "Grid view",
      filterByFormula: `{特工代号} = '${rsvplist[i]}'`
    }).firstPage()
    if (agentsbase.length) { debug(`特工 ${rsvplist[i]} 已在本场有所记录，将被忽略。`) }
    else {
      // if the agent not be logged into sheet, add a record for him/her
      let newrec = {}
      newrec['特工代号'] = rsvplist[i]
      newrec['阵营'] = faction
      await base(location).create(newrec)
      counter++
    }
  }
  return `有 ${counter} 位特工的 RSVP 信息成功被录入。`
}
