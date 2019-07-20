module.exports = {
  from: 'no-reply@example.com',
  transport: {
    auth: {
      pass: process.env.EMAIL_PASSWORD,
      user: 'contato@example.com',
    },
    host: 'webmail.example.com',
    port: 465,
    secure: true,
  },
}
