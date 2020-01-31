const initOpts = {
  code: 'ERROR',
  name: 'error',
  message: 'Error'
}

export default function (opts, err = new Error()) {
  let reOpts = {}
  if (_.isEmpty(err) || !_.isError(err)) err = new Error()
  if (_.isString(opts)) {
    _.extend(reOpts, initOpts, {
      message: !_.isEmpty(opts) ? opts : reOpts.message
    })
  } else if (_.isObject(opts) && !_.isArray(opts)) {
    if (_.has(opts, 'response') && !_.isEmpty(opts.response)) {
      let {response: {data, status}} = opts
      if (_.isString(data)) {
        _.extend(reOpts, initOpts, {
          code: status,
          message: !_.isEmpty(data) ? data : `Error with status ${status}`
        })
      } else if (_.isObject(data) && !_.isArray(data)) {
        _.extend(reOpts, initOpts, {
          code: _.has(data, 'code') && !_.isEmpty(data.code) ? data.code : status,
          name: _.has(data, 'name') && !_.isEmpty(data.name) ? data.name : initOpts.name,
          message: _.has(data, 'message') && !_.isEmpty(data.message) ? data.message  : `Error with status ${status}`
        })
      } else {
        _.extend(reOpts, initOpts, {
          code: status,
          message: `Error with status ${status}`
        })
      }
    } else if (_.has(opts, 'request') && !_.isEmpty(opts.request)) {
      let {request: {status}} = opts
      _.extend(reOpts, initOpts, {
        code: status,
        message: `Error with status ${status}`
      })
    } else {
      _.extend(reOpts, initOpts, {
        code: _.has(opts, 'code') && !_.isEmpty(opts.code) ? opts.code : initOpts.code,
        name: _.has(opts, 'name') && !_.isEmpty(opts.name) ? opts.name : initOpts.name,
        message: _.has(opts, 'message') && !_.isEmpty(opts.message) ? opts.message  : initOpts.message
      })
    }
  } else {
    _.extend(reOpts, initOpts)
  }
  _.extend(err, reOpts)
  if (!_.has(err, 'toJSON') && !_.isFunction(err.toJSON)) {
    err.toJSON = function () {
      return _.pick(err, ['code', 'name', 'message'])
    }
  }
  return err
}
