import {loginByEmail} from './jwt'
import {MutationResolvers} from '../../generated'
import {AuthenticationError} from '../../utils'
import {ModelUser} from '../../models'
import {sendEmail} from './email'

const emailAuthMapping = new Map<string, string[]>()

export const authMutation: MutationResolvers<ApolloContext, AnyObject> = {
  loginByEmail: async (_, args) => {
    return await loginByEmail(args)
  },

  sendEmailVerificationCode: async (_, {email}) => {
    const code = await sendEmail(email)
    emailAuthMapping.set(email, [...(emailAuthMapping.get(email) ?? []), code])
    setTimeout(() => emailAuthMapping.get(email)?.shift(), 5 * 60 * 1000)
    return true
  },

  resetPasswordByEmail: async (_, args) => {
    if (!emailAuthMapping.get(args.email)?.includes(args.verificationCode)) {
      throw new AuthenticationError('Wrong verification code')
    }
    await new ModelUser().resetPasswordOfUser(args.email, args.password)
    return true
  },

  logonByEmail: async (_, args) => {
    if (!emailAuthMapping.get(args.email)?.includes(args.verificationCode)) {
      throw new AuthenticationError('Wrong verification code')
    }
    const user = await new ModelUser().createUser(args)
    return await loginByEmail(user!)
  },
}
