import {db} from '@configs'
import {randomCode} from '@utils'
import {Collection, ObjectId} from 'mongodb'
import {ModelBase} from './base'

type User = {
  name: string
  email: string
  password: string
}

export class UserModel extends ModelBase {
  private dbUser: Collection<User>

  constructor() {
    super()
    this.dbUser = db.collection('user')
    // catch errors
    this.createUser = this.catch(this.createUser)
    this.getUserById = this.catch(this.getUserById)
    this.getUserByEmailAndPassword = this.catch(this.getUserByEmailAndPassword)
    this.resetPasswordOfUser = this.catch(this.resetPasswordOfUser)
  }

  async createUser(props: Pick<User, 'email' | 'password'>) {
    const {email, password} = props
    if (await this.dbUser.findOne({email})) {
      throw new Error('This email address has been registered')
    }
    await this.dbUser.insertOne({email, password, name: `user_${randomCode()}`})
    return await this.dbUser.findOne({email})
  }

  async getUserById(userId: string) {
    return await this.dbUser.findOne({_id: new ObjectId(userId)})
  }

  async getUserByEmailAndPassword(email: string, password: string) {
    return await this.dbUser.findOne({email, password})
  }

  async resetPasswordOfUser(email: string, password: string) {
    return await this.dbUser.updateOne({email}, {$set: {password}})
  }
}
