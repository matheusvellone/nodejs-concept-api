const log4js = require('log4js')
const onFinished = require('on-finished')

const { getData } = require('../helpers/jwt')

const logger = log4js.getLogger('api')

const getResponseLogLevel = (statusCode) => {
  if (statusCode >= 500) {
    return 'FATAL'
  }

  if (statusCode >= 400) {
    return 'WARN'
  }

  return 'DEBUG'
}

module.exports = (req, res, next) => {
  // Request
  const requestLog = {
    body: req.body,
    headers: req.headers,
    ip: req.connection.remoteAddress,
    method: req.method,
    query: req.query,
    requestId: req.requestId,
    startTime: req.startTime.toISOString(),
    type: 'request',
    url: req.url,
  }

  if (req.headers.token) {
    requestLog.auth = getData(req.headers.token)
  }

  logger.debug(requestLog)

  onFinished(res, () => {
    const endTime = Date.now()
    const difference = endTime - req.startTime.getTime()

    const logLevel = getResponseLogLevel(res.statusCode)

    // Response
    logger.log(logLevel, {
      body: res.body,
      // eslint-disable-next-line no-underscore-dangle
      headers: res._headers,
      latency: difference,
      method: req.method,
      requestId: req.requestId,
      statusCode: res.statusCode,
      type: 'response',
      url: req.url,
    })
  })

  next()
}
