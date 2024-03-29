import {
  useHelloQuery,
  useHelloWsSubscription,
  useLoginByEmailMutation,
  useSayHelloMutation,
} from '@/generated'
import {useToken} from '@/hooks'
import {Button, Stack, TextField, Typography} from '@mui/material'
import {noop} from 'lodash-es'
import {useCallback, useEffect, useState} from 'react'

export function Entry() {
  const [token, setToken] = useToken()
  const [hello, setHello] = useState('')
  const [sayHello] = useSayHelloMutation()
  const [loginByEmail] = useLoginByEmailMutation()
  const {data: helloResult} = useHelloQuery({skip: !token})
  const {data: helloWs} = useHelloWsSubscription({skip: !token})
  const loginAccount = useCallback(async () => {
    const {data} = await loginByEmail({
      variables: {email: 'yuwenmiao@qq.com', password: '123456'},
    })
    if (data?.loginByEmail) {
      setToken(data.loginByEmail.token)
    }
  }, [loginByEmail, setToken])
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData()
      Array.from(event.target.files ?? []).forEach((file) => {
        formData.append('files', file, file.name)
      })
      fetch('/upload', {
        method: 'PUT',
        headers: {authorization: `Token ${token}`},
        body: formData,
      })
    },
    [token]
  )

  useEffect(() => {
    const timeout =
      hello && setTimeout(() => sayHello({variables: {hello}}), 500)
    return () => clearTimeout(timeout)
  }, [hello, sayHello])

  return (
    <Stack spacing={2} p={6}>
      <Button onClick={token ? noop : loginAccount}>
        {token ? 'Logged' : 'Login'}
      </Button>
      <TextField
        placeholder="Say hello to server here..."
        value={hello}
        onChange={(e) => setHello(e.target.value)}
      />
      <Typography>
        This is the greeting from server: {helloResult?.hello}
      </Typography>
      <Typography>
        This is the greeting sent by the client to the server:{' '}
        {helloWs?.helloWs}
      </Typography>
      <input type="file" multiple onChange={onChange} />
    </Stack>
  )
}
