import Koa from 'koa'
import http from 'http'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import {createApolloServer} from './apollo'
import {env} from './env'

export async function createKoaServer() {
  const app = new Koa()
  const httpServer = http.createServer(app.callback())
  const apolloPlugin = await createApolloServer(httpServer)

  app.use(cors())
  app.use(bodyParser())
  app.use(apolloPlugin)

  await httpServer.listen({port: env.port}, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:${env.port}/graphql`)
    console.log(`🚀 Subscription endpoint ready at ws://localhost:${env.port}/graphql`)
  })
}
