import path from 'path'
import {env} from '@configs'
import {promises as fs} from 'fs'
import {randomFileName} from '@utils'
import {IdInput, Image} from '@generated'
import {ModelBase} from './base'

export const fileCache: Map<string, Image> = new Map()

export class FileModel extends ModelBase {
  constructor() {
    super()
    this.catch(this.createTempFileByPermName)
    this.catch(this.createPermFileByTempName)
    this.catch(this.createTemporaryFiles)
    this.catch(this.createPermanentFiles)
    this.catch(this.requestFile)
  }

  private async createPermFileByTempName(name: string) {
    const fileName = randomFileName(name)
    const sourcePath = path.resolve(env.file.path.uploads, name)
    const targetPath = path.resolve(env.file.path.storage, fileName)

    await fs.access(sourcePath)
    await fs.copyFile(sourcePath, targetPath)

    return fileName
  }

  async createTempFileByPermName(name: string) {
    if (fileCache.has(name)) return fileCache.get(name)!

    const fileName = randomFileName(name)
    const sourcePath = path.resolve(env.file.path.storage, name)
    const targetPath = path.resolve(env.file.path.request, fileName)

    await fs.access(sourcePath)
    await fs.copyFile(sourcePath, targetPath)

    const accessible = new URL(path.join('files', fileName), env.host).toString()
    fileCache.set(name, {name: fileName, url: accessible})

    return fileCache.get(name)!
  }

  async requestFile(url: string) {
    return await fs.readFile(path.resolve(env.file.path.request, url))
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
