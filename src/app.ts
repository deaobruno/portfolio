import config from './config'
import server from './server'

server.start(config.api.http.port)
