import {FileModel, UserModel} from '@models'
import {ApolloContext} from '@types'
import {Context as WsContext} from 'graphql-ws'
import {Context} from 'koa'

export function createContext(ctx: Context): ApolloContext {
  return {
    token: ctx.headers.authorization?.split(/ /i)[1],
    userModel: new UserModel(),
    fileModel: new FileModel(),
  }
}

export function createWsContext(ctx: WsContext): ApolloContext {
  return {
    token: (ctx.connectionParams?.authorization as string)?.split(/ /i)[1],
    userModel: new UserModel(),
    fileModel: new FileModel(),
  }
}
