const bcrypt = require('bcryptjs')

module.exports = {
  attributes: {
    username: {
      type: 'string',
      unique: true
    },
    password: 'string',
    roles: {
      type: 'string',
      isIn: ['developer', 'pemilik', 'admin', 'toko', 'gudang'],
      defaultsTo: 'toko'
    },
    data: {
      collection: 'karyawandata',
      via: 'karyawan'
    }
  },
  async beforeCreate(valSet, done) {
    try {
      let karyawan = await Karyawan.findOne({
        username: valSet.username
      }).intercept(err => ErrorSrv(err))
      if (!_.isEmpty(karyawan)) return done(
        ErrorSrv({
          code: 'E_USERNAME_FOUND',
          name: 'usernameFound',
          message: 'Username ini sudah ada'
        })
      )
      valSet.password = await bcrypt.hash(valSet.password, 10)
      return done()
    } catch (err) {
      err = ErrorSrv(err)
      return done(err)
    }
  },
  async beforeUpdate(valSet, done) {
    try {
      if (!_.isEmpty(valSet.password)) {
        valSet.password = await bcrypt.hash(valSet.password, 10)
      }
      return done()
    } catch (err) {
      err = ErrorSrv(err)
      return done(err)
    }
  }
}
