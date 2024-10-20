import { config } from 'dotenv-safe'

config()

export default {
  web: {
    http: {
      port: `${process.env.WEB_HTTP_PORT}`,
    },
  },
  api: {
    http: {
      port: `${process.env.API_HTTP_PORT}`,
    },
  },
  cors: {
    origin: `${process.env.WEB_HOST}`,
    credentials: true,
  },
  auth: {
    email: `${process.env.ROOT_EMAIL}`,
    password: `${process.env.ROOT_PASSWORD}`,
  },
  token: {
    access: {
      secret: `${process.env.ACCESS_TOKEN_SECRET}`,
      ttl: 3600,
    },
    refresh: {
      secret: `${process.env.REFRESH_TOKEN_SECRET}`,
      ttl: 7200,
    },
  },
  db: {
    mongo: {
      url: `${process.env.MONGODB_URL}`,
    },
  },
  email: {
    nodemailer: {
      mailtrap: {
        host: `${process.env.NODEMAILER_HOST}`,
        port: parseInt(`${process.env.NODEMAILER_PORT}`),
        auth: {
          user: `${process.env.NODEMAILER_USER}`,
          pass: `${process.env.NODEMAILER_PASSWORD}`,
        },
      },
    },
  },
}
