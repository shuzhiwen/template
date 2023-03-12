import {ApolloContext} from '@types'
import {MutationResolvers} from '@generated'
import {AuthenticationError} from '@utils'
import {loginByEmail} from './jwt'
import {sendEmail} from './email'

const emailAuthMapping = new Map<string, string[]>()

export const authMutation: MutationResolvers<ApolloContext, AnyObject> = {
  loginByEmail: async (_, args, ctx) => {
    return await loginByEmail(ctx, args)
  },

  sendEmailVerificationCode: async (_, {email}) => {
    const code = await sendEmail(email)
    emailAuthMapping.set(email, [...(emailAuthMapping.get(email) ?? []), code])
    setTimeout(() => emailAuthMapping.get(email)?.shift(), 5 * 60 * 1000)
    return true
  },

  resetPasswordByEmail: async (_, args, {userModel}) => {
    if (!emailAuthMapping.get(args.email)?.includes(args.verificationCode)) {
      throw new AuthenticationError('Wrong verification code')
    }
    await userModel.resetPasswordOfUserByEmail(args.email, args.password)
    return true
  },

  logonByEmail: async (_, args, ctx) => {
    if (!emailAuthMapping.get(args.email)?.includes(args.verificationCode)) {
      throw new AuthenticationError('Wrong verification code')
    }
    const user = await ctx.userModel.createUser(args)
    return await loginByEmail(ctx, user!)
  },
}
