export default {
  async signin(data) {
    let {$utils, $axios} = $nuxt
    try {
      return $axios.$post('/authentication/signin', data)
    } catch (err) {
      err = $utils.error(err)
      return Promise.reject(err)
    }
  },
  async checkUsername(data) {
    let {$utils, $axios} = $nuxt
    try {
      return $axios.$post('/authentication/check-username', data)
    } catch (err) {
      err = $utils.error(err)
      return Promise.reject(err)
    }
  },
  async getInfo() {
    let {$utils, $axios} = $nuxt
    try {
      return $axios.$post('/authentication/token')
    } catch (err) {
      err = $utils.error(err)
      return Promise.reject(err)
    }
  }
}
