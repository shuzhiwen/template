import {AuthenticationError} from '../utils'

export class ModelBase {
  catch<Fn extends AnyAsyncFunction>(fn: Fn) {
    return (async (...args: unknown[]) => {
      try {
        return await fn.call(this, ...args)
      } catch (error) {
        console.error(`Function: ${fn.name}\n`, error)
        throw new AuthenticationError((error as Error).message)
      }
    }) as Fn
  }
}
