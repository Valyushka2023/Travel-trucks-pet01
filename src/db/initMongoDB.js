/* eslint-env node */
import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js'; // або просто process.env якщо без валідації
// import { start } from 'repl';

export const initMongoDB = async () => {
  try {
    const user = encodeURIComponent(getEnvVar('MONGODB_USER'));
    const password = encodeURIComponent(getEnvVar('MONGODB_PASSWORD'));
    const cluster = getEnvVar('MONGODB_CLUSTER');
    const dbName = getEnvVar('MONGODB_DB');

    const mongoUri = `mongodb+srv://${user}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(mongoUri);
    // console.log('✅ MongoDB connected successfully');
  } catch (_) {
    // console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};
