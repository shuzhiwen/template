import {TextField, Typography} from '@mui/material'
import {Stack} from '@mui/system'
import {useEffect, useState} from 'react'
import {useHelloQuery, useHelloWsSubscription, useSetHelloMutation} from '../generated/apollo'

export function Entry() {
  const {data} = useHelloQuery()
  const [mutation] = useSetHelloMutation()
  const {data: helloWs} = useHelloWsSubscription({
    variables: {key: 'test'},
  })
  const [hello, setHello] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => mutation({variables: {hello}}), 1000)
    return () => clearTimeout(timeout)
  }, [hello, mutation])

  return (
    <Stack spacing={2} p={6}>
      <TextField
        placeholder="Say hello to server here..."
        value={hello}
        onChange={(e) => setHello(e.target.value)}
      />
      <Typography>This is the greeting from server: {data?.hello}</Typography>
      <Typography>
        This is the greeting sent by the client to the server: {helloWs?.helloWs}
      </Typography>
    </Stack>
  )
}
