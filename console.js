const repl = require('repl')

require('./dotenv')

const { context } = repl.start({
  ignoreUndefined: true,
  replMode: repl.REPL_MODE_STRICT,
})

context.Promise = require('bluebird')
