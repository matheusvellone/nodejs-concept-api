const {
  applySpec,
  prop,
} = require('ramda')

module.exports.firebase = applySpec({
  body: prop('body'),
  click_action: prop('clickAction'),
  icon: prop('icon'),
  title: prop('title'),
})
