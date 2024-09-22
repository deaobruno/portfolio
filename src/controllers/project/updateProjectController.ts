import { Request, Response, NextFunction } from 'express'
import Project from '../../models/Project'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { project_id } = req.params
    const { name, description } = req.body

    await Project.updateOne({ project_id }, {
      name,
      description,
      updated_at: new Date(),
    })

    res.send()
  } catch (error) {
    next(error)
  }
}
