const notificationService = require('../services/notification')

module.exports.notificateUser = async ({ body, params }) => {
  await notificationService.notificateUser(params.userId, body)

  return {
    body: {
      message: 'notification.sent',
    },
    statusCode: 200,
  }
}
