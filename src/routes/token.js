const { Router } = require('express')

const {
  check,
  refresh,
} = require('../controllers/token')
const { wrapAction } = require('../helpers/express')
const { anyAuth } = require('../middlewares')

const router = Router()

router.get(
  '/token/refresh',
  anyAuth,
  wrapAction(refresh)
)
router.get(
  '/token/check',
  anyAuth,
  wrapAction(check)
)

module.exports = router
