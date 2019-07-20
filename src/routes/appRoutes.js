const { Router } = require('express')

const authRouter = require('./auth')
const tokenRouter = require('./token')
const userRouter = require('./user')
const notificationRouter = require('./notification')

const { apiLogger } = require('../middlewares/index')

const router = Router()

router.use(apiLogger, authRouter)
router.use(apiLogger, tokenRouter)
router.use(apiLogger, userRouter)
router.use(apiLogger, notificationRouter)

module.exports = router
