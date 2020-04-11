import Auth from '@/api/Auth'

const initState = {
  token: '',
  info: {
    nama_awal: '',
    nama_akhir: '',
    email: '',
    avatar: '',
    alamat: '',
    telepon: [],
    roles: ''
  },
  menus: []
}

export const state = () => initState

export const getters = {
  token(state) {
    return state.token
  },
  info(state) {
    return state.info
  },
  menus(state) {
    return state.menus
  }
}

export const mutations = {
  setToken(state, payload) {
    if (_.isEmpty(payload)) return
    state.token = payload
  },
  removeToken(state) {
    state.token = initState.token
  },
  setInfo(state, payload) {
    if (_.isEmpty(payload)) return
    state.info = _.pick(payload, [
      'nama_awal',
      'nama_akhir',
      'email',
      'avatar',
      'roles',
      'alamat',
      'telepon'
    ])
  },
  removeInfo(state) {
    state.info = initState.info
  },
  setMenus(state, payload) {
    if (_.isEmpty(payload)) return
    state.menus = payload
  },
  removeMenus(state) {
    state.menus = initState.menus
  },
  removeAllState(state) {
    state.token = initState.token
    state.info = initState.info
    state.menus = initState.menus
  }
}

export const actions = {
  async signin({commit}, data) {
    try {
      let {token} = await Auth.signin(data)
      commit('setToken', token)
      return Promise.resolve()
    } catch (err) {
      err = this.$utils.error(err)
      return Promise.reject(err)
    }
  },
  async register({commit}, data) {
    try {
      let {token} = await Auth.register(data)
      commit('setToken', token)
      return Promise.resolve()
    } catch (err) {
      err = this.$utils.error(err)
      return Promise.reject(err)
    }
  },
  async getInfo({commit}) {
    try {
      let info = await Auth.getInfo()
      commit('setInfo', info)
      return Promise.resolve()
    } catch (err) {
      err = this.$utils.error(err)
      return Promise.reject(err)
    }
  }
}
