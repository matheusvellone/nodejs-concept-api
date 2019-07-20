const Joi = require('joi')

const { AUTH } = require('../constants')

const authSchema = Joi.object({
  login: Joi.string().max(30).required(),
  password: Joi.string().required(),
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
    id: Joi.string().required(),
    name: Joi.string().max(255).required(),
    level: Joi.valid(Object.values(AUTH.LEVELS)).required(),
  }).required(),
})
