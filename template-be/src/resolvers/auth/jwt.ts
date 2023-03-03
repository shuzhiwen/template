import jwt from 'jsonwebtoken'
import {ApolloContext, env} from '../../configs'
import {MutationLoginByEmailArgs} from '../../generated'
import {AuthenticationError} from '../../utils'

type JwtPayload = {
  userId: string
}

export const loginByEmail = async (
  {userModel}: ApolloContext,
  {email, password}: MutationLoginByEmailArgs
) => {
  const user = await userModel.getUserByEmailAndPassword(email, password)
  const userId = user?._id.toString()

  if (!userId) throw new AuthenticationError('Wrong user name or password')

  return {
    token: jwt.sign({userId} as JwtPayload, env.jwt.secret, {expiresIn: '7d'}),
    userId,
  }
}

export async function requireAuth({token, userModel}: ApolloContext) {
  try {
    const decode = jwt.verify(token!, env.jwt.secret) as JwtPayload
    const user = await userModel.getUserById(decode.userId)

    if (!user) throw new AuthenticationError('No user matched')

    return user
  } catch (error) {
    throw new AuthenticationError('Token parsing failed')
  }
}
