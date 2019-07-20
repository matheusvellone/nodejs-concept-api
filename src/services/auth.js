const { models } = require('../database')
const jwtTransform = require('../transforms/jwt')
const InvalidError = require('../Errors/Invalid')
const { checkHashPassword } = require('../helpers/security')
const { sign } = require('../helpers/jwt')
const { AUTH } = require('../constants')
const { checkExists } = require('../helpers/model')
const { hashPassword } = require('../helpers/security')
const { checkConflict } = require('../helpers/model')
const socialMedia = require('./external/socialMedia')

const checkPassword = async (plainTextPassword, user) => {
  const valid = await checkHashPassword(
    plainTextPassword,
    user.password
  )

  if (!valid) {
    throw new InvalidError('password')
  }
}

const createUser = async (payload) => {
  try {
    const hashedPassword = await hashPassword(payload.password)

    return await models.user.create({
      ...payload,
      level: AUTH.LEVELS.ADMIN,
      password: hashedPassword,
    })
  } catch (error) {
    return checkConflict('user', error)
  }
}

module.exports.signUp = async (payload) => {
  const createdUser = await createUser(payload)

  const jwtData = jwtTransform({
    user: createdUser,
  })

  return sign(jwtData)
}

module.exports.socialLogin = async (socialLoginName, payload) => {
  const {
    expiresAt,
    userId,
    email,
    name,
  } = await socialMedia[socialLoginName].decodeToken(payload.token)

  let user = await models.user.findOne({
    raw: true,
    where: {
      [`${socialLoginName}_id`]: userId,
    },
  })

  if (!user) {
    user = await models.user.create({
      [`${socialLoginName}_id`]: userId,
      email,
      name,
      level: AUTH.LEVELS.CLIENT,
    })
  }

  const jwtData = jwtTransform({
    user,
  })

  const now = Date.now()

  const lifetime = Math.floor((expiresAt - now) / 1000)

  return sign(jwtData, { expiresIn: lifetime })
}

module.exports.signIn = async ({ login, password }) => {
  const user = await models.user.findOne({
    raw: true,
    where: { login },
  })
  checkExists('user', user)

  await checkPassword(password, user)

  const jwtData = jwtTransform({
    user,
  })

  return sign(jwtData)
}
