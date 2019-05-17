// Import i18n file
const i18n = require('../i18n')
const debug = require('debug')('rsvpbot:api/i18n.js')

module.exports = async function (string, obj, mode) {
  let lang = process.env.I18N || "en_us"
  let str = i18n[lang][mode ? mode : 'botscript'][string] || i18n[lang][mode ? mode : 'botscript'][string]
  Object.keys(obj).forEach(key => {
    str = str.replace(new RegExp(`{${key}}`,'g'), obj[key]);
  })
  return str
}
