const bcrypt = require('bcrypt')

const { SALT } = process.env

module.exports.hashPassword = string => bcrypt.hash(string, SALT)

module.exports.checkHashPassword = bcrypt.compare
