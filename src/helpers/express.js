const {
  forEach,
  toPairs,
} = require('ramda')

module.exports.wrapAction = action => async (req, res, next) => {
  try {
    const response = await action(req)

    if (!response.statusCode) {
      throw new Error('Missing statusCode in response')
    }

    const {
      statusCode,
      body = {},
    } = response

    if (response.headers) {
      forEach(([key, value]) => {
        res.set(key, value)
      }, toPairs(response.headers))
    }

    res.body = body

    res.status(statusCode).send(body)
  } catch (error) {
    next(error)
  }
}
