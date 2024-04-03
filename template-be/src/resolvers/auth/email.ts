import {env} from '@/configs'
import {randomCode} from '@/helpers'
import nodemailer from 'nodemailer'

export async function sendEmail(to: string) {
  const code = randomCode()
  const transporter = nodemailer.createTransport({
    host: env.mail.host,
    port: 465,
    secure: true,
    auth: env.mail.auth,
  })

  await transporter.sendMail({
    to,
    from: 'yuwenmiao@qq.com',
    subject: 'Verify your email',
    text: `This is your validation code: ${code}`,
    html: `<b>This is your validation code: ${code}</b>`,
  })

  return code
}
