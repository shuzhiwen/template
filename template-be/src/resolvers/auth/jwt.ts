import jwt from 'jsonwebtoken'
import {MutationLoginByEmailArgs} from '../../generated'
import {AuthenticationError} from '../../utils'
import {ModelUser} from '../../models'
import {env} from '../../configs'

type Payload = {
  userId: string
}

export const loginByEmail = async ({email, password}: MutationLoginByEmailArgs) => {
  const model = new ModelUser()
  const user = await model.getUserByEmailAndPassword(email, password)
  const userId = user?._id.toString()

  if (!userId) throw new AuthenticationError('Wrong user name or password')

  const token = jwt.sign({userId} as Payload, env.jwt.secret, {expiresIn: '7d'})
  await model.registerToken(token, userId)

  return {token, userId}
}

export async function requireAuth({token}: ApolloContext) {
  try {
    const decode = jwt.verify(token!, env.jwt.secret) as Payload
    const user = await new ModelUser().getUserById(decode.userId)
    return user
  } catch (error) {
    throw new AuthenticationError('Token parsing failed')
  }
}
