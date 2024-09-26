import config from './config'
import server from './drivers/server'
import db from './drivers/db'

;(async () => {
  await db.start(config.db.mongo.url)
  server.start(config.http.port)
})()
