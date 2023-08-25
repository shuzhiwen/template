import {env} from '@configs'
import {fileCache} from '@models'
import {promises as fs} from 'fs'
import path from 'path'

async function InitializeFolder() {
  await fs.mkdir(env.file.path.request, {recursive: true})
  await fs.mkdir(env.file.path.storage, {recursive: true})
  await fs.mkdir(env.file.path.uploads, {recursive: true})
}

async function clearTempFiles(baseUrl: string) {
  ;(await fs.readdir(baseUrl)).forEach(async (file) => {
    const status = await fs.stat(path.resolve(baseUrl, file))
    if (Date.now() - status.atime.getTime() > Number(env.file.time.reserve)) {
      fileCache.delete(file)
      fs.rm(file)
    }
  })
}

export async function autoClearFiles() {
  setTimeout(() => autoClearFiles(), Number(env.file.time.cleanup))
  await InitializeFolder()
  clearTempFiles(env.file.path.request)
  clearTempFiles(env.file.path.uploads)
}
