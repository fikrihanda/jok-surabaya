module.exports = async function (req, res, done) {
  try {
    if (!_.has(req.headers, 'authorization') || _.isEmpty(req.headers.authorization)) {
      return res.unauthorizedRes(
        ErrorSrv({
          code: 'E_INVALID_TOKEN',
          name: 'invalidToken',
          message: 'Token anda salah atau token tidak ada'
        })
      )
    }
    let token = req.headers.authorization.split(' ')[1]
    if (_.isEmpty(token)) return res.unauthorizedRes(
      ErrorSrv({
        code: 'E_INVALID_TOKEN',
        name: 'invalidToken',
        message: 'Token anda salah atau token tidak ada'
      })
    )
    let decode = await JwtSrv.verify(token)
    if (_.isEmpty(decode.karyawan)) return res.unauthorizedRes(
      ErrorSrv({
        code: 'E_INVALID_TOKEN',
        name: 'invalidToken',
        message: 'Token anda salah atau token tidak ada'
      })
    )
    let karyawan = await Karyawan.findOne(decode.karyawan)
      .intercept(err => ErrorSrv(err))
    if (_.isEmpty(karyawan)) return res.unauthorizedRes(
      ErrorSrv({
        code: 'E_INVALID_TOKEN',
        name: 'invalidToken',
        message: 'Token anda salah atau token tidak ada'
      })
    )
    return done()
  } catch (err) {
    err = ErrorSrv(err)
    if (err.name === 'TokenExpiredError') return res.unauthorizedRes(
      ErrorSrv({
        code: 'E_INVALID_TOKEN',
        name: 'invalidToken',
        message: 'Token anda salah atau token tidak ada'
      })
    )
    return done(err)
  }
}
