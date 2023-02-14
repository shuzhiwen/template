import {createClient} from 'graphql-ws'
import {PropsWithChildren} from 'react'
import {OperationDefinitionNode} from 'graphql'
import {getMainDefinition} from '@apollo/client/utilities'
import {GraphQLWsLink} from '@apollo/client/link/subscriptions'
import {setContext} from '@apollo/client/link/context'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as RawApolloProvider,
  HttpLink,
  split,
  from,
} from '@apollo/client'

const httpLink = new HttpLink({
  uri: '/graphql',
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
    connectionParams: {
      token: 'some_token',
      key: 'test',
    },
  })
)

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
  link: from([authTokenLink, networkLink]),
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
