import { NextFunction, Request, Response } from 'express'
import Project from '../../models/project/Project'
import NotFoundError from '../../errors/NotFoundError'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { project_id } = req.params
    const project = await Project.findOne({ project_id })
  
    if (!project) return next(NotFoundError('Project not found'))
  
    res.send(project)
  } catch (error) {
    next(error)
  }
}
