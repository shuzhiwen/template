import {db} from '@configs'
import {System} from '@generated'
import {randomCode} from '@utils'
import {Collection, ObjectId} from 'mongodb'
import {ModelBase} from './base'

export interface User extends System {
  name: string
  email: string
  password: string
}

export class UserModel extends ModelBase {
  private dbUser: Collection<User>

  constructor() {
    super()
    this.dbUser = db.collection('user')
    this.catch(this.createUser)
    this.catch(this.getUserById)
    this.catch(this.getUserByEmailPassword, 'auth')
    this.catch(this.resetPasswordOfUserByEmail, 'auth')
  }

  async createUser(props: Pick<User, 'email' | 'password'>) {
    const {email, password} = props

    if (await this.dbUser.findOne({email})) {
      throw new Error('This email address has been registered')
    }

    await this.dbUser.insertOne({
      email,
      password,
      name: `user_${randomCode()}`,
      createTime: Date.now(),
      updateTime: Date.now(),
    })

    return await this.dbUser.findOne({email})
  }

  async getUserById(userId: string) {
    return await this.dbUser.findOne({_id: new ObjectId(userId)})
  }

  async getUserByEmailPassword(email: string, password: string) {
    return await this.dbUser.findOne({email, password})
  }

  async resetPasswordOfUserByEmail(email: string, password: string) {
    return await this.dbUser.updateOne({email}, {$set: {password, updateTime: Date.now()}})
  }
}
