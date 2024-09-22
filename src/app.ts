import config from './config'
import server from './server'
import db from './db'

(async () => {
  await db.start(config.db.mongo.url)
  server.start(config.api.http.port)
})()
