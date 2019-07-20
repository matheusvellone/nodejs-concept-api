const InvalidError = require('../Errors/Invalid')
const { models } = require('../database')

const firebase = require('../services/external/firebase')
const notificationTransform = require('../transforms/notification')

module.exports.notificateUser = async (userId, payload) => {
  const user = await models.user.findByPk(userId, { raw: true })

  const notificationToken = user.notification_token

  if (!notificationToken) {
    throw new InvalidError('notificationToken')
  }

  await firebase.sendNotification(notificationToken, notificationTransform.firebase(payload))
}
