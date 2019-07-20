const { NODE_ENV } = process.env

module.exports.isProd = NODE_ENV === 'production'
module.exports.env = NODE_ENV
