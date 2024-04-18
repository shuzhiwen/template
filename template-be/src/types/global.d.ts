type Meta = number | string

type Vec2 = [number, number]

type Maybe<T> = T | null | undefined

type MaybeGroup<T> = Maybe<T | T[]>

type Ungroup<T> = T extends Array<infer V> ? Ungroup<V> : T

type ArrayItem<T> = T extends Array<infer V> ? V : T

type Computable<T, P = never> = T | ((props: P) => T)

type AnyAsyncFunction<T = unknown> = (...args: any) => Promise<T>

type AsyncReturnType<T> = T extends Promise<infer V> ? V : never

type AnyObject = Record<string, unknown>
