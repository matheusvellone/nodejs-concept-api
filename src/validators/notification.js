const Joi = require('@hapi/joi')

const titleRule = Joi.string()
const bodyRule = Joi.string()
const iconRule = Joi.string().uri()
const clickActionRule = Joi.string().uri()

module.exports.notificate = Joi.object({
  body: Joi.object({
    body: bodyRule.required(),
    clickAction: clickActionRule.required(),
    icon: iconRule.required(),
    title: titleRule.required(),
  }),
})
