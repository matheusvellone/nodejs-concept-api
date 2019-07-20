const {
  assoc,
  pipe,
  prop,
  reduce,
  tail,
} = require('ramda')
const BaseError = require('./BaseError')
const { validationError } = require('../../config/errorCodes')

const validationErrorsField = 'validationErrors'

const transformJoiError = pipe(
  prop('details'),
  reduce((finalObject, err) => assoc(
    tail(err.path).join('.'),
    { context: err.context, rule: err.type },
    finalObject
  ), {})
)

class ValidationError extends BaseError {
  constructor(errors) {
    const errorsObject = transformJoiError(errors)
    const fields = Object.keys(errorsObject)

    super(422, validationError, {
      data: {
        errorsLength: fields.length,
      },
      key: 'validation-error',
    })

    this.body[validationErrorsField] = fields
      .reduce((errorObject, field) => {
        this.addTranslateKey([validationErrorsField, field])
        return assoc(
          field,
          {
            data: errorsObject[field].context,
            key: `validation.${errorsObject[field].rule}`,
          },
          errorObject
        )
      }, {})
  }
}

module.exports = ValidationError
