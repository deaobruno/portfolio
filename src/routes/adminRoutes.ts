import { Router } from 'express'
import projectFormController from '../controllers/web/projectFormController'
import authenticateMiddleware from '../middlewares/authenticateMiddleware'
import parseCookiesMiddleware from '../middlewares/parseCookiesMiddleware'

export default (router: Router) => {
  router.use(parseCookiesMiddleware)
  router.get(
    '/admin/create-project',
    authenticateMiddleware,
    projectFormController,
  )
  router.get(
    '/admin/update-project/:project_id',
    authenticateMiddleware,
    projectFormController,
  )
}
