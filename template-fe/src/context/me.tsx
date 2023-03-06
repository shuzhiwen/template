import {createContext, PropsWithChildren, useCallback, useContext, useState} from 'react'
import {LoginByEmailMutation} from '@generated'
import {noop} from 'lodash-es'

type MeContextShape = {
  login: (data: LoginByEmailMutation['loginByEmail']) => void
  user?: {id: string}
}

const authTokenKey = 'authToken'
const MeContext = createContext<MeContextShape>({login: noop})

export const authTokenStorage = {
  get: () => localStorage.getItem(authTokenKey),
  set: (value: string) => localStorage.setItem(authTokenKey, value),
  remove: () => localStorage.removeItem(authTokenKey),
}

export function useMe() {
  return useContext(MeContext)
}

export function MeProvider(props: PropsWithChildren<unknown>) {
  const [user, setUser] = useState<MeContextShape['user']>()
  const login = useCallback<MeContextShape['login']>((data) => {
    authTokenStorage.set(data.token)
    setUser({id: data.userId})
  }, [])

  return (
    <MeContext.Provider value={{user, login}}>
      <>{props.children}</>
    </MeContext.Provider>
  )
}
