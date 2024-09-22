import { Router } from 'express'
import createProjectController from './controllers/project/createProjectController'
import validatePayload from './middlewares/validatePayload'
import createProjectSchema from './schemas/project/createProjectSchema'
import getProjectsController from './controllers/project/getProjectsController'

export default (router: Router) => {
  router.post('/auth/login', (req, res) => {
    res.send('login')
  })

  router.post('/auth/logout', (req, res) => {
    res.send('logout')
  })

  router.post('/projects', validatePayload(createProjectSchema), createProjectController)

  router.get('/projects', getProjectsController)

  router.get('/projects/:project_id', (req, res) => {
    res.send('get project by id')
  })

  router.put('/projects/project_id', (req, res) => {
    res.send('update project')
  })

  router.delete('/projects/:project_id', (req, res) => {
    res.send('delete project')
  })
}
