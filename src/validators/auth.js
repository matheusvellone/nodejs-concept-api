const Joi = require('@hapi/joi')

const { schema: userSchema } = require('./user')

const authSchema = Joi.object({
  login: userSchema.login.required(),
  password: userSchema.password.required(),
})

module.exports.login = Joi.object({
  body: authSchema.required(),
})

module.exports.socialLogin = Joi.object({
  body: Joi.object({
    token: Joi.string().required(),
  }),
  params: Joi.object({
    name: Joi.valid(['facebook']).required(),
  }),
})

module.exports.register = Joi.object({
  body: authSchema.required(),
})

module.exports.jwt = Joi.object({
  id: Joi.string().required(),
  user: Joi.object({
    id: userSchema.id.required(),
    name: userSchema.name.required(),
    level: userSchema.level.required(),
  }).required(),
})
