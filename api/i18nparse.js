// Import i18n file
const i18n = require('../i18n.json')
const debug = require('debug')('rsvpbot:api/i18n.js')

module.exports = async function (string, lang, obj) {
  let str = i18n[lang][string]
  Object.keys(obj).forEach(key => {
    str = str.replace(new RegExp(`{${key}}`,'g'), obj[key]);
  })
  return str
}
