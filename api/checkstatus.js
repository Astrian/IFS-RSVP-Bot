// Import Airtable API and config
const Airtable = require('airtable');

// Import RSVP base
const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.BASE_ID);

module.exports = async function (faction, location, agentname, direction, operator) {
  // get agent record
  let agentsbase = await base(location).select({
    view: "Grid view",
    filterByFormula: `AND({阵营} = '${faction}', {特工代号} = '${agentname}')`
  }).firstPage()
  agentsbase.forEach(record => {
    if (record.get('特工代号') === agentname) {
      base(location).update(record.getId(), {
        "正在登记经验值": (direction === 'in' ? 1 : 2),
        "操作人": operator
      }, (err, record) => {
        if (err) throw err
      });
      return
    }
  })
}
