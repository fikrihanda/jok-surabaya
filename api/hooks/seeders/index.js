const modules = require('./libs/modules')

module.exports = function (sails) {
  return {
    async initialize(done) {
      let config = sails.config[this.configKey]
      if (config.disabled) return done()
      let hooks = Object.keys(sails.hooks).filter(key => {
        return _.includes(['orm', 'services', 'nuxt'], key)
      }).map(key => `hook:${key}:loaded`)
      sails.after(hooks, async () => {
        try {
          sails.log.info('Initializing Hook Seeders [hooks/seeders]')
          await modules(sails, config)
          return done()
        } catch (err) {
          return done(err)
        }
      })
    }
  }
}
