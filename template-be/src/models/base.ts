import {AuthenticationError, FileSystemError} from '@/helpers/error'
import {GraphQLError} from 'graphql'

type ErrorType = 'auth' | 'file'

const ErrorDict: Record<ErrorType, typeof GraphQLError> = {
  auth: AuthenticationError,
  file: FileSystemError,
}

export class ModelBase {
  private throwError(error: Error, type?: ErrorType) {
    if (type) {
      throw new ErrorDict[type](error.message)
    } else {
      throw new GraphQLError(error.message)
    }
  }

  protected catch<Fn extends AnyAsyncFunction>(fn: Fn, type?: ErrorType) {
    ;(this as AnyObject)[fn.name] = async (...args: unknown[]) => {
      try {
        return await fn.call(this, ...args)
      } catch (error) {
        const message = `${this.constructor.name} Method(${fn.name}) Error\n`
        console.error('\x1b[31m%s\x1b[0m', message, error)
        return this.throwError(error as Error, type)
      }
    }
  }
}
