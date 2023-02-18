import {PubSub} from 'graphql-subscriptions'

export const helloWorld = 'Template is now available!'

export const pubsub = new PubSub()

export const findUser = async (account: Maybe<string>, password: Maybe<string>) => {
  if (account && password) {
    return {
      _id: 'id',
      account,
      password,
    }
  }
  return null
}
