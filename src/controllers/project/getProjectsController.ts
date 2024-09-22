import { Request, Response, NextFunction } from 'express'
import Controller from '../Controller'
import Project from '../../models/Project'

export default async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const projects = await Project.find()

  Controller.ok(res, projects)
}
