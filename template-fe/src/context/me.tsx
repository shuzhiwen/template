import {LoginByEmailMutation} from '@generated'
import {noop} from 'lodash-es'
import {PropsWithChildren, createContext, useCallback, useContext} from 'react'
import {useLocalStorage} from 'react-use'

type Context = {
  login: (data: LoginByEmailMutation['loginByEmail']) => void
  token?: string
}

export const MeContext = createContext<Context>({login: noop})

export const useMe = () => useContext(MeContext)

export function MeProvider(props: PropsWithChildren) {
  const [token, setToken] = useLocalStorage<string>('AUTH_TOKEN')
  const login = useCallback<Context['login']>(
    ({token}) => setToken(token),
    [setToken]
  )

  return (
    <MeContext.Provider value={{token, login}}>
      <>{props.children}</>
    </MeContext.Provider>
  )
}
