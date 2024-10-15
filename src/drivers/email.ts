import logger from './logger'

export default {
  async send(params: any): Promise<void> {
    logger.debug(params)
  }
}
