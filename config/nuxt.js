const webpack = require('webpack')

module.exports.nuxt = {
  mode: 'spa',
  srcDir: 'client/',
  head: {
    title: process.env.APP_NAME,
    titleTemplate: `${process.env.APP_NAME} - %s`,
    meta: [
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
      },
      {'http-equiv': 'X-UA-Compatible', content: 'ie=edge'}
    ]
  },
  loading: {
    color: '#0069d9',
    failedColor: '#dc3545'
  },
  router: {
    middleware: ['check-auth']
  },
  css: [
    '@/assets/styles/app.scss'
  ],
  plugins: [
    '@/plugins/utils',
    '@/plugins/vuex-persistedstate',
    '@/plugins/axios',
    '@/plugins/vue-fragment',
    '@/plugins/vuelidate',
    '@/plugins/vue-notification',
    '@/plugins/fontawesome'
  ],
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt'
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
  axios: {
    https: true,
    prefix: '/api'
  },
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        '_': 'lodash',
        'moment': 'moment'
      })
    ]
  },
  dev: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
}
