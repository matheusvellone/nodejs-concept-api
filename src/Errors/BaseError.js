const log4js = require('log4js')

const logger = log4js.getLogger('api')

Error.stackTraceLimit = Infinity

class BaseError extends Error {
  constructor(httpCode = 500, code, message) {
    super(message)

    if (!code) {
      logger.fatal(`Error message '${message}' does not have a code: ${code}`)
    }

    this.httpCode = httpCode
    this.body = {
      code,
      message,
    }
  }

  getBody() {
    return this.body
  }

  getHttpCode() {
    return this.httpCode
  }
}

module.exports = BaseError
