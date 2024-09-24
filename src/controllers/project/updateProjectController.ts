import { Request, Response, NextFunction } from 'express'
import Project from '../../models/project/Project'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { project_id } = req.params
    const { name, description, url, repository } = req.body

    await Project.updateOne({ project_id }, {
      name,
      description,
      url,
      repository,
      updated_at: new Date(),
    })

    res.send()
  } catch (error) {
    next(error)
  }
}
