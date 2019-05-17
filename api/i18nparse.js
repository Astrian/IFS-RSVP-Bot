// Import i18n file
const i18n = require('../i18n.json')
const debug = require('debug')('rsvpbot:api/i18n.js')

module.exports = async function (string, obj) {
  let lang = process.env.I18N || "en_us"
  let str = i18n.botscript[lang][string] || i18n.botscript["en_us"][string]
  Object.keys(obj).forEach(key => {
    str = str.replace(new RegExp(`{${key}}`,'g'), obj[key]);
  })
  return str
}
