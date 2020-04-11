const jwt = require('jsonwebtoken')
const config = sails.config.jwt

module.exports = {
  signin(karyawan) {
    return new Promise((res, rej) => {
      jwt.sign({karyawan}, config.privateKey, _.omit(config, 'privateKey'), (err, token) => {
        if (err) return rej(
          ErrorSrv(err)
        )
        res(token)
      })
    })
  },
  verify(token) {
    return new Promise((res, rej) => {
      jwt.verify(token, config.privateKey, _.omit(config, 'privateKey'), (err, decode) => {
        if (err) return rej(
          ErrorSrv(err)
        )
        res(decode)
      })
    })
  }
}
