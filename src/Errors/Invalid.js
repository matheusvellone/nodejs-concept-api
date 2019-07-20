const BaseError = require('./BaseError')
const { invalid } = require('../../config/errorCodes')

const messageSuffix = 'invalid'

class InvalidError extends BaseError {
  constructor(resourceName = 'generic') {
    const message = `${messageSuffix}.${resourceName}`
    super(400, invalid[resourceName], message)
  }
}

module.exports = InvalidError
