import { Router } from 'express'
import createProjectController from './controllers/project/createProjectController'
import validatePayloadMiddleware from './middlewares/validatePayloadMiddleware'
import createProjectSchema from './schemas/project/createProjectSchema'
import getProjectsController from './controllers/project/getProjectsController'
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
import logoutController from './controllers/auth/logoutController'
import loginFormController from './controllers/web/loginFormController'
import parseCookiesMiddleware from './middlewares/parseCookiesMiddleware'

export default (router: Router) => {
  router.get('/', homeController)
  router.get('/login', loginFormController)
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
    parseCookiesMiddleware,
    authenticateMiddleware,
    logoutController,
  )
  router.post(
    '/projects',
    parseCookiesMiddleware,
    authenticateMiddleware,
    uploadFileMiddleware,
    validatePayloadMiddleware(createProjectSchema),
    createProjectController,
  )
  router.get(
    '/projects',
    parseCookiesMiddleware,
    authenticateMiddleware,
    getProjectsController,
  )
  router.put(
    '/projects/:project_id',
    parseCookiesMiddleware,
    authenticateMiddleware,
    uploadFileMiddleware,
    validatePayloadMiddleware(updateProjectSchema),
    updateProjectController,
  )
  router.delete(
    '/projects/:project_id',
    parseCookiesMiddleware,
    authenticateMiddleware,
    validatePayloadMiddleware(deleteProjectSchema),
    deleteProjectController,
  )
}
