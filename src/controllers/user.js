const userService = require('../services/user')

module.exports.updateNotificationToken = async ({ auth, body }) => {
  await userService.updateNotificationToken(auth.user.id, body.token)

  return {
    body: {
      message: 'user.notificationTokenUpdated',
    },
    statusCode: 200,
  }
}

module.exports.list = async () => {
  const users = await userService.list()

  return {
    body: {
      message: 'user.list',
      result: users,
    },
    statusCode: 200,
  }
}
