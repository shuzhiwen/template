import {UserModel} from '@models'

export type ApolloContext = {
  token: Maybe<string>
  userModel: UserModel
}

export type JwtPayload = {
  userId: string
}
