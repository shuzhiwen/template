import {MutationResolvers} from '../../generated/codegen'
import {sendEmail} from './email'

export const mutationResolvers: MutationResolvers<ApolloContext, AnyObject> = {
  sendEmailVerificationCode: async (_, args) => {
    await sendEmail(args.email)
    return true
  },
}
