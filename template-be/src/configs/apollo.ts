import {createContext, createWsContext} from '@/configs'
import {introspection} from '@/generated'
import {resolvers} from '@/resolvers'
import {ApolloContext} from '@/types'
import {ApolloServer, ApolloServerPlugin} from '@apollo/server'
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import {koaMiddleware} from '@as-integrations/koa'
import {addMocksToSchema} from '@graphql-tools/mock'
import {makeExecutableSchema} from '@graphql-tools/schema'
import {buildClientSchema} from 'graphql'
import {Disposable} from 'graphql-ws'
import {useServer} from 'graphql-ws/lib/use/ws'
import http from 'http'
import {WebSocketServer} from 'ws'

const mocks = {
  Int: () => 8,
  Float: () => 3.45,
  String: () => 'Hello',
  Date: () => new Date(),
  Void: () => undefined,
}

const AutoCloseWebSocket = (disposable: Disposable): ApolloServerPlugin => ({
  serverWillStart: async () => ({
    drainServer: async () => await disposable.dispose(),
  }),
})

export async function createApolloServer(httpServer: http.Server) {
  const schema = makeExecutableSchema({
    typeDefs: buildClientSchema(introspection),
    resolvers,
  })
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })
  const apolloServer = new ApolloServer<ApolloContext>({
    schema: addMocksToSchema({
      mocks,
      schema,
      preserveResolvers: true,
    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({httpServer}),
      AutoCloseWebSocket(
        useServer({schema, context: createWsContext}, wsServer)
      ),
    ],
  })

  await apolloServer.start()

  return koaMiddleware<ApolloContext>(apolloServer, {
    context: async ({ctx}) => createContext(ctx),
  })
}
