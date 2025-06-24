import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import campersRouters from './src/routes/campersRouters.js';
import bookingRouters from './src/routes/bookingRouters.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5001;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.use(campersRouters);
app.use(bookingRouters);

mongoose
  .connect(process.env.MONGODB_URL, {
    serverSelectionTimeoutMS: 5001,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Сервер запущено на порту ${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
