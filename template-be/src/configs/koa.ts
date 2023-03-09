import Koa from 'koa'
import http from 'http'
import path from 'path'
import cors from '@koa/cors'
import multer from '@koa/multer'
import Router from '@koa/router'
import bodyParser from 'koa-bodyparser'
import {createApolloServer} from './apollo'
import {randomFileName} from '@utils'
import {FileModel} from '@models'
import {env} from './env'

const supportedFileTypes = ['image/png', 'image/jpg', 'image/jpeg']

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  storage: multer.diskStorage({
    destination: function (_, __, callback) {
      callback(null, path.join('temp/uploads'))
    },
    filename: function (_, file, callback) {
      callback(null, randomFileName(file.originalname))
    },
  }),
  fileFilter: (_, file, callback) => {
    if (supportedFileTypes.includes(file.mimetype)) {
      callback(null, true)
    } else {
      return callback(new Error('Not supported file type'), false)
    }
  },
})

const staticFileService = (model: FileModel) => async (ctx: Koa.Context) => {
  ctx.body = await model.requestFile(path.basename(ctx.path))
  ctx.type = path.extname(ctx.path)
}

const uploadService = async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next()
    ctx.body = (ctx.files as multer.File[]).map((file) => file.filename)
    ctx.status = 200
  } catch (error) {
    ctx.body = (error as Error).message
    ctx.status = 400
  }
}

export async function createKoaServer() {
  const app = new Koa()
  const httpServer = http.createServer(app.callback())
  const router = new Router()

  router.get('/files(.*)', staticFileService(new FileModel()))
  router.put('/upload(.*)', uploadService, upload.array('files', 100))

  app.use(cors())
  app.use(bodyParser())
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.use(await createApolloServer(httpServer))

  httpServer.listen({port: env.port}, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:${env.port}`)
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${env.port}`)
  })
}
