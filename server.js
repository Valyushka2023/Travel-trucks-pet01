import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import campersRouters from './src/routes/campersRouters.js';
import bookingRouters from './src/routes/bookingRouters.js'; // ✅ новий імпорт

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Підключення маршрутів
app.use(campersRouters);
app.use(bookingRouters); // ✅ додано

// Підключення до бази даних
mongoose
  .connect(
    'mongodb+srv://vvpto82023:mMkyLqZFngTzKMPc@cluster0.vxst1.mongodb.net/campers?retryWrites=true&w=majority&appName=Cluster0',
    {
      serverSelectionTimeoutMS: 5001,
    }
  )

  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});
