export default async function (ctx) {
  let {store, $axios, redirect, app: {router, $utils}} = ctx
  let token = store.getters['authentication/token']
  if (!_.isEmpty(token)) {
    $axios.setToken(token, 'Bearer')
    try {
      await store.dispatch('authentication/getInfo')
      //await store.dispatch('authentication/getMenus')
    } catch (err) {
      store.commit('authentication/removeAllState')
      $utils.notification({
        type: 'error',
        title: 'Error',
        text: err.message
      })
      if (router.currentRoute !== '/login' || router.currentRoute !== '/register') return redirect('/login')
    }
  } else {
    $axios.setToken(null)
  }
}
