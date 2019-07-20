const axios = require('axios')

const {
  FIREBASE_SERVER_KEY,
} = process.env

module.exports.sendNotification = (notificationToken, payload) => axios.post(
  'https://fcm.googleapis.com/fcm/send',
  {
    notification: payload,
    to: notificationToken,
  },
  {
    headers: {
      Authorization: `key=${FIREBASE_SERVER_KEY}`,
    },
  }
)
