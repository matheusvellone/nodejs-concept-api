const BaseError = require('../Errors/BaseError')
const InternalError = require('../Errors/Internal')
const InvalidError = require('../Errors/Invalid')

const normalizeError = (err, requestId) => {
  if (err instanceof BaseError) {
    return err
  }

  if (err.type === 'entity.parse.failed') {
    return new InvalidError('body')
  }

  return new InternalError(err, requestId)
}

module.exports = (err, req, res, next) => {
  const error = normalizeError(err, req.requestId)

  error.getTranslateKeys().forEach(res.translate)

  const httpCode = error.getHttpCode()
  const body = error.getBody()
  res.body = body

  res.status(httpCode).send(body)
  next()
}
