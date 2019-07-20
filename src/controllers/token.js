const tokenService = require('../services/token')
const userService = require('../services/user')

module.exports.refresh = async ({ auth }) => {
  const token = await tokenService.sign(auth)

  return {
    body: {
      message: 'token.refresh',
      token,
    },
    statusCode: 200,
  }
}

module.exports.check = async ({ auth }) => {
  await userService.check(auth.user.id)

  return {
    body: {
      message: 'token.ok',
    },
    statusCode: 200,
  }
}
