import {Resolvers} from '../generated/codegen'
import {dateScalar} from './scalar'
import {helloWorld} from './mock'

export const resolvers: Resolvers = {
  Date: dateScalar,
  Query: {
    hello: () => helloWorld,
  },
}
