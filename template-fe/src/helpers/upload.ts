import {UPLOAD_ROUTE} from '@/context'
import {useCallback} from 'react'
import {useToken} from './storage'

export function useUploadFiles() {
  const [token] = useToken()

  return useCallback(
    async (fileList: FileList | File[]) => {
      const formData = new FormData()

      Array.from(fileList).forEach((file) => {
        formData.append('files', file, file.name)
      })

      const response = await fetch(UPLOAD_ROUTE, {
        method: 'PUT',
        body: formData,
        headers: {
          authorization: token!,
        },
      })
      const data = (await response.json()) as string[]

      return data.map((id) => ({id}))
    },
    [token]
  )
}
