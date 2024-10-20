import { NextFunction, Request, Response } from 'express'
import logger from '../drivers/logger'

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.accept?.includes('text/html')) return next()

  res.on('close', () => {
    const { headers, body, params, query, file } = req

    logger.debug({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      request: {
        headers,
        body,
        params,
        query,
        file,
      },
      response: {
        headers: res.getHeaders(),
      },
    })
  })

  next()
}
