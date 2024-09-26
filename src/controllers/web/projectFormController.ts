import { Request, Response } from 'express'
import Project from '../../models/project/Project'

export default async (req: Request, res: Response) => {
  const { project_id } = req.params

  if (!project_id) return res.render('project-form.html')

  const project = await Project.findOne({ project_id })

  res.render('project-form.html', { project })
}
