module.exports = async function (str, obj) {
  Object.keys(obj).forEach(key => {
    str = str.replace(new RegExp(`{${key}}`,'g'), obj[key]);
  });
  return str;
}
