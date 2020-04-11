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
    },
    nama_awal: {
      type: 'string',
      required: true
    },
    nama_akhir: {
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
      let {username, password, nama_awal, nama_akhir} = inputs
      let karyawan = await Karyawan.create({username, password})
        .intercept(err => ErrorSrv(err))
        .fetch()
      await KaryawanData.create({
        karyawan: karyawan.id,
        nama_awal,
        nama_akhir
      }).intercept(err => ErrorSrv(err))
    } catch (err) {
      err = ErrorSrv(err)
      if (err.name === 'usernameFound') return exits.badRequest(err)
      try {
        let check = await Karyawan.findOne({username})
          .intercept(e => ErrorSrv(e))
        if (!_.isEmpty(check)) {
          await Karyawan.destroyOne({id: check.id})
            .intercept(e => ErrorSrv(e))
        }
      } catch (e) {
        e = ErrorSrv(e)
        return exits.serverError(e)
      }
      return exits.serverError(err)
    }
  }
}
