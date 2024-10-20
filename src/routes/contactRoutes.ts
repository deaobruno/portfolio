import { Router } from 'express'
import validatePayloadMiddleware from '../middlewares/validatePayloadMiddleware'
import sendContactEmailControllerSchema from '../schemas/contact/sendContactEmailControllerSchema'
import sendContactEmailController from '../controllers/contact/sendContactEmailController'

export default (router: Router) => {
  router.post(
    '/contact',
    validatePayloadMiddleware(sendContactEmailControllerSchema),
    sendContactEmailController,
  )
}
