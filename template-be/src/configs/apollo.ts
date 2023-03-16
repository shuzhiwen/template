import http from 'http'
import {Context} from 'koa'
import {WebSocketServer} from 'ws'
import {Disposable} from 'graphql-ws'
import {buildClientSchema} from 'graphql'
import {useServer} from 'graphql-ws/lib/use/ws'
import {koaMiddleware} from '@as-integrations/koa'
import {addMocksToSchema} from '@graphql-tools/mock'
import {makeExecutableSchema} from '@graphql-tools/schema'
import {ApolloServer, ApolloServerPlugin} from '@apollo/server'
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import {FileModel, UserModel} from '@models'
import {introspection} from '@generated'
import {ApolloContext} from '@types'
import {resolvers} from '@resolvers'

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

export const createContext = (ctx: Context) => ({
  token: ctx.headers.authorization?.split(' ')[1],
  userModel: new UserModel(),
  fileModel: new FileModel(),
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
      AutoCloseWebSocket(useServer({schema}, wsServer)),
    ],
  })

  await apolloServer.start()

  return koaMiddleware<ApolloContext>(apolloServer, {
    context: async ({ctx}) => createContext(ctx),
  })
}
