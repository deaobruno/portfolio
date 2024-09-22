import { createServer } from 'node:http'
import { join } from 'node:path'
import express, { json, NextFunction, Request, Response, Router } from 'express'
import ejs from 'ejs'
import routes from './routes'
import BaseError from './errors/BaseError'

const app = express()
const router = Router()
const server = createServer(app)
const publicDir = 'public'
const htmlDir = join(publicDir, 'html')

routes(router)

app.use(json())
app.use(express.static(publicDir))
app.set('views', htmlDir)
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.use(router)
app.use((req: Request, res: Response, next: NextFunction) => {
  res
    .status(404)
    .json({ error: 'Invalid URL' })
})
app.use((error: BaseError, req: Request, res: Response, next: NextFunction) => {
  console.log(error)

  res
    .status(error.statusCode || 500)
    .json({ error: error.message })
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
  
      console.log(`[Express] HTTP Server started: http://${address}:${port}`)
    })
}
