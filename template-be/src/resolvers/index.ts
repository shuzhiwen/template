import {dateScalar, voidScalar} from './scalar'
import {queryResolvers} from './query'
import {mutationResolvers} from './mutation'
import {subscriptionResolvers} from './subscription'
import {Resolvers} from '../generated/codegen'

export const resolvers: Resolvers = {
  Date: dateScalar,
  Void: voidScalar,
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Subscription: subscriptionResolvers,
}
