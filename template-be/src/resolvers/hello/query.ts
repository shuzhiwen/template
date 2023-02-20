import {QueryResolvers} from '../../generated/codegen'
import {requireAuth} from '../auth/jwt'
import {helloWorld} from '../mock'

export const queryResolvers: QueryResolvers<ApolloContext, AnyObject> = {
  hello: (_, __, ctx) => {
    requireAuth(ctx)
    return helloWorld
  },
}
