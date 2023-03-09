import path from 'path'
import {hostname} from 'os'
import {promises as fs} from 'fs'
import {randomFileName} from '@utils'
import {PathConfig} from '@types'
import {ModelBase} from './base'

export class FileModel extends ModelBase {
  static autoClearKeys: string[] = []

  private path: PathConfig = {
    request: 'temp/request',
    storage: 'temp/storage',
    uploads: 'temp/uploads',
  }

  private cache: Map<string, string> = new Map()

  constructor(path?: PathConfig) {
    super()
    this.autoClear = this.catch(this.autoClear)
    this.initialize = this.catch(this.initialize)
    this.createTempFileByPermName = this.catch(this.createTempFileByPermName)
    this.createPermFileByTempName = this.catch(this.createPermFileByTempName)
    this.path = path || this.path
    this.initialize(() => {
      const {request, storage, uploads} = this.path
      const key = request + storage + uploads

      if (!FileModel.autoClearKeys.includes(key)) {
        FileModel.autoClearKeys.push(key)
        this.autoClear()
      }
    })
  }

  private async initialize(callback: () => void) {
    await fs.mkdir(this.path.request, {recursive: true})
    await fs.mkdir(this.path.storage, {recursive: true})
    await fs.mkdir(this.path.uploads, {recursive: true})
    callback()
  }

  private async autoClear() {
    this.clearTempFiles()
    setTimeout(() => this.autoClear(), 24 * 60 * 60 * 1000)
  }

  async clearTempFiles() {
    const files = await fs.readdir(this.path.request)

    files.forEach(async (file) => {
      const status = await fs.stat(path.resolve(this.path.request, file))
      if (Date.now() - status.atime.getTime() > 30 * 24 * 60 * 60 * 1000) {
        fs.rm(file)
      }
    })
  }

  async requestFile(url: string) {
    return await fs.readFile(path.resolve(this.path.request, url))
  }

  async createTempFileByPermName(name: string) {
    if (this.cache.has(name)) return this.cache.get(name)!

    const fileName = randomFileName(name)
    const sourcePath = path.resolve(this.path.storage, name)
    const targetPath = path.resolve(this.path.request, fileName)

    await fs.access(sourcePath)
    await fs.copyFile(sourcePath, targetPath)

    const accessible = path.join(hostname(), 'files', fileName)
    this.cache.set(name, accessible)

    return accessible
  }

  async createPermFileByTempName(name: string) {
    const fileName = randomFileName(name)
    const sourcePath = path.resolve(this.path.uploads, name)
    const targetPath = path.resolve(this.path.storage, fileName)

    await fs.access(sourcePath)
    await fs.copyFile(sourcePath, targetPath)
    await fs.rm(sourcePath)

    return fileName
  }
}
