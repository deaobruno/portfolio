import { Router } from 'express'
import createProjectController from '../controllers/project/createProjectController'
import validatePayloadMiddleware from '../middlewares/validatePayloadMiddleware'
import createProjectSchema from '../schemas/project/createProjectSchema'
import getProjectsController from '../controllers/project/getProjectsController'
import deleteProjectController from '../controllers/project/deleteProjectController'
import deleteProjectSchema from '../schemas/project/deleteProjectSchema'
import updateProjectController from '../controllers/project/updateProjectController'
import updateProjectSchema from '../schemas/project/updateProjectSchema'
import uploadFileMiddleware from '../middlewares/uploadFileMiddleware'
import authenticateMiddleware from '../middlewares/authenticateMiddleware'
import parseCookiesMiddleware from '../middlewares/parseCookiesMiddleware'
import removeProjectCoverSchema from '../schemas/project/removeProjectCoverSchema'
import removeProjectCoverController from '../controllers/project/removeProjectCoverController'

export default (router: Router) => {
  router.get('/projects', getProjectsController)
  router.use(parseCookiesMiddleware)
  router.post(
    '/projects',
    authenticateMiddleware,
    uploadFileMiddleware,
    validatePayloadMiddleware(createProjectSchema),
    createProjectController,
  )
  router.put(
    '/projects/:project_id',
    authenticateMiddleware,
    uploadFileMiddleware,
    validatePayloadMiddleware(updateProjectSchema),
    updateProjectController,
  )
  router.put(
    '/projects/:project_id/remove-cover',
    authenticateMiddleware,
    validatePayloadMiddleware(removeProjectCoverSchema),
    removeProjectCoverController,
  )
  router.delete(
    '/projects/:project_id',
    authenticateMiddleware,
    validatePayloadMiddleware(deleteProjectSchema),
    deleteProjectController,
  )
}
