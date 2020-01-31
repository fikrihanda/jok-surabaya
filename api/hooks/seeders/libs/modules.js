const files = require('./files')

module.exports = async function (sails, config) {
  try {
    let objFiles = await files(config)
    if (_.isEmpty(objFiles)) return Promise.resolve()
    let arrFiles = Object.keys(objFiles).filter(key => {
      let val = objFiles[key]
      return !_.isEmpty(val)
    }).map(async key => {
      let models = sails.models[key.toLowerCase()]
      let val = objFiles[key]
      try {
        if (_.isObject(val) && !_.isArray(val)) {
          return await models.create(val).intercept(err => ErrorSrv(err))
        } else {
          return await models.createEach(val).intercept(err => ErrorSrv(err))
        }
      } catch (err) {
        err = ErrorSrv(err)
        return Promise.reject(err)
      }
    })
    await Promise.all(arrFiles)
    return Promise.resolve()
  } catch (err) {
    err = ErrorSrv(err)
    return Promise.reject(err)
  }
}
