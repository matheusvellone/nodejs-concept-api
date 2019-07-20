const { models } = require('../database')
const userTransform = require('../transforms/user')
const InvalidError = require('../Errors/Invalid')

module.exports.updateNotificationToken = (userId, notificationToken) => models.user.update(
  { notification_token: notificationToken },
  { where: { id: userId } }
)

module.exports.list = async () => {
  const users = await models.user.findAll({
    raw: true,
  })

  return users.map(userTransform)
}

module.exports.check = async (userId) => {
  const user = await models.user.findByPk(userId)

  if (!user) {
    throw new InvalidError('userInvalid')
  }
}
