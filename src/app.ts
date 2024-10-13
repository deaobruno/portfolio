import config from './config'
import logger from './drivers/logger'
import server from './drivers/server'
import db from './drivers/db'

;(async () => {
  try {
    await db.start(config.db.mongo.url)
    server.start(config.http.port)
  } catch (error: any) {
    logger.debug(error)
    logger.fatal(error.message)
  }
})()
