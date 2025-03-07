import mongoose from 'mongoose';
import 'dotenv/config';

export async function initMongoConnection() {
  try {
    const URL_DB = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

    if (!URL_DB) {
      throw new Error('❌ MONGO_URI is not defined in .env file!');
    }
    await mongoose.connect(URL_DB);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}
