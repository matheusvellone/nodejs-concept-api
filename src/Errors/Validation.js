const BaseError = require('./BaseError')
const { validationError } = require('../../config/errorCodes')

class ValidationError extends BaseError {
  constructor(errors) {
    const fields = Object.keys(errors)

    super(422, validationError, {
      data: {
        errorsLength: fields.length,
      },
      key: 'validation-error',
    })

    this.body.validationErrors = errors
  }
}

module.exports = ValidationError
