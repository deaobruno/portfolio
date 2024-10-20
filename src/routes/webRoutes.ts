import { Router } from 'express'
import homeController from '../controllers/web/homeController'
import projectFormController from '../controllers/web/projectFormController'
import authenticateMiddleware from '../middlewares/authenticateMiddleware'
import loginFormController from '../controllers/web/loginFormController'
import parseCookiesMiddleware from '../middlewares/parseCookiesMiddleware'
import adminController from '../controllers/web/adminController'

export default (router: Router) => {
  router.get('/', homeController)
  router.get('/login', loginFormController)
  router.use(parseCookiesMiddleware)
  router.get('/admin', authenticateMiddleware, adminController)
  router.get('/admin/create-project', authenticateMiddleware, projectFormController)
  router.get('/admin/update-project/:project_id', authenticateMiddleware, projectFormController)
}
