import { Request, Response, NextFunction } from 'express'
import email from '../../drivers/email'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await email.send(req.body)

    res.send()
  } catch (error) {
    next(error)
  }
}
