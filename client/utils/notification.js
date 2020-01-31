import Vue from 'vue'

export default function (opts) {
  Vue.notify({
    group: 'alert-group',
    ...opts
  })
}
