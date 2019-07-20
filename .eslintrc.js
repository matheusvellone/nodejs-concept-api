module.exports = {
  env: {
    es6: true,
    node: true,
    "jest/globals": true,
  },
  plugins: [
    'jest',
  ],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'script',
  },
  extends: 'matheusvellone-base/backend',
  rules: {
    strict: ['error', 'never'],
  },
}
