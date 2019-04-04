module.exports = async function (id) {
  let ifslist = JSON.parse(process.env.IFS_INFO)
  for (let i in ifslist) {
    let faction = ''
    if (config.ifs[i].enlpoc === id) {
      faction = 'ENL'
    } else if (config.ifs[i].respoc === id) {
      faction = 'RES'
    }
    if (faction !== '') return { faction, location: config.ifs[i].location}
  }
  throw `抱歉，你没有权限使用本 bot，请联系你所在阵营的 PoC（Res @Nickywong, Enl @wkbond）完成签到。希望你可以在 Ingress First Saturday 玩得愉快！`
}
