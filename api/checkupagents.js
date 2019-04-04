// Import Airtable API and config
const Airtable = require('airtable');

// Import RSVP base
const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.BASE_ID);

module.exports = async function (faction, location, firstletter, direction) {

  // get agents list
  let agentsbase = await base(location).select({
    view: "Grid view",
    filterByFormula: `{阵营} = '${faction}'`
  }).firstPage()

  // initial a array of buttons
  let buttons = []

  if (!firstletter) { // Get "first letter of agent ID" list
    let alphabet = []
    agentsbase.forEach(record => {
      let agentnameinuppercase = record.get('特工代号').toUpperCase()
      if (alphabet.indexOf(agentnameinuppercase[0]) === -1) alphabet[alphabet.length] = agentnameinuppercase[0]
    })

    // From alphabet to buttons list
    for (let i in alphabet) {
      buttons[buttons.length] = [{
        text: alphabet[i],
        callback_data: direction === 'in' ? `findagent4in:${alphabet[i]}` : `findagent4out:${alphabet[i]}`
      }]
    }
    return buttons
  } else { // Get agent IDs with the specific first letter
    let agentlist = []
    agentsbase.forEach(record => {
      let agentnameinuppercase = record.get('特工代号').toUpperCase()
      console.log(direction)
      if (agentnameinuppercase[0] === firstletter) {
        if (direction === 'in') {
          buttons[buttons.length] = [{
            text: `${record.get('已签到') ? `✅ ` : ``}${agentnameinuppercase}`,
            callback_data: `${record.get('已签到') ? `checkedin:${record.get('特工代号')}` : `specificagent4in:${record.get('特工代号')}`}`
          }]
        } else if (direction === 'out') {
          buttons[buttons.length] = [{
            text: `${record.get('活动结束等级') ? `✅ ` : (record.get('已签到') ? `` : `⚠️ `)}${agentnameinuppercase}`,
            callback_data: `${record.get('活动结束等级') ? `checkedout:${record.get('特工代号')}` : (record.get('已签到') ? `specificagent4out:${record.get('特工代号')}` : `notin:${record.get('特工代号')}`)}`
          }]
        }
      }
    })
  }

  // return buttons result
  return buttons
}
