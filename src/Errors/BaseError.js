const log4js = require('log4js')

const logger = log4js.getLogger('api')

Error.stackTraceLimit = Infinity

class BaseError extends Error {
  constructor(httpCode = 500, code, message) {
    super(message)

    if (!code) {
      logger.error(`Error message '${message}' does not have a code: ${code}`)
    }

    this.translateKeys = []

    this.httpCode = httpCode
    this.body = {
      code,
      message,
    }
  }

  addTranslateKey(key) {
    this.translateKeys.push(key)
  }

  getBody() {
    return this.body
  }

  getTranslateKeys() {
    return this.translateKeys
  }

  getHttpCode() {
    return this.httpCode
  }
}

module.exports = BaseError
