const Joi = require('joi')

module.exports.getRuleRequired = (rule, required) => {
  if (required) {
    return rule.required()
  }

  return rule
}

module.exports.paginate = {
  limit: Joi.number().min(1).max(100),
  page: Joi.number().min(1),
}
