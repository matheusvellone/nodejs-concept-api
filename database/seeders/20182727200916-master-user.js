const { AUTH } = require('../../src/constants')

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('users', [
    {
      id: 'cjt1jfbka0000kucxgkzhdu21',
      name: 'Master',
      login: 'master',
      email: 'my@email.com',
      password: '$2b$10$zzoC/Oik1FjJOMAuvPraruXHQrbgrOaWGXuCok0ReMnuLIFfOB7Fm',
      level: AUTH.LEVELS.MASTER,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]),

  down: queryInterface => queryInterface.bulkDelete('users', null),
}
