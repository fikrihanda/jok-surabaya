module.exports = {
  friendlyName: 'Token',
  description: 'Token authentication.',
  inputs: {},
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
    },
    unauthorized: {
      responseType: 'unauthorizedRes'
    }
  },
  fn: async function (_inputs, exits) {
    let req = this.req
    try {
      let karyawan = await Karyawan.findOne(req.karyawan)
        .populateAll()
        .intercept(err => ErrorSrv(err))
      if (_.isEmpty(karyawan)) {
        return exits.unauthorized(
          ErrorSrv({
            code: 'E_INVALID_TOKEN',
            name: 'invalidToken',
            message: 'Token anda salah atau token tidak ada'
          })
        )
      }
      let data = find.data[0]
      return exits.success({
        nama_awal: data.nama_awal,
        nama_akhir: data.nama_akhir,
        avatar: data.avatar,
        alamat: data.alamat,
        telepon: data.telepon,
        roles: find.roles
      })
    } catch (err) {
      err = ErrorSrv(err)
      return exits.serverError(err)
    }
  }
};
