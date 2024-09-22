import { Router } from 'express'

export default (router: Router) => {
  router.post('/auth/login', (req, res) => {
    res.send('login')
  })

  router.post('/auth/logout', (req, res) => {
    res.send('logout')
  })

  router.post('/projects', (req, res) => {
    res.send('create project')
  })

  router.get('/projects', (req, res) => {
    res.send('list projects')
  })

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
