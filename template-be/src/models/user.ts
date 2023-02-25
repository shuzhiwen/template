import {Collection, ObjectId} from 'mongodb'
import {randomCode} from '../utils'
import {ModelBase} from './base'
import {db} from '../configs'

type User = {
  name: string
  email: string
  password: string
}

type Auth = {
  token: string
  userId: string
  createTime: Date
}

export class ModelUser extends ModelBase {
  private dbUser: Collection<User>

  private dbAuth: Collection<Auth>

  constructor() {
    super()
    this.dbUser = db.collection('user')
    this.dbAuth = db.collection('auth')
    // catch errors
    this.getUserById = this.catch(this.getUserById)
    this.getUserByToken = this.catch(this.getUserByToken)
    this.getUserByEmailAndPassword = this.catch(this.getUserByEmailAndPassword)
    this.registerToken = this.catch(this.registerToken)
    this.createUser = this.catch(this.createUser)
  }

  async getUserById(userId: string) {
    return await this.dbUser.findOne({_id: new ObjectId(userId)})
  }

  async getUserByToken(token: string) {
    const authInfo = (await this.dbAuth.findOne({token}))!
    return await this.getUserById(authInfo._id.toString())
  }

  async getUserByEmailAndPassword(email: string, password: string) {
    return await this.dbUser.findOne({email, password})
  }

  async resetPasswordOfUser(email: string, password: string) {
    return await this.dbUser.updateOne({email}, {$set: {password}})
  }

  async registerToken(token: string, userId: string) {
    this.dbAuth.updateOne({userId}, {$set: {token, createTime: new Date()}}, {upsert: true})
  }

  async createUser(props: Pick<User, 'email' | 'password'>) {
    const {email, password} = props
    await this.dbUser.insertOne({email, password, name: `user_${randomCode}`})
    return await this.dbUser.findOne(props)
  }
}
