module.exports = function (data) {
  let res = this.res
  let status = 404
  if (_.isEmpty(data)) {
    sails.log.warn(`Error with status ${status} with no data`)
    return res.sendStatus(status)
  } else if (_.isObject(data) && !_.isError(data)) {
    sails.log.warn(`Error with status ${status} with: `, data)
    return res.status(status).send(data)
  } else if (_.isError(data)) {
    if (_.isFunction(data.toJSON)) {
      sails.log.warn(`Error with status ${status} with: `, data.toJSON())
      return res.status(status).send(data.toJSON())
    } else {
      sails.log.warn(`Error with status ${status} with no data`)
      return res.sendStatus(status)
    }
  } else {
    sails.log.warn(`Error with status ${status} with no data`)
    return res.sendStatus(status)
  }
}
