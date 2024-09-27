import { resolve } from 'node:path'
import { promises as fs } from 'node:fs'
import { NextFunction, Request, Response } from 'express'
import Project from '../../models/project/Project'
import NotFoundError from '../../errors/NotFoundError'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { project_id } = req.params
    const project = await Project.findOne({ project_id })

    if (!project) return next(NotFoundError('Project not found'))
    if (project.cover && project.cover !== '/images/default-project.jpeg')
      await fs.unlink(resolve(`./public${project.cover}`))

    await Project.deleteOne({ project_id })

    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
