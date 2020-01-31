const flaverr = require('flaverr')

const initState = {
  code: 'E_SERVER_ERROR',
  name: 'serverError',
  message: 'Server Error'
}

module.exports = function (opts, err = new Error()) {
  let reOpts = {}
  if (_.isEmpty(err) || !_.isError(err)) err = new Error()
  if (_.isString(opts)) {
    _.extend(reOpts, initState, {
      message: _.isEmpty(opts) ? 'Server Error' : opts
    })
  } else if (_.isObject(opts) && !_.isArray(opts)) {
    _.extend(reOpts, {
      code: _.has(opts, 'code') && !_.isEmpty(opts.code) ? opts.code : initState.code,
      name: _.has(opts, 'name') && !_.isEmpty(opts.name) ? opts.name : initState.name,
      message: _.has(opts, 'message') && !_.isEmpty(opts.message) ? opts.message : initState.message
    })
  } else {
    _.extend(reOpts, initState)
  }
  let newErr = flaverr(reOpts, err)
  if (!_.has(newErr, 'toJSON') || !_.isFunction(newErr.toJSON)) {
    newErr.toJSON = function () {
      return _.pick(err, ['code', 'name', 'message'])
    }
  }
  return newErr
}
