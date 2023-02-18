export const env = {
  port: process.env.PORT || 4000,
  db: {
    url: process.env.DB_URI || 'mongodb://127.0.0.1:27017',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret-key',
  },
}
