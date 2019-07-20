const uuid = require('uuid/v4')
const {
  applySpec,
  pipe,
  prop,
} = require('ramda')

const jwtUser = applySpec({
  id: prop('id'),
  level: prop('level'),
  name: prop('name'),
})

module.exports = applySpec({
  id: () => uuid(),
  user: pipe(prop('user'), jwtUser),
})
