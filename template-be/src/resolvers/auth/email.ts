import {sample} from 'lodash'
import nodemailer from 'nodemailer'
import {env} from '../../configs'

export async function sendEmail(to: string) {
  const code = new Array(6)
    .fill(null)
    .map(() => sample('0123456789'))
    .join('')
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
}
