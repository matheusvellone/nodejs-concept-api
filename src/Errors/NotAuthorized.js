const BaseError = require('./BaseError')
const { unauthorized } = require('../../config/errorCodes')

const messageSuffix = 'unauthorized'

class NotAuthorizedError extends BaseError {
  constructor(resourceName = 'generic') {
    const message = `${messageSuffix}.${resourceName}`
    super(401, unauthorized[resourceName], message)
  }
}

module.exports = NotAuthorizedError
