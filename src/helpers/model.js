const { curry } = require('ramda')
const ConflictError = require('../Errors/Conflict')
const NotFoundError = require('../Errors/NotFound')

module.exports.checkConflict = curry((modelName, err) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    throw new ConflictError(modelName)
  }
  throw err
})

module.exports.checkExists = curry((modelName, result) => {
  if (!result) {
    throw new NotFoundError(modelName)
  }
})
