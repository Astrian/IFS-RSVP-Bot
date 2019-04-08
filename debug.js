// Local debug module
const debug = require('debug')('rsvpbot:debug.js')

const API = require('./api')

async function main(tgid) {
  debug('checking poc identity...')
  let info = await API.checkpoc(tgid)
  debug(info)
  debug('\n')

  debug('checking ap logging status...')
  await API.checkapstatus(info.faction, info.location, tgid)
  debug('completed')
  debug('\n')

  debug('importing rsvp list...')
  let list = ['aaa', 'bbb', 'ccc']
  let recinfo = await API.importrsvp(info.faction, info.location, list)
  debug(recinfo)

  debug('fetching agents first-letter list with checkin...')
  let firstletterdict = await API.checkupagents(info.faction, info.location, null, 'in', tgid)
  debug(firstletterdict)
  debug('\n')

  debug('fetching K-letter-starting-id agents with checkin...')
  let kagentslist = await API.checkupagents(info.faction, info.location, 'K', 'in', tgid)
  debug(kagentslist)
  debug('\n')

  debug('set agent into ap-logging status')
  await API.checkstatus(info.faction, info.location, 'sampleagent', 'in', tgid)
  debug('\n')

  debug('set agent "sampleagent" ap and level with checkin')
  await API.logaplevel(info.faction, info.location, '16', 40000000, tgid)
  debug('\n')

  debug('fetching agents first-letter list with checkout...')
  firstletterdict = await API.checkupagents(info.faction, info.location, null, 'out', tgid)
  debug(firstletterdict)
  debug('\n')

  debug('fetching K-letter-starting-id agents with checkout...')
  kagentslist = await API.checkupagents(info.faction, info.location, 'K', 'out', tgid)
  debug(kagentslist)
  debug('\n')

  debug('set agent Kirrior into ap-logging status')
  await API.checkstatus(info.faction, info.location, 'sampleagent', 'out', tgid)
  debug('\n')

  debug('set agent "sampleagent" ap and level with checkout')
  await API.logaplevel(info.faction, info.location, '16', 50000000, tgid)
  debug('\n')

  debug('debug test done.')
}

main(54785179)
