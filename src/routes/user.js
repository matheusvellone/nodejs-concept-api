const { Router } = require('express')

const {
  list,
  updateNotificationToken,
} = require('../controllers/user')
const { wrapAction } = require('../helpers/express')
const {
  clientAuth,
  masterAuth,
  validate,
} = require('../middlewares')
const {
  updateNotificationToken: updateNotificationTokenSchema,
} = require('../validators/user')

const router = Router()

router.post(
  '/user/notification/token',
  validate(updateNotificationTokenSchema),
  clientAuth,
  wrapAction(updateNotificationToken)
)

router.get(
  '/users',
  masterAuth,
  wrapAction(list)
)

module.exports = router
