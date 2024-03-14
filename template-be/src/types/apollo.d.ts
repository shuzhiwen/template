import {FileModel, UserModel} from '@/models'

export type JwtPayload = {
  userId: string
}

export type ApolloContext = {
  token: Maybe<string>
  userModel: UserModel
  fileModel: FileModel
}

export type QueryArgs<F extends object> = Partial<{
  limit: Maybe<number>
  offset: Maybe<number>
  filter: Maybe<
    F & {
      search?: Maybe<string>
    }
  >
}>
