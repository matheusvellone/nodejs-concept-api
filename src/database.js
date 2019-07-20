const Sequelize = require('sequelize')
const {
  forEachObjIndexed,
} = require('ramda')

const models = {}
module.exports.models = models

const {
  DATABASE_DATABASE,
  DATABASE_DIALECT,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
} = process.env

const sequelizeConfig = {
  database: DATABASE_DATABASE,
  define: {
    createdAt: 'created_at',
    deletedAt: 'deleted_at',
    timestamps: true,
    updatedAt: 'updated_at',
  },
  dialect: DATABASE_DIALECT,
  host: DATABASE_HOST,
  logging: false,
  password: DATABASE_PASSWORD,
  pool: {
    acquire: 20000,
    handleDisconnects: true,
    idle: 60000,
  },
  username: DATABASE_USERNAME,
}

const sequelize = new Sequelize(sequelizeConfig)

// Can't be a `map`. Hooks are importing models, and need to export object so they can use them
forEachObjIndexed(
  (entity, name) => {
    const model = sequelize.import(name, entity)

    models[name] = model
  },
  require('./models')
)

forEachObjIndexed((entity) => {
  if (entity.associate) {
    entity.associate(models)
  }
}, models)

module.exports.operators = Sequelize.Op
module.exports.sequelize = sequelize
module.exports.connect = logger => sequelize.authenticate()
  .tap(() => logger.debug('Successfully connected to database'))
  .tapCatch(error => logger.fatal('Failed to connect to postgres', error))
