const log4js = require('log4js')

const BaseError = require('./BaseError')
const { internalError } = require('../../config/errorCodes')
const { isProd } = require('../../config/env')

const apiLogger = log4js.getLogger('api')

class InternalError extends BaseError {
  constructor(err, requestId) {
    super(500, internalError, 'http.500')

    if (!isProd) {
      this.body.error = {
        message: err.message,
        stack: err.stack.split('\n'),
      }

      apiLogger.fatal(err)
      return
    }

    apiLogger.error({
      message: err.message,
      requestId,
      stackTrace: err.stack,
    })
  }
}

module.exports = InternalError
