const errorHandler = require('./errorHandler')
const apiLogger = require('./apiLogger')
const requestMetadata = require('./requestMetadata')
const auth = require('./auth')
const validate = require('./validator')

module.exports = {
  apiLogger,
  errorHandler,
  requestMetadata,
  validate,
  anyAuth: auth.any,
  adminAuth: auth.admin,
  clientAuth: auth.client,
  masterAuth: auth.master,
  multiAuth: auth.multi,
}
