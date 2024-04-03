import {Dispatch, SetStateAction, useEffect} from 'react'
import {useUpdateEffect} from 'react-use'

type SetState<T> = Dispatch<SetStateAction<T>>

type UseState<T> = (initialValue: T) => [T, SetState<T>, ...unknown[]]

export function createSharedData<T>(useState: UseState<T>) {
  const dispatches = new Set<SetState<T>>()
  let currentValue: T

  return function useSharedData() {
    const [value, setValue] = useState(currentValue)

    useUpdateEffect(() => {
      currentValue = value
      dispatches.forEach((set) => set(value))
    }, [value])

    useEffect(() => {
      dispatches.add(setValue)
      return () => {
        dispatches.delete(setValue)
      }
    }, [setValue])

    return [value, setValue] as const
  }
}
