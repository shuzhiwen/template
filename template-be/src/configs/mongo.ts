import {MongoClient} from 'mongodb'

const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)

client
  .connect()
  .then(() => client.db('local').command({ping: 1}))
  .then(() => console.log('Connected successfully to server'))
  .catch(console.error)

export const db = client.db('local')
