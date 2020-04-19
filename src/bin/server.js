require('../../dotenv')
const log4js = require('log4js')
const app = require('../app')
const database = require('../database')
const { env } = require('../config/env')

const logger = log4js.getLogger('api')

const {
  PORT = 3000,
} = process.env

const start = async () => {
  await database.connect(logger)

  app.listen(PORT, () => {
    logger.debug(`Server is running in '${env}' mode on port ${PORT}`)
  })
}

start()
