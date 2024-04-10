import {FileModel, UserModel} from '@/models'
import {ApolloContext} from '@/types'
import {Context as WsContext} from 'graphql-ws'
import {Context} from 'koa'

const createModelContext = () => ({
  fileModel: new FileModel(),
  userModel: new UserModel(),
})

export function createContext(ctx: Context): ApolloContext {
  return {
    token: ctx.headers.authorization,
    ...createModelContext(),
  }
}

export function createWsContext(ctx: WsContext): ApolloContext {
  return {
    token: ctx.connectionParams?.authorization as string,
    ...createModelContext(),
  }
}
