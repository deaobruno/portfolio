import mongoose from 'mongoose'

mongoose.connection.on('connection', () => console.log('[MongoDb] Connected'))

export default {
  start: async (url: string): Promise<void> => {
    await mongoose.connect(url)
      .catch(error => console.log(`[MongoDb] Connection error: ${error.message}`))
  }
}