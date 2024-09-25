import { resolve } from 'node:path'
import { Request, Response, NextFunction } from 'express'
import Project from '../../models/project/Project'
import ProjectStatus from '../../models/project/ProjectStatus'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description, url, repository } = req.body
    const cover = req.file && resolve(req.file.path)

    await Project.create({
      project_id: crypto.randomUUID(),
      name,
      description,
      url,
      repository,
      cover,
      status: ProjectStatus.ACTIVE,
      created_at: new Date(),
    })

    res.send()
  } catch (error) {
    next(error)
  }
}
