import {GraphQLError} from 'graphql'

export enum CustomErrorCode {
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
}

export class AuthenticationError extends GraphQLError {
  constructor(message = 'Authentication failed') {
    super(message, {
      extensions: {code: CustomErrorCode.AUTHENTICATION_ERROR},
    })
  }
}
