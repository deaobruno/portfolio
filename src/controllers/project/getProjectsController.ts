import { Request, Response, NextFunction } from 'express'
import Project from '../../models/project/Project'
import ProjectStatus from '../../models/project/ProjectStatus'

export default async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const projects = (await Project.find())
      .map(project => {
        return {
          id: project.project_id,
          name: project.name,
          url: project.url,
          repository: project.repository,
          status: ProjectStatus[project.status],
        }
      })

    res.send(projects)
  } catch (error) {
    next(error)
  }
}
