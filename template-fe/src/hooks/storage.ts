import {useLocalStorage} from 'react-use'

export function useToken() {
  return useLocalStorage<string>('AUTH_TOKEN')
}
