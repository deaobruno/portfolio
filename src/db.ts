import mongoose from 'mongoose'

export default {
  start: async (url: string): Promise<void> => {
    await mongoose.connect(url)
      .catch(error => console.log(`[MongoDb] Connection error: ${error.message}`))
  }
}