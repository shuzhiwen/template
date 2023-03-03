import {MongoClient} from 'mongodb'
import {env} from './env'

const client = new MongoClient(env.db.url)

client
  .connect()
  .then(() => client.db('test').command({ping: 1}))
  .then(() => console.log('🚀 Connected successfully to server'))
  .catch(console.error)

export const db = client.db('test')
