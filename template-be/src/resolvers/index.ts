import {Resolvers} from '../generated/codegen'
import {libraries, books} from './mock'
import {dateScalar} from './scalar'

export const resolvers: Resolvers = {
  Date: dateScalar,
  Query: {
    libraries() {
      return libraries
    },
  },
  Library: {
    books(parent) {
      return books.filter((book) => book.branch === parent.branch)
    },
  },
  Book: {
    author(parent) {
      return parent.author
    },
  },
}
