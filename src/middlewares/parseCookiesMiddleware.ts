import { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  req.cookies = {}
  req.headers.cookie?.split(';').forEach(cookie => {
    const [key, value] = cookie.split('=')

    req.cookies[key.trim()] = value.trim()
  })

  next()
}
