const { lensPath, view, set } = require('ramda')
const i18n = require('../helpers/I18n')

const translateBody = (translate, body, language) => {
  const i18nInstance = i18n.getInstance(language)

  if (typeof body === 'string') {
    return i18nInstance.translate(body)
  }

  return translate.reduce((oldBody, keyTranslatePath) => {
    const path = lensPath(keyTranslatePath)

    const value = view(path, oldBody)
    const translated = i18nInstance.translate(value)

    return set(path, translated, oldBody)
  }, body)
}

const getRequestLanguage = (req) => {
  const language = req.headers['accept-language']

  return i18n.getLanguageOrDefault(language)
}

module.exports = (req, res, next) => {
  const toTranslate = [['message']]
  res.translate = (keyPath) => {
    toTranslate.push(keyPath)
    return res
  }

  const { send } = res
  res.send = (responseBody) => {
    const language = getRequestLanguage(req)
    const translatedBody = translateBody(toTranslate, responseBody, language)

    res.set('Content-Language', language)
    res.send = send
    return res.send(translatedBody)
  }

  next()
}
