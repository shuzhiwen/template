import http from 'http'
import {readFileSync} from 'fs'
import {WebSocketServer} from 'ws'
import {Disposable} from 'graphql-ws'
import {useServer} from 'graphql-ws/lib/use/ws'
import {koaMiddleware} from '@as-integrations/koa'
import {ApolloServer, ApolloServerPlugin} from '@apollo/server'
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import {makeExecutableSchema} from '@graphql-tools/schema'
import {addMocksToSchema} from '@graphql-tools/mock'
import {resolvers} from '../resolvers'

const typeDefs = readFileSync('src/schema/index.gql', {encoding: 'utf-8'})

function AutoClose(disposable: Disposable): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await disposable.dispose()
        },
      }
    },
  }
}

async function onConnect(ctx: AnyObject) {
  if (!ctx.connectionParams?.token) {
    throw new Error('Auth token missing!')
  }
}

export async function createApolloServer(httpServer: http.Server) {
  const schema = makeExecutableSchema({typeDefs, resolvers})
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })
  const apolloServer = new ApolloServer<ApolloContext>({
    schema: addMocksToSchema({schema, preserveResolvers: true}),
    plugins: [
      ApolloServerPluginDrainHttpServer({httpServer}),
      AutoClose(useServer({schema, onConnect}, wsServer)),
    ],
  })

  await apolloServer.start()

  return koaMiddleware<ApolloContext>(apolloServer, {
    context: async ({ctx}) => ({token: ctx.headers.token as string}),
  })
}
