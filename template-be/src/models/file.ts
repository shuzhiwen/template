import path from 'path'
import {hostname} from 'os'
import {promises as fs} from 'fs'
import {randomFileName} from '@utils'
import {IdInput, Image} from '@generated'
import {ModelBase} from './base'
import {env} from '@configs'

const config = env.file.path

export class FileModel extends ModelBase {
  static cleaning = false

  private cache: Map<string, Image> = new Map()

  constructor() {
    super()
    this.catch(this.autoClear)
    this.catch(this.initialize)
    this.catch(this.clearTempFiles)
    this.catch(this.createTempFileByPermName)
    this.catch(this.createPermFileByTempName)
    this.catch(this.createTemporaryFiles)
    this.catch(this.createPermanentFiles)
    this.catch(this.requestFile)
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

  private async clearTempFiles() {
    const configs = [
      {baseUrl: config.uploads, files: await fs.readdir(config.uploads)},
      {baseUrl: config.request, files: await fs.readdir(config.request)},
    ]

    configs.forEach(({baseUrl, files}) => {
      files.forEach(async (file) => {
        const status = await fs.stat(path.resolve(baseUrl, file))
        if (Date.now() - status.atime.getTime() > Number(env.file.time.reserve)) {
          fs.rm(file)
        }
      })
    })
  }

  private async createPermFileByTempName(name: string) {
    const fileName = randomFileName(name)
    const sourcePath = path.resolve(config.uploads, name)
    const targetPath = path.resolve(config.storage, fileName)

    await fs.access(sourcePath)
    await fs.copyFile(sourcePath, targetPath)

    return fileName
  }

  async createTempFileByPermName(name: string) {
    if (this.cache.has(name)) return this.cache.get(name)!

    const fileName = randomFileName(name)
    const sourcePath = path.resolve(config.storage, name)
    const targetPath = path.resolve(config.request, fileName)

    await fs.access(sourcePath)
    await fs.copyFile(sourcePath, targetPath)

    const accessible = path.join(hostname(), 'files', fileName)
    this.cache.set(name, {name: fileName, url: accessible})

    return this.cache.get(name)!
  }

  async requestFile(url: string) {
    return await fs.readFile(path.resolve(config.request, url))
  }

  async createPermanentFiles(input: IdInput): Promise<string>
  async createPermanentFiles(input: IdInput[]): Promise<string[]>
  async createPermanentFiles(input: IdInput | IdInput[]) {
    return Array.isArray(input)
      ? Promise.all(input.map(({id}) => id).map(this.createPermFileByTempName))
      : this.createPermFileByTempName(input.id)
  }

  async createTemporaryFiles(input: IdInput): Promise<Image>
  async createTemporaryFiles(input: IdInput[]): Promise<Image[]>
  async createTemporaryFiles(input: IdInput | IdInput[]) {
    return Array.isArray(input)
      ? Promise.all(input.map(({id}) => id).map(this.createTempFileByPermName))
      : this.createTempFileByPermName(input.id)
  }
}
