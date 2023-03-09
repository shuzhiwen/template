import {ErrorType} from '@types'
import {AuthenticationError} from '@utils'

export class ModelBase {
  private throwError(error: Error, type?: ErrorType) {
    switch (type) {
      case 'auth':
        throw new AuthenticationError(error.message)
      default:
        throw error
    }
  }

  catch<Fn extends AnyAsyncFunction>(fn: Fn, type?: ErrorType) {
    return (async (...args: unknown[]) => {
      try {
        return await fn.call(this, ...args)
      } catch (error) {
        console.error(`Function: ${fn.name}\n`, error)
        this.throwError(error as Error, type)
      }
    }) as Fn
  }
}
