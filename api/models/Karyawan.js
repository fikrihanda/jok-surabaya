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
      let findUser = await Karyawan.findOne({
        username: valSet.username
      }).intercept(err => ErrorSrv(err))
      if (!_.isEmpty(findUser)) return done(
        ErrorSrv({
          code: 'E_USER_FOUND',
          name: 'userFound',
          message: 'Username sudah ada'
        })
      )
      valSet.password = await bcrypt.hash(valSet.password, 10)
      return done()
    } catch (e) {
      return done(
        ErrorSrv(e)
      )
    }
  }
}
