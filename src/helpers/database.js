const { merge } = require('ramda')

const { sequelize } = require('../database')

const runInTransaction = fn => sequelize.transaction(fn)

const paginate = (
  model,
  dbOptions = {},
  paginationOptions = {}
) => {
  const { page = 1, limit = 10 } = paginationOptions
  const databaseOptions = merge(dbOptions, {
    limit,
    offset: page * limit,
  })

  return model.findAll(databaseOptions)
}

module.exports.runInTransaction = runInTransaction
module.exports.paginate = paginate
