export const env = {
  port: process.env.PORT || 10010,
  db: {
    url: process.env.DB_URI || 'mongodb://127.0.0.1:27017',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret-key',
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.qq.com',
    auth: {
      user: process.env.MAIL_USER || 'yuwenmiao@qq.com',
      pass: process.env.MAIL_PASS || 'pcihaczthyyxcbcf',
    },
  },
}
