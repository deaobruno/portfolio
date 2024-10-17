import { Request, Response } from 'express'

export default (req: Request, res: Response) =>
  res
    .clearCookie('access_token')
    .clearCookie('refresh_token')
    .render('login.html')
