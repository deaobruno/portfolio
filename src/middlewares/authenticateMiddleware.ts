import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import UnauthorizedError from '../errors/UnauthorizedError'
import cache from '../drivers/cache'

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) return next(UnauthorizedError('Empty authorization header'))

  const [type, token] = authorization.split(' ')

  if (type !== 'Bearer') return next(UnauthorizedError('Invalid authentication type'))
  if (!token) return next(UnauthorizedError('Empty token'))

  let access: any

  try {
    access = jwt.verify(token, config.token.access.secret)
  } catch (error: any) {
    const message = error.name === 'TokenExpiredError'
      ? 'Access token expired'
      : 'Invalid access token'

    return next(UnauthorizedError(message))
  }

  const { email } = access

  if (email !== config.auth.email || access.password !== config.auth.password)
    return next(UnauthorizedError())

  const refresh: string | undefined = cache.get(access.email)

  if (!refresh) return next(UnauthorizedError('User not logged'))

  try {
    jwt.verify(refresh, config.token.refresh.secret)
  } catch (error: any) {
    const message = error.name === 'TokenExpiredError'
      ? 'Refresh token expired'
      : 'Invalid refresh token'

    return next(UnauthorizedError(message))
  }

  req.user = { email }

  next()
}
