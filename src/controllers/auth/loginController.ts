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

    res
      .cookie(
        'access_token',
        access_token,
        {
          maxAge: config.token.access.ttl * 1000,
          httpOnly: true,
          secure: false,
        },
      )
      .cookie(
        'refresh_token',
        refresh_token,
        {
          maxAge: config.token.refresh.ttl * 1000,
          httpOnly: true,
          secure: false,
        },
      )
      .status(201)
      .send({ url: '/' })
  } catch (error) {
    next(error)
  }
}
