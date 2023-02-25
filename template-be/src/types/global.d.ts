type Meta = number | string

type Vec2 = [number, number]

type Maybe<T> = T | null | undefined

type MaybeGroup<T> = Maybe<T | T[]>

type AnyObject = Record<string, any>

type AnyAsyncFunction<T = unknown> = (...args: any) => Promise<T>

type AsyncReturnType<T> = T extends Promise<infer V> ? V : never

type Ungroup<T> = T extends Array<infer V> ? Ungroup<V> : T

type ArrayItem<T> = T extends Array<infer V> ? V : T

type Computable<T, P = never> = T | ((props: P) => T)

type Keys<T> = T extends Set<infer K>
  ? K
  : T extends Map<infer K, unknown>
  ? K
  : T extends Record<infer K, unknown>
  ? K
  : keyof T
