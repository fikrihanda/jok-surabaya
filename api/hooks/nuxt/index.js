const {Nuxt, Builder} = require('nuxt')

module.exports = function hookNuxt(sails) {
  let nuxt
  return {
    async initialize(done) {
      sails.log.info('Initializing Hook Nuxt [hooks/nuxt]')
      process.env.API_PORT = sails.config.port
      nuxt = new Nuxt(sails.config[this.configKey])
      if (nuxt.options.dev) {
        try {
          await new Builder(nuxt).build()
        } catch (e) {
          return done(e)
        }
      }
      sails.nuxt = nuxt
      return done()
    },
    routes: {
      after: {
        '*': {
          skipRegex: /^\/api\/.*$/,
          fn(req, res) {
            return nuxt.render(req, res)
          }
        }
      }
    }
  }
}
