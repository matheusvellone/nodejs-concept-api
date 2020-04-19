const log4js = require('log4js')
const { assocPath, isNil, path } = require('ramda')

const { isProd } = require('../config/env')

const logLevel = isProd ? 'ALL' : 'WARN'
const logType = isProd ? 'apiFile' : 'console'

const log4jsConfig = {
  appenders: {
    apiFile: {
      alwaysIncludePattern: true,
      daysToKeep: 30,
      filename: 'logs/api.log',
      layout: { type: 'json' },
      type: 'dateFile',
    },
    console: {
      layout: { type: 'colored' },
      type: 'stdout',
    },
  },
  categories: {
    api: {
      appenders: [logType],
      level: logLevel,
    },
    default: {
      appenders: ['console'],
      level: 'ALL',
    },
  },
  pm2: isProd,
}

const sensitiveFields = [
  'body.password',
  'body.token',
  'headers.token',
]

const replaceSensitiveFields = (data) => {
  if (typeof data === 'string') {
    return { message: data }
  }

  return sensitiveFields.reduce((body, sensitiveField) => {
    const fieldPath = sensitiveField.split('.')
    const needToReplace = !isNil(path(fieldPath, body))

    if (needToReplace) {
      return assocPath(fieldPath, '*', body)
    }

    return body
  }, data)
}

const jsonLayout = () => logEvent => logEvent.data.map(data => JSON.stringify({
  time: logEvent.startTime,
  level: logEvent.level.levelStr,
  category: logEvent.categoryName,
  ...replaceSensitiveFields(data),
}))
  .join('\n')

log4js.addLayout('json', jsonLayout)
log4js.configure(log4jsConfig)
