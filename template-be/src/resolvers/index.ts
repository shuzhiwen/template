import {get} from 'lodash'
import {PubSub, withFilter} from 'graphql-subscriptions'
import {dateScalar, voidScalar} from './scalar'
import {Resolvers} from '../generated/codegen'
import {helloWorld} from './mock'

const pubsub = new PubSub()

export const resolvers: Resolvers = {
  Date: dateScalar,
  Void: voidScalar,
  Query: {
    hello: () => helloWorld,
  },
  Mutation: {
    setHello: (_, args) => {
      if (args.hello) {
        pubsub.publish('HELLO', args.hello)
        return true
      }
      return false
    },
  },
  Subscription: {
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
  },
}
