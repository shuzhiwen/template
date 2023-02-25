import {get} from 'lodash'
import {withFilter} from 'graphql-subscriptions'
import {QueryResolvers, MutationResolvers, SubscriptionResolvers} from '../../generated'
import {requireAuth} from '../auth/jwt'
import {helloWorld, pubsub} from '../mock'

export const helloQuery: QueryResolvers<ApolloContext, AnyObject> = {
  hello: async (_, __, ctx) => {
    await requireAuth(ctx)
    return helloWorld
  },
}

export const helloMutation: MutationResolvers<ApolloContext, AnyObject> = {
  sayHello: async (_, args, ctx) => {
    await requireAuth(ctx)
    if (args.hello) {
      pubsub.publish('HELLO', args.hello)
      return true
    }
    return false
  },
}

export const helloSubscription: SubscriptionResolvers<ApolloContext, AnyObject> = {
  helloWs: {
    resolve: (payload: string) => payload,
    subscribe: () => ({
      [Symbol.asyncIterator]: withFilter(
        () => pubsub.asyncIterator(['HELLO']),
        (payload, variables) => {
          return get(payload, 'key') === get(variables, 'key')
        }
      ),
    }),
  },
}
