/* eslint-disable */
import {gql} from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: number
  Void: undefined
}

export type HelloQueryVariables = Exact<{[key: string]: never}>

export type HelloQuery = {__typename?: 'Query'; hello: string}

export type LoginMutationVariables = Exact<{
  account?: InputMaybe<Scalars['String']>
  password?: InputMaybe<Scalars['String']>
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: {__typename?: 'AuthInfo'; token: string; userId: string}
}

export type SetHelloMutationVariables = Exact<{
  hello?: InputMaybe<Scalars['String']>
}>

export type SetHelloMutation = {__typename?: 'Mutation'; setHello: boolean}

export type HelloWsSubscriptionVariables = Exact<{
  key?: InputMaybe<Scalars['String']>
}>

export type HelloWsSubscription = {__typename?: 'Subscription'; helloWs: string}

export const HelloDocument = gql`
  query hello {
    hello
  }
`

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(
  baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options)
}
export function useHelloLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options)
}
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>
export const LoginDocument = gql`
  mutation login($account: String, $password: String) {
    login(account: $account, password: $password) {
      token
      userId
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      account: // value for 'account'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
export const SetHelloDocument = gql`
  mutation setHello($hello: String) {
    setHello(hello: $hello)
  }
`
export type SetHelloMutationFn = Apollo.MutationFunction<
  SetHelloMutation,
  SetHelloMutationVariables
>

/**
 * __useSetHelloMutation__
 *
 * To run a mutation, you first call `useSetHelloMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetHelloMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setHelloMutation, { data, loading, error }] = useSetHelloMutation({
 *   variables: {
 *      hello: // value for 'hello'
 *   },
 * });
 */
export function useSetHelloMutation(
  baseOptions?: Apollo.MutationHookOptions<SetHelloMutation, SetHelloMutationVariables>
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<SetHelloMutation, SetHelloMutationVariables>(SetHelloDocument, options)
}
export type SetHelloMutationHookResult = ReturnType<typeof useSetHelloMutation>
export type SetHelloMutationResult = Apollo.MutationResult<SetHelloMutation>
export type SetHelloMutationOptions = Apollo.BaseMutationOptions<
  SetHelloMutation,
  SetHelloMutationVariables
>
export const HelloWsDocument = gql`
  subscription helloWs($key: String) {
    helloWs(key: $key)
  }
`

/**
 * __useHelloWsSubscription__
 *
 * To run a query within a React component, call `useHelloWsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useHelloWsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloWsSubscription({
 *   variables: {
 *      key: // value for 'key'
 *   },
 * });
 */
export function useHelloWsSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<HelloWsSubscription, HelloWsSubscriptionVariables>
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useSubscription<HelloWsSubscription, HelloWsSubscriptionVariables>(
    HelloWsDocument,
    options
  )
}
export type HelloWsSubscriptionHookResult = ReturnType<typeof useHelloWsSubscription>
export type HelloWsSubscriptionResult = Apollo.SubscriptionResult<HelloWsSubscription>
