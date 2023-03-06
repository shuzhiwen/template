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

export type LoginByEmailMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
}>

export type LoginByEmailMutation = {
  __typename?: 'Mutation'
  loginByEmail: {__typename?: 'AuthInfo'; userId: string; token: string}
}

export type SayHelloMutationVariables = Exact<{
  hello?: InputMaybe<Scalars['String']>
}>

export type SayHelloMutation = {__typename?: 'Mutation'; sayHello: boolean}

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
export const LoginByEmailDocument = gql`
  mutation loginByEmail($email: String!, $password: String!) {
    loginByEmail(email: $email, password: $password) {
      userId
      token
    }
  }
`
export type LoginByEmailMutationFn = Apollo.MutationFunction<
  LoginByEmailMutation,
  LoginByEmailMutationVariables
>

/**
 * __useLoginByEmailMutation__
 *
 * To run a mutation, you first call `useLoginByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginByEmailMutation, { data, loading, error }] = useLoginByEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginByEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginByEmailMutation, LoginByEmailMutationVariables>
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<LoginByEmailMutation, LoginByEmailMutationVariables>(
    LoginByEmailDocument,
    options
  )
}
export type LoginByEmailMutationHookResult = ReturnType<typeof useLoginByEmailMutation>
export type LoginByEmailMutationResult = Apollo.MutationResult<LoginByEmailMutation>
export type LoginByEmailMutationOptions = Apollo.BaseMutationOptions<
  LoginByEmailMutation,
  LoginByEmailMutationVariables
>
export const SayHelloDocument = gql`
  mutation sayHello($hello: String) {
    sayHello(hello: $hello)
  }
`
export type SayHelloMutationFn = Apollo.MutationFunction<
  SayHelloMutation,
  SayHelloMutationVariables
>

/**
 * __useSayHelloMutation__
 *
 * To run a mutation, you first call `useSayHelloMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSayHelloMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sayHelloMutation, { data, loading, error }] = useSayHelloMutation({
 *   variables: {
 *      hello: // value for 'hello'
 *   },
 * });
 */
export function useSayHelloMutation(
  baseOptions?: Apollo.MutationHookOptions<SayHelloMutation, SayHelloMutationVariables>
) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useMutation<SayHelloMutation, SayHelloMutationVariables>(SayHelloDocument, options)
}
export type SayHelloMutationHookResult = ReturnType<typeof useSayHelloMutation>
export type SayHelloMutationResult = Apollo.MutationResult<SayHelloMutation>
export type SayHelloMutationOptions = Apollo.BaseMutationOptions<
  SayHelloMutation,
  SayHelloMutationVariables
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
