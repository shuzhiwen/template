import {Resolvers} from '../generated'
import {dateScalar, voidScalar} from './scalar'
import {helloQuery, helloMutation, helloSubscription} from './hello'
import {authMutation} from './auth/mutation'

export * from './auth/jwt'
export * from './mock'

export const resolvers: Resolvers = {
  Date: dateScalar,
  Void: voidScalar,
  Query: Object.assign(helloQuery),
  Mutation: Object.assign(helloMutation, authMutation),
  Subscription: Object.assign(helloSubscription),
}
