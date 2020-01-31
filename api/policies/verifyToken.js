const jwt = require('jsonwebtoken')

module.exports = function (req, res, done) {
  let config = sails.config.jwt
  let token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, config.privateKey, _.omit(config, 'privateKey'), (err, decode) => {
    if (err) {
      err = ErrorSrv(err)
      return done(err)
    }
    req.karyawan = decode.karyawan
    return done()
  })
}
