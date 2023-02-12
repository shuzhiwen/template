import http from 'http'
import {ApolloServer} from '@apollo/server'
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import {resolvers} from '../resolvers'
import {typeDefs} from '../schema'

export async function createApolloServer(httpServer: http.Server) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
  })

  await server.start()

  return server
}
