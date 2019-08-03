const Joi = require('@hapi/joi')

const { AUTH } = require('../constants')

const idRule = Joi.string()
const nameRule = Joi.string().max(255)
const levelRule = Joi.valid(Object.values(AUTH.LEVELS))
const loginRule = Joi.string().max(30)
const passwordRule = Joi.string()
const notificationTokenRule = Joi.string()

module.exports.updateNotificationToken = Joi.object({
  body: Joi.object({
    token: notificationTokenRule.required(),
  }),
})

module.exports.schema = {
  id: idRule,
  name: nameRule,
  level: levelRule,
  login: loginRule,
  password: passwordRule,
}
