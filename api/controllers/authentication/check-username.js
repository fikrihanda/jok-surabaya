module.exports = {
  friendlyName: 'Check username',
  description: 'Authentication check username',
  inputs: {
    username: {
      type: 'string',
      defaultsTo: ''
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
      let {username} = inputs
      if (_.isEmpty(username)) return exits.badRequest(
        ErrorSrv({
          code: 'E_USERNAME_EMPTY',
          name: 'usernameEmpty',
          message: 'Username anda tidak boleh kosong'
        })
      )
      let karyawan = await Karyawan.find({
        username: username
      }).intercept(err => ErrorSrv(err))
      if (!_.isEmpty(karyawan)) return exits.badRequest(
        ErrorSrv({
          code: 'E_USERNAME_FOUND',
          name: 'usernameFound',
          message: 'Username ini sudah ada'
        })
      )
      return exits.success({
        success: true
      })
    } catch (err) {
      err = ErrorSrv(err)
      return exits.serverError(err)
    }
  }
};
