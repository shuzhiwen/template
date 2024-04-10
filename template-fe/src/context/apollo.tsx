import {useToken} from '@/helpers'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider as RawApolloProvider,
  from,
  split,
} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {onError} from '@apollo/client/link/error'
import {GraphQLWsLink} from '@apollo/client/link/subscriptions'
import {getMainDefinition} from '@apollo/client/utilities'
import {OperationDefinitionNode} from 'graphql'
import {createClient} from 'graphql-ws'
import {PropsWithChildren} from 'react'
import {GRAPHQL_ROUTE, HTTP_URL, WEBSOCKET_URL} from './constant'

function useClient() {
  const [token, setToken] = useToken()
  const httpLink = new HttpLink({
    uri: GRAPHQL_ROUTE,
  })
  const wsLink = new GraphQLWsLink(
    createClient({
      url: WEBSOCKET_URL,
      connectionParams: {
        authorization: token,
      },
    })
  )
  const authTokenLink = setContext(({operationName}, context) => {
    return {
      uri: `${HTTP_URL}/${operationName}`,
      headers: {
        ...context.headers,
        authorization: token,
      },
    }
  })
  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors || networkError) {
      console.error(graphQLErrors || networkError)
      if (
        graphQLErrors?.some(
          ({extensions}) => extensions.code === 'AUTHENTICATION_ERROR'
        )
      ) {
        setToken(null)
      }
    }
  })
  const networkLink = split(
    ({query}) => {
      const {kind, operation} = getMainDefinition(
        query
      ) as OperationDefinitionNode
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
  return (
    <RawApolloProvider client={useClient()}>
      <>{props.children}</>
    </RawApolloProvider>
  )
}
