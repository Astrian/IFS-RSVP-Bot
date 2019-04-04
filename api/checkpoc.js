module.exports = async function (id) {
  let ifs = JSON.parse(process.env.IFS_INFO)
  console.log(ifs)
  for (let i in ifs) {
    let faction = ''
    if (config.ifs[i].enlpoc === id) {
      faction = 'ENL'
    } else if (config.ifs[i].respoc === id) {
      faction = 'RES'
    }
    if (faction !== '') return { faction, location: config.ifs[i].location}
  }
  throw `抱歉，你没有权限使用本 bot，请联系你所在阵营的 PoC 完成签到。希望你可以在 Ingress First Saturday 玩得愉快！`
}
