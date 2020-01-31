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
    let config = sails.config.jwt
    try {
      let find = await Karyawan.findOne({
        username: inputs.username
      }).intercept(err => ErrorSrv(err))
      if (_.isEmpty(find)) {
        return exits.notFound(
          ErrorSrv({
            code: 'E_USERNAME_NOTFOUND',
            name: 'usernameNotFound',
            message: 'Username tidak ada'
          }).toJSON()
        )
      }
      let check = await bcrypt.compare(inputs.password, find.password)
      if (!check) {
        return exits.notFound(
          ErrorSrv({
            code: 'E_PASSWORD_WRONG',
            name: 'passwordWrong',
            message: 'Password salah'
          }).toJSON()
        )
      }
      let token = jwt.sign({
        karyawan: _.pick(find, ['username', 'id'])
      }, config.privateKey, _.omit(config, 'privateKey'))
      return exits.success({
        token
      })
    } catch (err) {
      err = ErrorSrv(err)
      return exits.serverError(err.toJSON())
    }
  }
}
