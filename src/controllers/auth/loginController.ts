import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config'
import cache from '../../drivers/cache'
import UnauthorizedError from '../../errors/UnauthorizedError'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = config.auth

    if (req.body.email !== email || !await bcrypt.compare(req.body.password, password))
      return next(UnauthorizedError())

    const data = { email, password }
    const access_token = jwt.sign(data, config.token.access.secret, { expiresIn: config.token.access.ttl })
    const refresh_token = jwt.sign(data, config.token.refresh.secret, { expiresIn: config.token.refresh.ttl })

    cache.set(email, refresh_token, config.token.refresh.ttl)

    res.send({
      access_token,
      refresh_token,
    })
  } catch (error) {
    next(error)
  }
}
