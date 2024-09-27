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
import adminController from './controllers/web/adminController'
import removeProjectCoverSchema from './schemas/project/removeProjectCoverSchema'
import removeProjectCoverController from './controllers/project/removeProjectCoverController'

export default (router: Router) => {
  // [web] home
  router.get('/', homeController)
  // [web] login
  router.get('/login', loginFormController)
  // [api] login
  router.post(
    '/auth',
    validatePayloadMiddleware(loginSchema),
    loginController,
  )
  router.use(parseCookiesMiddleware, authenticateMiddleware)
  // [api] logout
  router.delete('/auth', logoutController)
  // [web] dashboard
  router.get('/admin', adminController)
  // [web] create project
  router.get('/admin/create-project', projectFormController)
  // [web] update project
  router.get('/admin/update-project/:project_id', projectFormController)
  // [api] create project
  router.post(
    '/projects',
    uploadFileMiddleware,
    validatePayloadMiddleware(createProjectSchema),
    createProjectController,
  )
  // [api] list projects
  router.get('/projects', getProjectsController)
  // [api] update project
  router.put(
    '/projects/:project_id',
    uploadFileMiddleware,
    validatePayloadMiddleware(updateProjectSchema),
    updateProjectController,
  )
  // [api] remove project cover
  router.put(
    '/projects/:project_id/remove-cover',
    validatePayloadMiddleware(removeProjectCoverSchema),
    removeProjectCoverController,
  )
  // [api] delete project
  router.delete(
    '/projects/:project_id',
    validatePayloadMiddleware(deleteProjectSchema),
    deleteProjectController,
  )
}
