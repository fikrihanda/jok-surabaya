export default {
  async signin(data) {
    let {$utils, $axios} = $nuxt
    try {
      return await $axios.$post('/authentication/signin', data)
    } catch (err) {
      err = $utils.error(err)
      return Promise.reject(err)
    }
  },
  async register(data) {
    let {$utils, $axios} = $nuxt
    try {
      return await $axios.$post('/authentication/register', data)
    } catch (err) {
      err = $utils.error(err)
      return Promise.reject(err)
    }
  },
  async checkUsername(data) {
    let {$utils, $axios} = $nuxt
    try {
      return await $axios.$post('/authentication/check-username', data)
    } catch (err) {
      err = $utils.error(err)
      return Promise.reject(err)
    }
  },
  async getInfo() {
    let {$utils, $axios} = $nuxt
    try {
      return await $axios.$post('/authentication/token')
    } catch (err) {
      err = $utils.error(err)
      return Promise.reject(err)
    }
  },
  async ganti(data) {
    let {$utils, $axios} = $nuxt
    try {
      await $axios.$post('/authentication/ganti', data)
      return Promise.resolve()
    } catch (err) {
      err = $utils.error(err)
      return Promise.reject(err)
    }
  }
}
