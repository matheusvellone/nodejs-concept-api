const uuid = require('uuid/v4')

module.exports = (req, res, next) => {
  const requestId = uuid()
  const startTime = new Date()

  req.requestId = requestId
  req.startTime = startTime

  next()
}
