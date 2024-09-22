import { Request, Response, NextFunction } from 'express'
import Controller from '../Controller'
import Project from '../../models/Project'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, description } = req.body

    await Project.create({
      project_id: crypto.randomUUID(),
      name,
      description,
      created_at: new Date(),
    })

    Controller.created(res)
  }
