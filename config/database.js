require('../dotenv')
const { env } = require('./env')

const {
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DIALECT,
  DATABASE_DATABASE,
} = process.env

const config = {
  database: DATABASE_DATABASE,
  dialect: DATABASE_DIALECT,
  host: DATABASE_HOST,
  password: DATABASE_PASSWORD,
  seederStorage: 'sequelize',
  username: DATABASE_USERNAME,
}

module.exports = {
  [env]: config,
}
