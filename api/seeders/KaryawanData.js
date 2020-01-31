module.exports = async function () {
  try {
    let frontEnd = await Karyawan.create({
      username: 'frontend',
      password: 'frontend123',
      roles: 'developer'
    }).fetch()
    let backEnd = await Karyawan.create({
      username: 'backend',
      password: 'backend123',
      roles: 'developer'
    }).fetch()
    return [
      {
        karyawan: frontEnd.id,
        nama_awal: 'Developer',
        nama_akhir: 'Frontend'
      },
      {
        karyawan: backEnd.id,
        nama_awal: 'Developer',
        nama_akhir: 'Backend'
      }
    ]
  } catch (err) {
    err = ErrorSrv(err)
    return Promise.reject(err)
  }
}
