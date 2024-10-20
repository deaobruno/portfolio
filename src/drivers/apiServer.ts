import { createServer } from 'node:http'
import express, { json, NextFunction, Request, Response, Router, urlencoded } from 'express'
import cors from 'cors'
import logger from './logger'
import authRoutes from '../routes/authRoutes'
import contactRoutes from '../routes/contactRoutes'
import adminRoutes from '../routes/adminRoutes'
import projectsRoutes from '../routes/projectsRoutes'
import BaseError from '../errors/BaseError'
import logRequestMiddleware from '../middlewares/logRequestMiddleware'
import config from '../config'

const app = express()
const router = Router()
const server = createServer(app)

authRoutes(router)
contactRoutes(router)
adminRoutes(router)
projectsRoutes(router)

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors(config.cors))
app.use(logRequestMiddleware)
app.use(router)
app.use((req: Request, res: Response) => 
  res.status(404).send({ error: 'Invalid URL' }))
app.use((error: BaseError, req: Request, res: Response, next: NextFunction) => {
  logger.debug(`[api] ${error.stack}`)

  res
    .status(error.statusCode || 500)
    .send({ error: error.message })
})

export default {
  start: (port: string | number) =>
    server.listen(port, () => {
      const serverAddress = server.address()
      let address = 'localhost'
  
      if (
        serverAddress &&
        typeof serverAddress === 'object' &&
        serverAddress.address !== '::'
      )
        address = serverAddress.address
  
      logger.info(`[api] Express HTTP Server started: http://${address}:${port}`)
    })
}
