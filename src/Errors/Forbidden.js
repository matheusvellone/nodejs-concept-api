const BaseError = require('./BaseError')
const { forbidden } = require('../../config/errorCodes')

const messageSuffix = 'forbidden'

class ForbiddenException extends BaseError {
  constructor(resourceName = 'generic') {
    const message = `${messageSuffix}.${resourceName}`
    super(403, forbidden[resourceName], message)
  }
}

module.exports = ForbiddenException
