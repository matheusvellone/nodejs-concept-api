const BaseError = require('./BaseError')
const { conflict } = require('../../config/errorCodes')

const suffixMessage = 'conflict'

class ConflictError extends BaseError {
  constructor(resourceName = 'generic') {
    const message = `${suffixMessage}.${resourceName}`
    super(409, conflict[resourceName], message)
  }
}

module.exports = ConflictError
