import {onError} from '@apollo/client/link/error'
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
import {useMe} from './me'

const HOST = 'localhost:80'

const GRAPHQL_SERVER = '/graphql'

const httpLink = new HttpLink({uri: GRAPHQL_SERVER})

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors || networkError) {
    console.error(graphQLErrors || networkError)
  }
})

function useClient() {
  const {token = ''} = useMe()
  const wsLink = new GraphQLWsLink(
    createClient({
      url: `ws://${HOST}${GRAPHQL_SERVER}`,
      connectionParams: {
        authorization: `Token ${token}`,
      },
    })
  )
  const authTokenLink = setContext(({operationName}, context) => {
    return {
      uri: `http://${HOST}${GRAPHQL_SERVER}/${operationName}`,
      headers: {
        ...context.headers,
        authorization: `Token ${token}`,
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

  return new ApolloClient({
    version: '1.0',
    cache: new InMemoryCache(),
    link: from([authTokenLink, errorLink, token ? networkLink : httpLink]),
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
}

export function ApolloProvider(props: PropsWithChildren) {
  const client = useClient()

  return (
    <RawApolloProvider client={client}>
      <>{props.children}</>
    </RawApolloProvider>
  )
}
