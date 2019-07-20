const { Router } = require('express')

const {
  notificateUser,
} = require('../controllers/notification')
const { wrapAction } = require('../helpers/express')
const {
  masterAuth,
  validate,
} = require('../middlewares')
const {
  notificate: notificateSchema,
} = require('../validators/notification')

const router = Router()

router.post(
  '/notificate/user/:userId',
  validate(notificateSchema),
  masterAuth,
  wrapAction(notificateUser)
)

module.exports = router
