const i18nMiddleware = require('./i18n')
const errorHandler = require('./errorHandler')
const apiLogger = require('./apiLogger')
const requestMetadata = require('./requestMetadata')
const auth = require('./auth')
const validate = require('./validator')

module.exports = {
  apiLogger,
  errorHandler,
  i18nMiddleware,
  requestMetadata,
  validate,
  anyAuth: auth.any,
  adminAuth: auth.admin,
  clientAuth: auth.client,
  masterAuth: auth.master,
  multiAuth: auth.multi,
}
