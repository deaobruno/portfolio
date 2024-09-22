import { Router } from 'express'
import createProjectController from './controllers/project/createProjectController'
import validatePayload from './middlewares/validatePayload'
import createProjectSchema from './schemas/project/createProjectSchema'
import getProjectsController from './controllers/project/getProjectsController'
import getProjectByIdController from './controllers/project/getProjectByIdController'
import getProjectByIdSchema from './schemas/project/getProjectByIdSchema'
import deleteProjectController from './controllers/project/deleteProjectController'
import deleteProjectSchema from './schemas/project/deleteProjectSchema'
import updateProjectController from './controllers/project/updateProjectController'
import updateProjectSchema from './schemas/project/updateProjectSchema'
import homeController from './controllers/web/homeController'

export default (router: Router) => {
  router.get('/', homeController)
  router.post('/auth/login', (req, res) => {
    res.send('login')
  })
  router.post('/auth/logout', (req, res) => {
    res.send('logout')
  })
  router.post(
    '/projects',
    validatePayload(createProjectSchema),
    createProjectController,
  )
  router.get('/projects', getProjectsController)
  router.get(
    '/projects/:project_id',
    validatePayload(getProjectByIdSchema),
    getProjectByIdController,
  )
  router.put(
    '/projects/:project_id',
    validatePayload(updateProjectSchema),
    updateProjectController,
  )
  router.delete(
    '/projects/:project_id',
    validatePayload(deleteProjectSchema),
    deleteProjectController,
  )
}
