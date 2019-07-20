const table = 'users'

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(table, {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      login: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      password: {
        type: DataTypes.TEXT,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      level: {
        type: DataTypes.ENUM('admin', 'master', 'client'),
        allowNull: false,
      },
      notification_token: {
        type: DataTypes.TEXT,
      },
      facebook_id: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    })
  },
}
