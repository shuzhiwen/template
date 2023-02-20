import {get} from 'lodash'
import {withFilter} from 'graphql-subscriptions'
import {SubscriptionResolvers} from '../../generated/codegen'
import {pubsub} from '../mock'

export const subscriptionResolvers: SubscriptionResolvers<ApolloContext, AnyObject> = {
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
