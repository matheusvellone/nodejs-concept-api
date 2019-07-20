const authService = require('../services/auth')

module.exports.login = async ({ body }) => {
  const token = await authService.signIn(body)

  return {
    body: {
      message: 'signed.in',
      token,
    },
    statusCode: 200,
  }
}

module.exports.socialLogin = async ({ body, params }) => {
  const token = await authService.socialLogin(params.name, body)

  return {
    body: {
      message: 'signed.in',
      token,
    },
    statusCode: 200,
  }
}

module.exports.register = async ({ body }) => {
  const token = await authService.signUp(body)

  return {
    body: {
      message: 'signed.up',
      token,
    },
    statusCode: 201,
  }
}
