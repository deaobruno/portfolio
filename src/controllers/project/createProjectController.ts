import { Request, Response, NextFunction } from 'express'
import Project from '../../models/project/Project'
import ProjectStatus from '../../models/project/ProjectStatus'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description, url } = req.body

    await Project.create({
      project_id: crypto.randomUUID(),
      name,
      description,
      url,
      status: ProjectStatus.ACTIVE,
      created_at: new Date(),
    })

    res.send()
  } catch (error) {
    next(error)
  }
}
