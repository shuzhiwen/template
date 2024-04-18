import {env} from '@/configs'
import {IdInput, Image} from '@/generated'
import {randomFileName} from '@/helpers'
import {promises as fs} from 'fs'
import path from 'path'
import {ModelBase} from './base'

export const fileCache: Map<string, Image> = new Map()

export class FileModel extends ModelBase {
  constructor() {
    super()
    this.catch(this.createTempFileByPermName, 'file')
    this.catch(this.createPermFileByTempName, 'file')
    this.catch(this.createTemporaryFile, 'file')
    this.catch(this.createPermanentFile, 'file')
    this.catch(this.requestFile, 'file')
  }

  private async createPermFileByTempName(name: string): Promise<IdInput> {
    const fileName = randomFileName(name)
    const sourcePath = path.resolve(env.file.path.uploads, name)
    const targetPath = path.resolve(env.file.path.storage, fileName)

    await fs.access(sourcePath)
    await fs.copyFile(sourcePath, targetPath)

    return {id: fileName}
  }

  private async createTempFileByPermName(name: string): Promise<Image> {
    if (fileCache.has(name)) return fileCache.get(name)!

    const fileName = randomFileName(name)
    const sourcePath = path.resolve(env.file.path.storage, name)
    const targetPath = path.resolve(env.file.path.request, fileName)

    await fs.access(sourcePath)
    await fs.copyFile(sourcePath, targetPath)

    const accessible = new URL(
      path.join('files', fileName),
      env.host
    ).toString()
    fileCache.set(name, {name: fileName, url: accessible})

    return fileCache.get(name)!
  }

  async requestFile(url: string) {
    return await fs.readFile(path.resolve(env.file.path.request, url))
  }

  async createPermanentFile(input: IdInput): Promise<IdInput>
  async createPermanentFile(input: IdInput[]): Promise<IdInput[]>
  async createPermanentFile(input: IdInput | IdInput[]) {
    return Array.isArray(input)
      ? Promise.all(input.map(({id}) => id).map(this.createPermFileByTempName))
      : this.createPermFileByTempName(input.id)
  }

  async createTemporaryFile(input: IdInput): Promise<Image>
  async createTemporaryFile(input: IdInput[]): Promise<Image[]>
  async createTemporaryFile(input: IdInput | IdInput[]) {
    return Array.isArray(input)
      ? Promise.all(input.map(({id}) => id).map(this.createTempFileByPermName))
      : this.createTempFileByPermName(input.id)
  }
}
