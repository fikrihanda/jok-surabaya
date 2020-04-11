const bcrypt = require('bcryptjs')

module.exports = {
  friendlyName: 'Check username',
  description: 'Authentication check username',
  inputs: {
    method: {
      type: 'string',
      defaultsTo: ''
    },
    password: {
      type: 'string',
      defaultsTo: ''
    },
    nama_awal: {
      type: 'string',
      defaultsTo: ''
    },
    nama_akhir: {
      type: 'string',
      defaultsTo: ''
    },
    alamat: {
      type: 'string',
      defaultsTo: ''
    },
    telepon: {
      type: 'json',
      defaultsTo: null
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
  fn: async function(inputs, exits) {
    try {
      let {req} = this
      let {method} = inputs
      let findKar = await Karyawan.findOne(req.karyawan).intercept(err => ErrorSrv(err))
      if (_.isEmpty(findKar)) return exits.badRequest(
        ErrorSrv({
          code: 'E_INVALID_TOKEN',
          name: 'invalidToken',
          message: 'Karyawan tidak ada'
        })
      )
      if (method === 'user') {

      } else if (method === 'data_diri') {

      } else {
        return exits.serverError(
          ErrorSrv({
            code: 'E_METHOD_NOTFOUND',
            name: 'methodNotFound',
            message: 'Method ganti tidak ada atau tidak di ketahui'
          }).toJSON()
        )
      }
    } catch (err) {
      err = ErrorSrv(err)
      return exits.serverError(err.toJSON())
    }
  }
}
