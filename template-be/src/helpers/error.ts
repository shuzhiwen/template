import {GraphQLError} from 'graphql'

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {code: 'AUTHENTICATION_ERROR'},
    })
  }
}

export class FileSystemError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {code: 'FILE_SYSTEM_ERROR'},
    })
  }
}
