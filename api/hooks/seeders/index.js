const modules = require('./libs/modules')

module.exports = function (sails) {
  return {
    async initialize(done) {
      sails.log.info('Initializing Hook Seeders [hooks/seeders]')
      let config = sails.config[this.configKey]
      let hooks = Object.keys(sails.hooks).filter(key => {
        return _.includes(['orm', 'services', 'nuxt'], key)
      }).map(key => `hook:${key}:loaded`)
      sails.after(hooks, async () => {
        try {
          await modules(sails, config)
          return done()
        } catch (err) {
          return done(err)
        }
      })
    }
  }
}
