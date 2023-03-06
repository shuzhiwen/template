import {IntrospectionQuery} from 'graphql'
import json from './introspection.json'

export const introspection = json as unknown as IntrospectionQuery
export * from './apollo'
