module.exports = {
  internalError: 1,
  validationError: 1000,
  notFound: {
    generic: 1100,
    url: 1101,
    user: 1102,
  },
  conflict: {
    generic: 1200,
    user: 1201,
  },
  invalid: {
    generic: 1300,
    body: 1301,
    jwt: 1302,
    password: 1303,
    facebookToken: 1304,
  },
  mismatch: {
    generic: 1400,
  },
  unauthorized: {
    generic: 1500,
    'empty-token': 1501,
    'jwt-invalid': 1502,
  },
  limitExceeded: {
    generic: 1600,
  },
  forbidden: {
    generic: 1700,
    jwt: 1701,
    'jwt.level': 1702,
  },
}
