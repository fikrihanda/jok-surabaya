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
    },
    unauthorized: {
      responseType: 'unauthorizedRes'
    }
  },
  fn: async function(inputs, exits) {
    try {
      let req = this.req
      let {method} = inputs
      let karyawan = await Karyawan.findOne(req.karyawan).intercept(err => ErrorSrv(err))
      if (_.isEmpty(karyawan)) return exits.unauthorized(
        ErrorSrv({
          code: 'E_INVALID_TOKEN',
          name: 'invalidToken',
          message: 'Token anda salah atau token tidak ada'
        })
      )
      if (method === 'user') {
        let {password} = inputs
        await Karyawan.updateOne({
          id: karyawan.id
        }).set({password}).intercept(err => ErrorSrv(err))
        return exits.success({
          success: true
        })
      } else if (method === 'data-diri') {
        let {nama_awal, nama_akhir, alamat, telepon} = inputs
        await KaryawanData.updateOne({
          karyawan: karyawan.id
        }).set({
          nama_awal, nama_akhir,
          alamat, telepon
        }).intercept(err => ErrorSrv(err))
        return exits.success({
          success: true
        })
      } else {
        return exits.badRequest(
          ErrorSrv({
            code: 'E_METHOD_NOTFOUND',
            name: 'methodNotFound',
            message: 'Method ganti tidak ada atau tidak di ketahui'
          })
        )
      }
    } catch (err) {
      err = ErrorSrv(err)
      return exits.serverError(err)
    }
  }
}
