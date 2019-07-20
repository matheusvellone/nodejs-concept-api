const { Router } = require('express')

const {
  socialLogin,
  login,
} = require('../controllers/auth')
const { wrapAction } = require('../helpers/express')
const { validate } = require('../middlewares')
const {
  login: loginSchema,
  socialLogin: socialLoginSchema,
} = require('../validators/auth')

const router = Router()

router.post(
  '/auth/login',
  validate(loginSchema),
  wrapAction(login)
)

router.post(
  '/auth/social/:name',
  validate(socialLoginSchema),
  wrapAction(socialLogin)
)

module.exports = router
