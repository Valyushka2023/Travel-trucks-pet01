import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import routersCampers from './src/routers/routersCampers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());
app.use(routersCampers); 


mongoose.connect('mongodb+srv://vvpto82023:mMkyLqZFngTzKMPc@cluster0.vxst1.mongodb.net/campers?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});