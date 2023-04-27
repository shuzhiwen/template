import {noop} from 'lodash-es'
import {PropsWithChildren, createContext, useCallback, useContext, useState} from 'react'
import {LoginByEmailMutation} from '@generated'

type MeContextShape = {
  login: (data: LoginByEmailMutation['loginByEmail']) => void
  userId?: string
  token?: string
}

export const MeContext = createContext<MeContextShape>({login: noop})

export const useMe = () => useContext(MeContext)

export function MeProvider(props: PropsWithChildren) {
  const [context, setContext] = useState<Omit<MeContextShape, 'login'>>()
  const login = useCallback<MeContextShape['login']>(
    ({token, userId}) => setContext({token, userId}),
    []
  )

  return (
    <MeContext.Provider value={{...context, login}}>
      <>{props.children}</>
    </MeContext.Provider>
  )
}
