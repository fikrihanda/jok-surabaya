const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  friendlyName: 'Signin',
  description: 'Signin authentication.',
  inputs: {
    username: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'ok'
    },
    notFound: {
      responseType: 'notFoundRes'
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
      let {username, password} = inputs
      let karyawan = await Karyawan.findOne({
        username
      }).intercept(err => ErrorSrv(err))
      if (_.isEmpty(karyawan)) return exits.badRequest(
        ErrorSrv({
          code: 'E_USERNAME_NOTFOUND',
          name: 'usernameNotFound',
          message: 'Username anda tidak ada'
        })
      )
      let checkPass = await bcrypt.compare(password, karyawan.password)
      if (!checkPass) return exits.badRequest(
        ErrorSrv({
          code: 'E_PASSWORD_WRONG',
          name: 'passwordWrong',
          message: 'Password anda salah'
        })
      )
      let token = await JwtSrv.signin(_.pick(karyawan, ['id', 'username']))
      return exits.success({
        token
      })
    } catch (err) {
      err = ErrorSrv(err)
      return exits.serverError(err)
    }
  }
}
