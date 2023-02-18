import {noop} from 'lodash-es'
import React, {PropsWithChildren, useCallback, useContext, useState} from 'react'
import {LoginMutation} from '../generated/codegen'

type MeContextShape = {
  login: (data: LoginMutation['login']) => void
  user?: {id: string}
}

const authTokenKey = 'authToken'
const MeContext = React.createContext<MeContextShape>({login: noop})

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
