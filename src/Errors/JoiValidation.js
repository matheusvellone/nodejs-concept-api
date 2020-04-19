const log4js = require('log4js')
const {
  assoc,
  pipe,
  prop,
  reduce,
  tail,
} = require('ramda')
const ValidationError = require('./Validation')
const { validationErrors } = require('../config/errorCodes')

const logger = log4js.getLogger('api')

const transformJoiError = pipe(
  prop('details'),
  reduce((finalObject, err) => {
    const {
      type,
      context,
      path,
    } = err

    const validationErrorCode = validationErrors[type]

    if (!validationErrorCode) {
      logger.fatal(`Validation error code for error '${type}' does not have a code: ${validationErrorCode}`)
    }

    return assoc(
      tail(path).join('.'),
      {
        data: context,
        key: validationErrorCode,
      },
      finalObject
    )
  }, {})
)

class JoiValidationError extends ValidationError {
  constructor(joiError) {
    const errorsObject = transformJoiError(joiError)

    super(errorsObject)
  }
}

module.exports = JoiValidationError
