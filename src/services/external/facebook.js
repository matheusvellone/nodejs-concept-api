const axios = require('axios')

const InvalidError = require('../../Errors/Invalid')

const {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
} = process.env

const getAppAccessToken = async () => {
  const response = await axios.get(
    'https://graph.facebook.com/oauth/access_token',
    {
      params: {
        client_id: FACEBOOK_APP_ID,
        client_secret: FACEBOOK_APP_SECRET,
        grant_type: 'client_credentials',
      },
    }
  )

  return response.data.access_token
}

module.exports.decodeToken = async (token) => {
  const accessToken = await getAppAccessToken()

  const debugTokenResponse = await axios.get(
    'https://graph.facebook.com/debug_token',
    {
      params: {
        access_token: accessToken,
        input_token: token,
      },
    }
  )

  if (!debugTokenResponse.data.data.is_valid) {
    throw new InvalidError('facebookToken')
  }

  const userDataResponse = await axios.get(
    `https://graph.facebook.com/${debugTokenResponse.data.data.user_id}`,
    {
      params: {
        access_token: token,
        fields: 'name,email',
      },
    }
  )

  return {
    expiresAt: debugTokenResponse.data.data.expires_at * 1000,
    userId: debugTokenResponse.data.data.user_id,
    name: userDataResponse.data.name,
    email: userDataResponse.data.email,
  }
}
