import {Resolvers} from '../generated/codegen'
import {dateScalar, voidScalar} from './scalar'
import {mutationResolvers} from './auth/mutation'
import {
  queryResolvers as helloQuery,
  mutationResolvers as helloMutation,
  subscriptionResolvers as helloSubscription,
} from './hello'

export const resolvers: Resolvers = {
  Date: dateScalar,
  Void: voidScalar,
  Query: {
    ...helloQuery,
  },
  Mutation: {
    ...helloMutation,
    ...mutationResolvers,
  },
  Subscription: {
    ...helloSubscription,
  },
}
