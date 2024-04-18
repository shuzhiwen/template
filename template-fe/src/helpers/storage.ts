import {useLocalStorage} from 'react-use'

export const useToken = function () {
  return useLocalStorage<Maybe<string>>('AUTH_TOKEN')
}
