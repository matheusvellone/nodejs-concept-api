const { removeJwtFields, sign } = require('../helpers/jwt')

module.exports.sign = (payload) => {
  const rawPayload = removeJwtFields(payload)

  return sign(rawPayload)
}
