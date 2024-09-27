import { createServer } from 'node:http'
import { join } from 'node:path'
import express, { json, NextFunction, Request, Response, Router, urlencoded } from 'express'
import ejs from 'ejs'
import logger from './logger'
import routes from '../routes'
import BaseError from '../errors/BaseError'
import logRequestMiddleware from '../middlewares/logRequestMiddleware'

const app = express()
const router = Router()
const server = createServer(app)
const publicDir = 'public'
const htmlDir = join(publicDir, 'html')

routes(router)

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(express.static(publicDir))
app.set('views', htmlDir)
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.use(logRequestMiddleware)
app.use(router)
app.use((req: Request, res: Response) => {
  if (req.headers.accept?.split(',')[0] === 'text/html' && req.user)
    return res.redirect('/admin')

  if (req.headers.accept?.split(',')[0] === 'text/html')
    return res.redirect('/')

  res.status(404).send({ error: 'Invalid URL' })
})
app.use((error: BaseError, req: Request, res: Response, next: NextFunction) => {
  logger.error(error)

  if (req.url !== '/' && req.headers.accept?.split(',')[0] === 'text/html' && error.statusCode === 401)
    return res.redirect('/login')

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
  
      logger.info(`[Express] HTTP Server started: http://${address}:${port}`)
    })
}
