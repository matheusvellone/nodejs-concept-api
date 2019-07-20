const {
  applySpec,
  prop,
} = require('ramda')

module.exports = applySpec({
  id: prop('id'),
  name: prop('name'),
  level: prop('level'),
  active: prop('active'),
})
