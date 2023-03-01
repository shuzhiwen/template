import {config} from 'dotenv'

config()

export const env = {
  port: process.env.PORT || 80,
  db: {
    url: process.env.DB_URI || 'mongodb://127.0.0.1:27017',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
  mail: {
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  },
}
