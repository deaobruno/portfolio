import mongoose from 'mongoose'
import logger from './logger'

export default {
  start: async (url: string): Promise<void> => {
    await mongoose.connect(url)
      .then(() => logger.info('[MongoDb] Connected'))
  }
}
