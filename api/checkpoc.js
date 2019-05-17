const debug = require('debug')('rsvpbot:api/checkpoc.js')

// Import i18n function
const i18n = require('./i18nparse')

module.exports = async function (id) {
  let ifs = JSON.parse(process.env.IFS_INFO)
  for (let i in ifs) {
    let faction = ''
    if (ifs[i].enlpoc.indexOf(id) !== -1) {
      faction = 'ENL'
    } else if (ifs[i].respoc.indexOf(id) !== -1) {
      faction = 'RES'
    }
    if (faction !== '') return { faction, location: ifs[i].location}
  }
  throw await i18n('not_allowed', {})
}
