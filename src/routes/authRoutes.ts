import { Router } from 'express'
import validatePayloadMiddleware from '../middlewares/validatePayloadMiddleware'
import loginController from '../controllers/auth/loginController'
import loginSchema from '../schemas/auth/loginSchema'
import authenticateMiddleware from '../middlewares/authenticateMiddleware'
import logoutController from '../controllers/auth/logoutController'
import parseCookiesMiddleware from '../middlewares/parseCookiesMiddleware'

export default (router: Router) => {
  router.post(
    '/auth',
    validatePayloadMiddleware(loginSchema),
    loginController,
  )
  router.use(parseCookiesMiddleware)
  router.delete('/auth', authenticateMiddleware, logoutController)
}
