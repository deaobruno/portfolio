import { Router } from 'express'
import createProjectController from './controllers/project/createProjectController'
import validatePayloadMiddleware from './middlewares/validatePayloadMiddleware'
import createProjectSchema from './schemas/project/createProjectSchema'
import getProjectsController from './controllers/project/getProjectsController'
import getProjectByIdController from './controllers/project/getProjectByIdController'
import getProjectByIdSchema from './schemas/project/getProjectByIdSchema'
import deleteProjectController from './controllers/project/deleteProjectController'
import deleteProjectSchema from './schemas/project/deleteProjectSchema'
import updateProjectController from './controllers/project/updateProjectController'
import updateProjectSchema from './schemas/project/updateProjectSchema'
import homeController from './controllers/web/homeController'
import projectFormController from './controllers/web/projectFormController'
import uploadFileMiddleware from './middlewares/uploadFileMiddleware'
import loginController from './controllers/auth/loginController'
import loginSchema from './schemas/auth/loginSchema'
import authenticateMiddleware from './middlewares/authenticateMiddleware'

export default (router: Router) => {
  router.get('/', homeController)
  router.get(
    '/admin/create-project',
    projectFormController,
  )
  router.get(
    '/admin/update-project/:project_id',
    projectFormController,
  )
  router.post(
    '/auth',
    validatePayloadMiddleware(loginSchema),
    loginController,
  )
  router.delete(
    '/auth',
    authenticateMiddleware,
    (req, res) => {
      res.send('logout')
    }
  )
  router.post(
    '/projects',
    authenticateMiddleware,
    uploadFileMiddleware,
    validatePayloadMiddleware(createProjectSchema),
    createProjectController,
  )
  router.get('/projects', getProjectsController)
  router.get(
    '/projects/:project_id',
    validatePayloadMiddleware(getProjectByIdSchema),
    getProjectByIdController,
  )
  router.put(
    '/projects/:project_id',
    authenticateMiddleware,
    uploadFileMiddleware,
    validatePayloadMiddleware(updateProjectSchema),
    updateProjectController,
  )
  router.delete(
    '/projects/:project_id',
    authenticateMiddleware,
    validatePayloadMiddleware(deleteProjectSchema),
    deleteProjectController,
  )
}
