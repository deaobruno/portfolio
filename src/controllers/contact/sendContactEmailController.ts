import { Request, Response, NextFunction } from 'express'
import email from '../../drivers/email'
import ServiceUnavailableError from '../../errors/ServiceUnavailableError'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    email.send(req.body)
      .then(() => res.send())
      .catch(() => next(ServiceUnavailableError()))
  } catch (error) {
    next(error)
  }
}
