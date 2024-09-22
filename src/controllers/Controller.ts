import { Response } from 'express'

export default {
  ok: (res: Response, data?: object): void => {
    res.status(200).send(data)
  },
  created: (res: Response, data?: object): void => {
    res.status(201).send(data)
  },
  badRequest: (res: Response, data?: object): void => {
    res.status(400).send(data)
  },
  unauthorized: (res: Response, data?: object): void => {
    res.status(401).send(data)
  },
  forbidden: (res: Response, data?: object): void => {
    res.status(403).send(data)
  },
  notFound: (res: Response, data?: object): void => {
    res.status(404).send(data)
  },
  conflict: (res: Response, data?: object): void => {
    res.status(409).send(data)
  },
  internalServerError: (res: Response, data?: object): void => {
    res.status(500).send(data)
  },
}
