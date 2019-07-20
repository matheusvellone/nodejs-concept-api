const BaseError = require('./BaseError')
const { limitExceeded } = require('../../config/errorCodes')

const messageSuffix = 'limit-exceeded'

class LimitExceededError extends BaseError {
  constructor(resourceName = 'generic') {
    const message = `${messageSuffix}.${resourceName}`
    super(429, limitExceeded[resourceName], message)
  }
}

module.exports = LimitExceededError
