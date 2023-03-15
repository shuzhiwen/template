import path from 'path'
import {promises as fs} from 'fs'
import {randomFileName} from '@utils'
import {IdInput, Image} from '@generated'
import {ModelBase} from './base'
import {env} from '@configs'

const config = env.file.path

const cache: Map<string, Image> = new Map()

async function clearTempFiles() {
  const configs = [
    {baseUrl: config.uploads, files: await fs.readdir(config.uploads)},
    {baseUrl: config.request, files: await fs.readdir(config.request)},
  ]
  configs.forEach(({baseUrl, files}) => {
    files.forEach(async (file) => {
      const status = await fs.stat(path.resolve(baseUrl, file))
      if (Date.now() - status.atime.getTime() > Number(env.file.time.reserve)) {
        cache.delete(file)
        fs.rm(file)
      }
    })
  })
}

;(function autoClear() {
  clearTempFiles()
  setTimeout(() => autoClear(), Number(env.file.time.cleanup))
})()

export class FileModel extends ModelBase {
  constructor() {
    super()
    this.catch(this.initialize)
    this.catch(this.createTempFileByPermName)
    this.catch(this.createPermFileByTempName)
    this.catch(this.createTemporaryFiles)
    this.catch(this.createPermanentFiles)
    this.catch(this.requestFile)
  }

  private async initialize(callback: () => void) {
    await fs.mkdir(config.request, {recursive: true, mode: 0o644})
    await fs.mkdir(config.storage, {recursive: true, mode: 0o644})
    await fs.mkdir(config.uploads, {recursive: true, mode: 0o644})
    callback()
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
    if (cache.has(name)) return cache.get(name)!

    const fileName = randomFileName(name)
    const sourcePath = path.resolve(config.storage, name)
    const targetPath = path.resolve(config.request, fileName)

    await fs.access(sourcePath)
    await fs.copyFile(sourcePath, targetPath)

    const accessible = path.join(env.host, 'files', fileName)
    cache.set(name, {name: fileName, url: accessible})

    return cache.get(name)!
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
