const { path } = require('ramda')
const jwt = require('../helpers/jwt')
const NotAuthorizedError = require('../Errors/NotAuthorized')
const ForbiddenError = require('../Errors/Forbidden')
const { AUTH } = require('../constants')
const { jwt: jwtValidator } = require('../validators/auth')
const { models } = require('../database')

const { HEADER, LEVELS } = AUTH

const getApiToken = path(['headers', HEADER])

const decodeAndValidate = (token) => {
  const decoded = jwt.removeJwtFields(jwt.verify(token))

  const { value, error } = jwtValidator.validate(decoded, {
    abortEarly: true,
    allowUnknown: false,
  })

  if (error) {
    throw new NotAuthorizedError('jwt-invalid')
  }

  return value
}

const getAuthMiddleware = expectedLevels => async (req, res, next) => {
  try {
    const token = getApiToken(req)

    if (!token) {
      throw new NotAuthorizedError('empty-token')
    }

    const decoded = decodeAndValidate(token)

    const { user } = decoded
    const { level } = user

    if (expectedLevels && !expectedLevels.includes(level) && level !== LEVELS.MASTER) {
      throw new ForbiddenError('jwt.level')
    }

    // TODO - verificar se o token é válido. Onde manter os tokens válidos ? Redis ?
    // TODO - validar se o usuário está ativo no banco de dados
    req.auth = decoded

    next()
  } catch (error) {
    next(error)
  }
}

module.exports.admin = getAuthMiddleware([LEVELS.ADMIN])
module.exports.master = getAuthMiddleware([LEVELS.MASTER])
module.exports.client = getAuthMiddleware([LEVELS.CLIENT])
module.exports.any = getAuthMiddleware()

const mapping = {
  client: LEVELS.CLIENT,
  admin: LEVELS.ADMIN,
  master: LEVELS.MASTER,
}

module.exports.multi = (levels) => {
  const expectedLevels = levels.map((level) => {
    const mappedLevel = mapping[level]

    if (!mappedLevel) {
      throw new Error(`Incorrect auth level '${level}'`)
    }

    return mappedLevel
  })

  return getAuthMiddleware(expectedLevels)
}
