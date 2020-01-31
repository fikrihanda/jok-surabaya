export default function ({store, $axios, app: {$utils}}) {
  $axios.onError(err => {
    err = $utils.error(err)
    if (err.code === 'E_INVALID_TOKEN') {
      store.commit('authentication/removeAllState')
    }
    return Promise.reject(err)
  })
}
