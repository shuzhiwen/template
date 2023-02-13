import http from 'http'
import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import {createApolloServer} from './apollo'

const PORT = 4000

export async function createKoaServer() {
  const app = new Koa()
  const httpServer = http.createServer(app.callback())
  const apolloPlugin = await createApolloServer(httpServer)

  app.use(cors())
  app.use(bodyParser())
  app.use(apolloPlugin)

  await httpServer.listen({port: PORT}, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`)
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`)
  })
}
