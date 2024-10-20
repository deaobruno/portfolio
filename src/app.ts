import config from './config'
import logger from './drivers/logger'
import webServer from './drivers/webServer'
import apiServer from './drivers/apiServer'
import db from './drivers/db'

;(async () => {
  try {
    await db.start(config.db.mongo.url)
    webServer.start(config.web.http.port)
    apiServer.start(config.api.http.port)
  } catch (error: any) {
    logger.debug(error)
    logger.fatal(error.message)
  }
})()
