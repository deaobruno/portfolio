import { NextFunction, Request, Response } from 'express'
import Project from '../../models/Project'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { project_id } = req.params

    await Project.deleteOne({ project_id })

    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
