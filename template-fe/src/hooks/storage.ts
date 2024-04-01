import {useLocalStorage} from 'react-use'
import {createSharedData} from './helper'

export const useToken = createSharedData(function () {
  return useLocalStorage<Maybe<string>>('AUTH_TOKEN')
})
