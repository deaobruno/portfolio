import { Request, Response, NextFunction } from 'express'
import Project from '../../models/Project'

export default async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const projects = await Project.find()
  
    res.send(projects)
  } catch (error) {
    next(error)
  }
}
