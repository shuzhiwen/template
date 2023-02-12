import cors from '@koa/cors'
import http from 'http'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import {koaMiddleware} from '@as-integrations/koa'
import {createApolloServer} from './apollo'

export async function createKoaServer() {
  const app = new Koa()
  const httpServer = http.createServer(app.callback())
  const apolloServer = await createApolloServer(httpServer)

  app.use(cors())
  app.use(bodyParser())
  app.use(
    koaMiddleware(apolloServer, {
      context: async ({ctx}) => ({token: ctx.headers.token}),
    })
  )

  await httpServer.listen({port: 4000})

  console.log('🚀 Server ready at http://localhost:4000')
}
