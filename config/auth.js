const { isProd } = require('./env')

const { JWT_SECRET } = process.env

module.exports = {
  jwt: {
    expiresIn: isProd ? '1d' : '1y',
    issuer: 'api.example.com',
    secret: JWT_SECRET,
  },
}
