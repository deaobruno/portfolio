import { createServer } from 'node:http'
import { join } from 'node:path'
import express, { NextFunction, Request, Response, Router } from 'express'
import ejs from 'ejs'
import logger from './logger'
import BaseError from '../errors/BaseError'
import webRoutes from '../routes/webRoutes'

const app = express()
const router = Router()
const server = createServer(app)
const publicDir = 'public'
const htmlDir = join(publicDir, 'html')

webRoutes(router)

app.use(express.static(publicDir))
app.set('views', htmlDir)
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.use(router)
app.use((req: Request, res: Response) => {
  if (req.cookies && Object.keys(req.cookies).length > 0)
    return res.redirect('/admin')

  return res.redirect('/')
})
app.use((error: BaseError, req: Request, res: Response, next: NextFunction) => {
  logger.debug(`[web] ${error.stack}`)

  if (req.url !== '/' && error.statusCode === 401)
    return res.redirect('/login')

  if (req.cookies && Object.keys(req.cookies).length > 0)
    return res.redirect('/admin')

  return res.redirect('/')
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
  
      logger.info(`[web] Express HTTP Server started: http://${address}:${port}`)
    })
}
