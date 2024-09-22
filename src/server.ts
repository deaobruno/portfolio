import express, { json, NextFunction, Request, Response, Router } from 'express'
import routes from './routes'
import BaseError from './errors/BaseError'

const app = express()
const router = Router()

routes(router)

app.use(json())
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
    app.listen(port, () => console.log(`Server running on port: ${port}`))
}
