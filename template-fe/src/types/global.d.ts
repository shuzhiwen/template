type Meta = number | string

type Vec2 = [number, number]

type Maybe<T> = T | null | undefined

type MaybeGroup<T> = Maybe<T | T[]>

type Padding<T = number> = [T, T, T, T]

type Ungroup<T> = T extends Array<infer V> ? Ungroup<V> : T

type ArrayItem<T> = T extends Array<infer V> ? V : T

type Computable<T, P = never> = T | ((props: P) => T)

type AnyFunction<T = unknown> = (...args: any) => T

type AnyEventObject = Record<string, AnyFunction>

type AnyObject = Record<string, unknown>
