const BaseError = require('./BaseError')
const { notFound } = require('../../config/errorCodes')

const notFoundSufix = 'not-found'

class NotFoundError extends BaseError {
  constructor(resourceName = 'generic') {
    const message = `${notFoundSufix}.${resourceName}`
    super(404, notFound[resourceName], message)
  }
}

module.exports = NotFoundError
