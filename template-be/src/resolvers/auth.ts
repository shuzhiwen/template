import jwt from 'jsonwebtoken'
import {GraphQLError} from 'graphql'
import {MutationLoginArgs} from '../generated/codegen'
import {CustomErrorCode, env} from '../configs'
import {findUser} from './mock'

export const login = async (args: MutationLoginArgs) => {
  const {account, password} = args
  const user = await findUser(account, password)

  if (!user) {
    throw new GraphQLError('Wrong user name or password', {
      extensions: {code: CustomErrorCode.AUTHENTICATION_ERROR},
    })
  }

  return {
    token: jwt.sign({userId: user._id} as JwtPayload, env.jwt.secret, {expiresIn: '7d'}),
    userId: user._id,
  }
}

const auth = (token: string) => {
  try {
    return jwt.verify(token, env.jwt.secret) as JwtPayload
  } catch (error) {
    throw new GraphQLError('Authentication failed', {
      extensions: {code: CustomErrorCode.AUTHENTICATION_ERROR},
    })
  }
}

export function requireAuth({token}: ApolloContext) {
  if (!token || !auth(token)) {
    throw new GraphQLError('Authentication failed', {
      extensions: {code: CustomErrorCode.AUTHENTICATION_ERROR},
    })
  }
}
