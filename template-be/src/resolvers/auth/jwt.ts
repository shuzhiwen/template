import {env} from '@/configs'
import {MutationLoginByEmailArgs} from '@/generated'
import {ApolloContext, JwtPayload} from '@/types'
import {AuthenticationError, withId} from '@/utils'
import jwt from 'jsonwebtoken'

export const loginByEmail = async (
  {userModel}: ApolloContext,
  {email, password}: MutationLoginByEmailArgs
) => {
  const user = await userModel.getUserByEmailPassword(email, password)
  const userId = user?._id.toString()

  if (!userId) {
    throw new AuthenticationError('Wrong user name or password')
  }

  return {
    token: jwt.sign({userId} as JwtPayload, env.auth.secret, {expiresIn: '7d'}),
    userId,
  }
}

export async function requireAuth({token, userModel}: ApolloContext) {
  try {
    const decode = jwt.verify(token!, env.auth.secret) as JwtPayload
    const user = await userModel.getUserById(decode.userId)

    if (!user) throw new AuthenticationError('No user matched')

    return withId(user)
  } catch (error) {
    throw new AuthenticationError('Token parsing failed')
  }
}
