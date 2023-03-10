import path from 'path'
import {hostname} from 'os'
import {promises as fs} from 'fs'
import {randomFileName} from '@utils'
import {ModelBase} from './base'
import {env} from '@configs'

const config = env.file.path

export class FileModel extends ModelBase {
  static cleaning = false

  private cache: Map<string, string> = new Map()

  constructor() {
    super()
    this.autoClear = this.catch(this.autoClear)
    this.initialize = this.catch(this.initialize)
    this.createTempFileByPermName = this.catch(this.createTempFileByPermName)
    this.createPermFileByTempName = this.catch(this.createPermFileByTempName)
    this.initialize(() => {
      if (!FileModel.cleaning) {
        FileModel.cleaning = true
        this.autoClear()
      }
    })
  }

  private async initialize(callback: () => void) {
    await fs.mkdir(config.request, {recursive: true})
    await fs.mkdir(config.storage, {recursive: true})
    await fs.mkdir(config.uploads, {recursive: true})
    callback()
  }

  private async autoClear() {
    this.clearTempFiles()
    setTimeout(() => this.autoClear(), Number(env.file.time.cleanup))
  }

  async clearTempFiles() {
    const files = await fs.readdir(config.request)

    files.forEach(async (file) => {
      const status = await fs.stat(path.resolve(config.request, file))
      if (Date.now() - status.atime.getTime() > Number(env.file.time.reserve)) {
        fs.rm(file)
      }
    })
  }

  async requestFile(url: string) {
    return await fs.readFile(path.resolve(config.request, url))
  }

  async createTempFileByPermName(name: string) {
    if (this.cache.has(name)) return this.cache.get(name)!

    const fileName = randomFileName(name)
    const sourcePath = path.resolve(config.storage, name)
    const targetPath = path.resolve(config.request, fileName)

    await fs.access(sourcePath)
    await fs.copyFile(sourcePath, targetPath)

    const accessible = path.join(hostname(), 'files', fileName)
    this.cache.set(name, accessible)

    return accessible
  }

  async createPermFileByTempName(name: string) {
    const fileName = randomFileName(name)
    const sourcePath = path.resolve(config.uploads, name)
    const targetPath = path.resolve(config.storage, fileName)

    await fs.access(sourcePath)
    await fs.copyFile(sourcePath, targetPath)
    await fs.rm(sourcePath)

    return fileName
  }
}
