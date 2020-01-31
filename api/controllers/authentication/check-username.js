module.exports = {
  friendlyName: 'Check username',
  description: 'Authentication check username',
  inputs: {
    username: {
      type: 'string'
    }
  },
  exits: {
    success: {
      responseType: 'ok'
    },
    badRequest: {
      responseType: 'badRequestRes'
    },
    serverError: {
      responseType: 'serverErrorRes'
    }
  },
  fn: async function (inputs, exits) {
    try {
      if (_.isEmpty(inputs.username)) {
        return exits.badRequest(
          ErrorSrv({
            code: 'E_USERNAME_EMPTY',
            name: 'usernameEmpty',
            message: 'Username harus di isi'
          }).toJSON()
        )
      }
      let find = await Karyawan.find({
        username: inputs.username
      }).intercept(err => ErrorSrv(err))
      if (!_.isEmpty(find)) {
        return exits.badRequest(
          ErrorSrv({
            code: 'E_USERNAME_FOUND',
            name: 'usernameFound',
            message: 'Username sudah ada'
          }).toJSON()
        )
      }
      return exits.success({
        success: true
      })
    } catch (err) {
      err = ErrorSrv(err)
      return exits.serverError(err.toJSON())
    }
  }
};
