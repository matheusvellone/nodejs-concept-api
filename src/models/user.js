const cuid = require('cuid')

const { AUTH } = require('../constants')

const userLevels = Object.values(AUTH.LEVELS)

const config = {
  tableName: 'users',
  paranoid: true,
}

const getFields = DataTypes => ({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: cuid,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING(30),
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(60),
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  level: {
    type: DataTypes.ENUM(...userLevels),
    allowNull: false,
  },
  notification_token: {
    type: DataTypes.TEXT,
  },
  facebook_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE,
})

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'user',
    getFields(DataTypes),
    config
  )

  return model
}
