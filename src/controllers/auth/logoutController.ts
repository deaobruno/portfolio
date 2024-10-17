import { NextFunction, Request, Response } from 'express'
import cache from '../../drivers/cache'
import UnauthorizedError from '../../errors/UnauthorizedError'
import InternalServerError from '../../errors/InternalServerError'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.user
    const token = cache.get(email)

    if (!token) return next(UnauthorizedError('User not logged'))

    const deleted = cache.delete(email)

    if (deleted !== 1)
      return next(InternalServerError('Unable to delete token'))

    res
      .clearCookie('access_token')
      .clearCookie('refresh_token')
      .status(200)
      .send({ url: '/login' })
  } catch (error) {
    next(error)
  }
}
