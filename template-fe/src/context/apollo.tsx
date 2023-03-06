import {onError} from '@apollo/client/link/error'
import {setContext} from '@apollo/client/link/context'
import {GraphQLWsLink} from '@apollo/client/link/subscriptions'
import {getMainDefinition} from '@apollo/client/utilities'
import {OperationDefinitionNode} from 'graphql'
import {createClient} from 'graphql-ws'
import {PropsWithChildren} from 'react'
import {authTokenStorage} from './me'
import {
  ApolloClient,
  ApolloProvider as RawApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'

const HOST = 'localhost:80'
const GRAPHQL_SERVER = '/graphql'

const httpLink = new HttpLink({uri: GRAPHQL_SERVER})

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${HOST}${GRAPHQL_SERVER}`,
    connectionParams: {
      key: 'test',
    },
  })
)

const authTokenLink = setContext(({operationName}, context) => {
  return {
    uri: `http://${HOST}${GRAPHQL_SERVER}/${operationName}`,
    headers: {
      ...context.headers,
      Authorization: `Token ${authTokenStorage.get()}`,
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

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors || networkError) {
    alert(graphQLErrors?.[0].message || networkError?.message)
  }
})

const client = new ApolloClient({
  version: '1.0',
  cache: new InMemoryCache(),
  link: from([authTokenLink, errorLink, networkLink]),
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
  return (
    <RawApolloProvider client={client}>
      <>{props.children}</>
    </RawApolloProvider>
  )
}
