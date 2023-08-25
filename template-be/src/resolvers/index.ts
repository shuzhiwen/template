import {Resolvers} from '@generated'
import {authMutation} from './auth/mutation'
import {helloMutation, helloQuery, helloSubscription} from './hello'
import {dateScalar, voidScalar} from './scalar'

export * from './auth/jwt'

export const resolvers: Resolvers = {
  Date: dateScalar,
  Void: voidScalar,
  Query: Object.assign(helloQuery),
  Mutation: Object.assign(helloMutation, authMutation),
  Subscription: Object.assign(helloSubscription),
}
