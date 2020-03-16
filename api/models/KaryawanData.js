module.exports = {
  tableName: 'karyawan_data',
  attributes: {
    nama_awal: 'string',
    nama_akhir: 'string',
    alamat: 'string',
    telepon: 'json',
    karyawan: {
      model: 'karyawan',
      unique: true
    }
  },
  async beforeCreate(valSet, done) {
    try {
      let karyawan = await Karyawan.findOne({
        id: valSet.karyawan
      }).intercept(err => ErrorSrv(err))
      if (_.isEmpty(karyawan)) return done(
        ErrorSrv({
          code: 'E_KARYAWAN_NOTFOUND',
          name: 'karyawanNotFound',
          message: 'Karyawan tidak ada'
        })
      )
      return done()
    } catch (err) {
      err = ErrorSrv(err)
      return done(err)
    }
  }
}
