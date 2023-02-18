import {QueryResolvers} from '../generated/codegen'
import {requireAuth} from './auth'
import {helloWorld} from './mock'

export const queryResolvers: QueryResolvers<ApolloContext, AnyObject> = {
  hello: (_, __, ctx) => {
    requireAuth(ctx)
    return helloWorld
  },
}
