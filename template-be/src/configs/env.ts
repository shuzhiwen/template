import {config} from 'dotenv'
import {env as ne} from 'process'

config()

export const env = {
  port: ne.PORT || 80,
  host: ne.HOST || 'http://localhost',
  db: {
    url: ne.DB_URL || 'mongodb://127.0.0.1:27017',
  },
  auth: {
    secret: ne.JWT_SECRET || 'secret',
  },
  file: {
    route: {
      static: ne.FILE_ROUTE_STATIC || '/files',
      upload: ne.FILE_ROUTE_UPLOAD || '/upload',
    },
    path: {
      request: ne.FILE_PATH_REQUEST || 'temp/request',
      storage: ne.FILE_PATH_STORAGE || 'temp/storage',
      uploads: ne.FILE_PATH_UPLOADS || 'temp/uploads',
    },
    time: {
      cleanup: ne.FILE_CLEANUP_INTERVAL || 24 * 60 * 60 * 1000,
      reserve: ne.FILE_RESERVE_DURATION || 30 * 24 * 60 * 60 * 1000,
    },
  },
  mail: {
    host: ne.MAIL_HOST,
    auth: {
      user: ne.MAIL_USER,
      pass: ne.MAIL_PASS,
    },
  },
  https: {
    key: ne.SSL_KEY,
    cert: ne.SSL_CERT,
  },
}
