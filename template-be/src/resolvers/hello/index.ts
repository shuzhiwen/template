import {
  MutationResolvers,
  QueryResolvers,
  SubscriptionResolvers,
} from '@/generated'
import {ApolloContext} from '@/types'
import {PubSub, withFilter} from 'graphql-subscriptions'
import {requireAuth} from '../auth/jwt'

const helloWorld = 'Template is now available!'

const pubsub = new PubSub()

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

export const helloSubscription: SubscriptionResolvers = {
  helloWs: {
    resolve: (payload: string) => payload,
    subscribe: (_, __, ctx) => ({
      [Symbol.asyncIterator]: withFilter(
        () => pubsub.asyncIterator(['HELLO']),
        () => !!ctx.token
      ),
    }),
  },
}
