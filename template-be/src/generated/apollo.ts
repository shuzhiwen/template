/* eslint-disable */
import {ApolloContext} from '@types'
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
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

export type AuthInfo = {
  __typename?: 'AuthInfo'
  token: Scalars['String']
  userId: Scalars['String']
}

export type IdInput = {
  id: Scalars['String']
}

export type Image = {
  __typename?: 'Image'
  name: Scalars['String']
  url: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  loginByEmail: AuthInfo
  logonByEmail: AuthInfo
  resetPasswordByEmail: Scalars['Boolean']
  sayHello: Scalars['Boolean']
  sendEmailVerificationCode?: Maybe<Scalars['Boolean']>
}

export type MutationLoginByEmailArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationLogonByEmailArgs = {
  email: Scalars['String']
  password: Scalars['String']
  verificationCode: Scalars['String']
}

export type MutationResetPasswordByEmailArgs = {
  email: Scalars['String']
  password: Scalars['String']
  verificationCode: Scalars['String']
}

export type MutationSayHelloArgs = {
  hello?: InputMaybe<Scalars['String']>
}

export type MutationSendEmailVerificationCodeArgs = {
  email: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  hello: Scalars['String']
}

export type Subscription = {
  __typename?: 'Subscription'
  helloWs: Scalars['String']
}

export type System = {
  createTime: Scalars['Date']
  updateTime: Scalars['Date']
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    {[key in TKey]: TResult},
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    {[key in TKey]: TResult},
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthInfo: ResolverTypeWrapper<AuthInfo>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Date: ResolverTypeWrapper<Scalars['Date']>
  IdInput: IdInput
  Image: ResolverTypeWrapper<Image>
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']>
  Subscription: ResolverTypeWrapper<{}>
  System: never
  Void: ResolverTypeWrapper<Scalars['Void']>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthInfo: AuthInfo
  Boolean: Scalars['Boolean']
  Date: Scalars['Date']
  IdInput: IdInput
  Image: Image
  Mutation: {}
  Query: {}
  String: Scalars['String']
  Subscription: {}
  System: never
  Void: Scalars['Void']
}>

export type AuthInfoResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['AuthInfo'] = ResolversParentTypes['AuthInfo']
> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type ImageResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']
> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  loginByEmail?: Resolver<
    ResolversTypes['AuthInfo'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginByEmailArgs, 'email' | 'password'>
  >
  logonByEmail?: Resolver<
    ResolversTypes['AuthInfo'],
    ParentType,
    ContextType,
    RequireFields<
      MutationLogonByEmailArgs,
      'email' | 'password' | 'verificationCode'
    >
  >
  resetPasswordByEmail?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<
      MutationResetPasswordByEmailArgs,
      'email' | 'password' | 'verificationCode'
    >
  >
  sayHello?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    Partial<MutationSayHelloArgs>
  >
  sendEmailVerificationCode?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType,
    RequireFields<MutationSendEmailVerificationCodeArgs, 'email'>
  >
}>

export type QueryResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}>

export type SubscriptionResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = ResolversObject<{
  helloWs?: SubscriptionResolver<
    ResolversTypes['String'],
    'helloWs',
    ParentType,
    ContextType
  >
}>

export type SystemResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['System'] = ResolversParentTypes['System']
> = ResolversObject<{
  __resolveType: TypeResolveFn<null, ParentType, ContextType>
  createTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  updateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
}>

export interface VoidScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void'
}

export type Resolvers<ContextType = ApolloContext> = ResolversObject<{
  AuthInfo?: AuthInfoResolvers<ContextType>
  Date?: GraphQLScalarType
  Image?: ImageResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  System?: SystemResolvers<ContextType>
  Void?: GraphQLScalarType
}>
