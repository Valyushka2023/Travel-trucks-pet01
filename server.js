

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 5000;

// Замініть '*' на конкретні домени в продакшн-середовищі
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json()); // Використовуємо express.json()

mongoose.connect('mongodb+srv://vvpto82023:mMkyLqZFngTzKMPc@cluster0.vxst1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

const reviewSchema = new mongoose.Schema({
  name: String,
  email: String,
  rating: Number,
  comment: String,
  camperId: String,
});

const Review = mongoose.model('Review', reviewSchema);

const camperSchema = new mongoose.Schema({
  name: String,
  price: Number,
  rating: Number,
  location: String,
  description: String,
  id: Number,
  form: String,
  length: String,
  width: String,
  height: String,
  tank: String,
  consumption: String,
  transmission: String,
  engine: String,
  AC: Boolean,
  bathroom: Boolean,
  kitchen: Boolean,
  TV: Boolean,
  radio: Boolean,
  refrigerator: Boolean,
  microwave: Boolean,
  gas: Boolean,
  water: Boolean,
  gallery: Array,
  reviews: Array, // Виправлено тип на Array
});

const Camper = mongoose.model('Camper', camperSchema);

app.get('/api/campers', async (req, res) => {
  try {
    const campers = await Camper.find();
    res.json(campers);
  } catch (error) {
    console.error('Помилка отримання кемперів:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

app.get('/api/campers/:id', async (req, res) => {
  try {
    const camper = await Camper.findById(req.params.id);
    if (!camper) {
      return res.status(404).json({ message: 'Кемпер не знайдений' });
    }
    res.json(camper);
  } catch (error) {
    console.error('Помилка отримання кемпера:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    if (!req.body.camperId) {
      return res.status(400).json({ message: 'Camper ID не передано' });
    }
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json({ message: 'Відгук успішно додано' });
  } catch (error) {
    console.error('Помилка додавання відгуку:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`);
});