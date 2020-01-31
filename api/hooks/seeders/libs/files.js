const includeAll = require('include-all')

module.exports = async function (config) {
  let files = includeAll({
    dirname: config.dirname,
    filter: /(.+)\.js$/,
    excludeDirs: /^\.(git|svn)$/
  })
  let refiles = {}
  let err
  for (let key in files) {
    let val = files[key]
    try {
      if (_.isFunction(val)) {
        refiles[key] = await val()
      } else {
        refiles[key] = val
      }
    } catch (e) {
      err = ErrorSrv(e)
      break
    }
  }
  if (!_.isEmpty(err)) return Promise.reject(err)
  return refiles
}
