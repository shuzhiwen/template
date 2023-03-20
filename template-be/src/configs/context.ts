import {UserModel, FileModel} from '@models'
import {ApolloContext} from '@types'
import {Context} from 'koa'

export function createContext(ctx: Context): ApolloContext {
  return {
    token: ctx.headers.authorization?.split(' ')[1],
    userModel: new UserModel(),
    fileModel: new FileModel(),
  }
}
