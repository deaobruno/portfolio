import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'

export default (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate({ ...req.body, ...req.params, ...req.query })

  if (error) return res.status(400).send({ error: error.details[0].message })

  next()
}
