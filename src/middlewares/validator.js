const ValidationError = require('../Errors/Validation')

module.exports = schema => (req, res, next) => {
  const { error, value } = schema.validate(req, {
    abortEarly: false,
    stripUnknown: true,
  })

  if (error) {
    const validationError = new ValidationError(error)
    next(validationError)
  } else {
    req.body = value.body ? value.body : req.body
    req.query = value.query ? value.query : req.query
    req.params = value.params ? value.params : req.params

    next()
  }
}
