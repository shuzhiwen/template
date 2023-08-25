import {MutationResolvers} from '@generated'
import {ApolloContext} from '@types'
import {AuthenticationError} from '@utils'
import {sendEmail} from './email'
import {loginByEmail} from './jwt'

const emailCodeCache = new Map<string, string[]>()

export const authMutation: MutationResolvers<ApolloContext> = {
  loginByEmail: async (_, args, ctx) => {
    return await loginByEmail(ctx, args)
  },

  sendEmailVerificationCode: async (_, {email}) => {
    const code = await sendEmail(email)
    emailCodeCache.set(email, [...(emailCodeCache.get(email) ?? []), code])
    setTimeout(() => emailCodeCache.get(email)?.shift(), 5 * 60 * 1000)
    return true
  },

  resetPasswordByEmail: async (_, args, {userModel}) => {
    if (!emailCodeCache.get(args.email)?.includes(args.verificationCode)) {
      throw new AuthenticationError('Wrong verification code')
    }
    await userModel.resetPasswordOfUserByEmail(args.email, args.password)
    return true
  },

  logonByEmail: async (_, args, ctx) => {
    if (!emailCodeCache.get(args.email)?.includes(args.verificationCode)) {
      throw new AuthenticationError('Wrong verification code')
    }
    const user = await ctx.userModel.createUser(args)
    return await loginByEmail(ctx, user!)
  },
}
