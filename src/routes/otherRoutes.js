const { Router } = require('express')
const { wrapAction } = require('../helpers/express')

const router = Router()

const status = () => {
  const now = new Date()
  return {
    body: {
      datetime: now.toISOString(),
      message: 'status.ok',
    },
    statusCode: 200,
  }
}

const robots = () => ({
  body: 'robots.txt',
  headers: {
    'Content-Type': 'text/plain',
  },
  statusCode: 200,
})

router.get('/status', wrapAction(status))
router.get('/robots.txt', wrapAction(robots))

module.exports = router
