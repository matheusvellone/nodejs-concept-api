const { join } = require('path')
const i18n = require('i18n')
const log4js = require('log4js')
const { assoc } = require('ramda')

const i18nConfig = require('../../../config/i18n')

const logger = log4js.getLogger('api')

const i18nBaseConfig = {
  directory: join(__dirname, 'locales'),
  indent: '  ',
  locales: i18nConfig.validLocales,
  objectNotation: true,
  syncFiles: true,
}

const normalizeTranslateInput = (key, data = {}) => {
  if (typeof key === 'object') {
    return normalizeTranslateInput(key.key, key.data)
  }
  return {
    data,
    key,
  }
}
const instances = {}

module.exports.getInstance = (language) => {
  if (!instances[language]) {
    const instance = {
      translate(...params) {
        const { key, data } = normalizeTranslateInput(...params)
        // eslint-disable-next-line no-underscore-dangle
        const translated = this.__(key, data)

        if (translated === key) {
          logger.warn({
            data,
            key,
            message: 'Response not translated',
          })
        }

        return translated
      },
    }

    const i18nInstanceConfig = assoc('register', instance, i18nBaseConfig)
    i18n.configure(i18nInstanceConfig)
    instance.setLocale(language)

    instances[language] = instance
  }
  return instances[language]
}

module.exports.getLanguageOrDefault = (language) => {
  if (language && i18nConfig.locales.includes(language)) {
    return language
  }

  return i18nConfig.default
}
