// Import Airtable API and config
const Airtable = require('airtable');
const debug = require('debug')('rsvpbot:status.js')

// debug switch
const godmode = require('../godmode.json')
let env
if (godmode.godmode) env = godmode.config
else env = process.env

// Import RSVP base
const base = new Airtable({apiKey: env.AIRTABLE_TOKEN}).base(env.BASE_ID);

module.exports = async function (location) {
  // get agent record
  let agentsbase = await base(location).select({
    view: "Grid view"
  }).firstPage()
  debug(agentsbase)
  return 'status'
}
