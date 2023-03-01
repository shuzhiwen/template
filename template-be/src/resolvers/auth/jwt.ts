import jwt from 'jsonwebtoken'
import {MutationLoginByEmailArgs} from '../../generated'
import {AuthenticationError} from '../../utils'
import {ModelUser} from '../../models'
import {env} from '../../configs'

export const loginByEmail = async ({email, password}: MutationLoginByEmailArgs) => {
  const model = new ModelUser()
  const user = await model.getUserByEmailAndPassword(email, password)
  const userId = user?._id.toString()

  if (!userId) throw new AuthenticationError('Wrong user name or password')

  return {
    token: jwt.sign({userId} as JwtPayload, env.jwt.secret, {expiresIn: '7d'}),
    userId,
  }
}

export async function requireAuth({token}: ApolloContext) {
  try {
    const decode = jwt.verify(token!, env.jwt.secret) as JwtPayload
    const user = await new ModelUser().getUserById(decode.userId)

    if (!user) throw new AuthenticationError('No user matched')

    return user
  } catch (error) {
    throw new AuthenticationError('Token parsing failed')
  }
}
