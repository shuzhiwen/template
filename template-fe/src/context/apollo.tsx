import {setContext} from '@apollo/client/link/context'
import {GraphQLWsLink} from '@apollo/client/link/subscriptions'
import {getMainDefinition} from '@apollo/client/utilities'
import {OperationDefinitionNode} from 'graphql'
import {createClient} from 'graphql-ws'
import {PropsWithChildren} from 'react'
import {
  ApolloClient,
  ApolloProvider as RawApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'

const GRAPHQL_SERVER = '/graphql'

const httpLink = new HttpLink({uri: GRAPHQL_SERVER})

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://localhost:4000${GRAPHQL_SERVER}`,
    connectionParams: {
      token: 'some_token',
      key: 'test',
    },
  })
)

const urlLink = setContext((operation) => {
  return {
    uri: `${GRAPHQL_SERVER}/${operation.operationName}`,
  }
})

const authTokenLink = setContext((_, context) => {
  return {
    headers: {
      ...context.headers,
      Authorization: 'Token some_token',
    },
  }
})

const networkLink = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query) as OperationDefinitionNode
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  version: '1.0',
  cache: new InMemoryCache(),
  link: from([urlLink, authTokenLink, networkLink]),
  defaultOptions: {
    mutate: {
      errorPolicy: 'none',
      fetchPolicy: 'no-cache',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
    },
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'no-cache',
    },
  },
})

export function ApolloProvider(props: PropsWithChildren<unknown>) {
  return <RawApolloProvider client={client}>{props.children}</RawApolloProvider>
}
