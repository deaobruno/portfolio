import { NextFunction, Request, Response } from 'express'
import Project from '../../models/project/Project'
import NotFoundError from '../../errors/NotFoundError'

export default async (req: Request, res: Response, next: NextFunction) => {
  const { project_id } = req.params
  const defaultCover = '/images/default-project.jpeg'

  if (!project_id)
    return res.render('project-form.html', { project: { cover: defaultCover }})

  const project = await Project.findOne({ project_id })

  if (!project) return next(NotFoundError('Project not found'))
  if (!project.cover) project.cover = defaultCover

  res.render('project-form.html', { project })
}
