import {noop} from 'lodash-es'
import {useCallback, useEffect, useState} from 'react'
import {Button, TextField, Typography} from '@mui/material'
import {Stack} from '@mui/system'
import {useMe} from '../context'
import {
  useHelloQuery,
  useHelloWsSubscription,
  useLoginMutation,
  useSetHelloMutation,
} from '../generated/codegen'

export function Entry() {
  const {user, login} = useMe()
  const [hello, setHello] = useState('')
  const [loginMutation] = useLoginMutation()
  const [helloMutation] = useSetHelloMutation()
  const {data: helloResult} = useHelloQuery({
    skip: !user,
  })
  const {data: helloWs} = useHelloWsSubscription({
    skip: !user,
    variables: {key: 'test'},
  })
  const loginAccount = useCallback(async () => {
    const {data} = await loginMutation({variables: {account: '1', password: '1'}})
    data && login(data.login)
  }, [login, loginMutation])

  useEffect(() => {
    const timeout = hello && setTimeout(() => helloMutation({variables: {hello}}), 500)
    return () => clearTimeout(timeout)
  }, [hello, helloMutation])

  return (
    <Stack spacing={2} p={6}>
      <Button onClick={user ? noop : loginAccount}>{user ? 'Logged' : 'Login'}</Button>
      <TextField
        placeholder="Say hello to server here..."
        value={hello}
        onChange={(e) => setHello(e.target.value)}
      />
      <Typography>This is the greeting from server: {helloResult?.hello}</Typography>
      <Typography>
        This is the greeting sent by the client to the server: {helloWs?.helloWs}
      </Typography>
    </Stack>
  )
}
