import {MutationResolvers} from '../generated/codegen'
import {login, requireAuth} from './auth'
import {pubsub} from './mock'

export const mutationResolvers: MutationResolvers<ApolloContext, AnyObject> = {
  login: (_, args) => login(args),

  setHello: (_, args, ctx) => {
    requireAuth(ctx)
    if (args.hello) {
      pubsub.publish('HELLO', args.hello)
      return true
    }
    return false
  },
}
