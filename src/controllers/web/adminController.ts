import { Request, Response } from 'express'
import Project from '../../models/Project'

export default async (req: Request, res: Response) => {
  const projects = await Project.find()

  res.render('admin.html', { projects })
}
