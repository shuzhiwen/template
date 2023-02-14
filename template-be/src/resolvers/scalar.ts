import {GraphQLScalarType, Kind} from 'graphql'

export const voidScalar = new GraphQLScalarType({
  name: 'Void',
  description: 'Void custom scalar type',
  serialize() {
    return undefined
  },
  parseValue() {
    return undefined
  },
  parseLiteral() {
    return undefined
  },
})

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime()
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object')
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value)
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`')
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10))
    }
    return null
  },
})
