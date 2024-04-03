import {useLocalStorage} from 'react-use'
import {createSharedData} from './common'

export const useToken = createSharedData(function () {
  return useLocalStorage<Maybe<string>>('AUTH_TOKEN')
})
