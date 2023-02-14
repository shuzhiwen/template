import {Typography} from '@mui/material'
import {useHelloWorldQuery} from '../generated/apollo'

export function Entry() {
  const {data} = useHelloWorldQuery()

  return <Typography>{data?.hello}</Typography>
}
