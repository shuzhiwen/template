import {get} from 'lodash'
import {ApolloContext} from '@types'
import {withFilter} from 'graphql-subscriptions'
import {QueryResolvers, MutationResolvers, SubscriptionResolvers} from '@generated'
import {helloWorld, pubsub} from '../mock'
import {requireAuth} from '../auth/jwt'

export const helloQuery: QueryResolvers<ApolloContext> = {
  hello: async (_, __, ctx) => {
    await requireAuth(ctx)
    return helloWorld
  },
}

export const helloMutation: MutationResolvers<ApolloContext> = {
  sayHello: async (_, args, ctx) => {
    await requireAuth(ctx)
    if (args.hello) {
      pubsub.publish('HELLO', args.hello)
      return true
    }
    return false
  },
}

export const helloSubscription: SubscriptionResolvers<ApolloContext> = {
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
