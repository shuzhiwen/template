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

  protected catch<Fn extends AnyAsyncFunction>(fn: Fn, type?: ErrorType) {
    ;(this as AnyObject)[fn.name] = (async (...args: unknown[]) => {
      try {
        return await fn.call(this, ...args)
      } catch (error) {
        const message = `${this.constructor.name} Method(${fn.name}) Error\n`
        console.error('\x1b[31m%s\x1b[0m', message, error)
        this.throwError(error as Error, type)
      }
    }) as Fn
  }
}
