import {FileModel, UserModel} from '@models'

export type JwtPayload = {
  userId: string
}

export type ApolloContext = {
  token: Maybe<string>
  userModel: UserModel
  fileModel: FileModel
}
