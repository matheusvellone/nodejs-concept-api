const Joi = require('joi')

const notificationTokenRule = Joi.string()

module.exports.updateNotificationToken = Joi.object({
  body: Joi.object({
    token: notificationTokenRule.required(),
  }),
})
