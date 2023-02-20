import {MutationResolvers} from '../../generated/codegen'
import {requireAuth} from '../auth/jwt'
import {pubsub} from '../mock'

export const mutationResolvers: MutationResolvers<ApolloContext, AnyObject> = {
  sayHello: (_, args, ctx) => {
    requireAuth(ctx)
    if (args.hello) {
      pubsub.publish('HELLO', args.hello)
      return true
    }
    return false
  },
}
