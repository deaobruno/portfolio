import nodemailer from 'nodemailer'
import logger from './logger'
import config from '../config'

type EmailData = {
  name: string
  email: string
  subject: string
  message: string
}

export default {
  async send(data: EmailData): Promise<void> {
    return new Promise((resolve, reject) => {
      const { name, email: address, subject, message: text } = data
      const options = {
        subject,
        text,
        from: {
          name,
          address,
        },
        to: config.auth.email,
      }
  
      nodemailer
        .createTransport(config.email.nodemailer.mailtrap)
        .sendMail(options, (error, info) => {
          if (error) {
            logger.error(`[Nodemailer] ${error}`)
  
            return reject()
          }
  
          logger.debug(`[Nodemailer] Message sent from ${info.envelope.from} to ${info.envelope.to}`)
  
          return resolve()
        })
    })
  }
}
