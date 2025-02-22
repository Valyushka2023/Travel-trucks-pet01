import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/reviewsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const reviewSchema = new mongoose.Schema({
  name: String,
  email: String,
  rating: Number,
  comment: String,
  camperId: String,
});

const Review = mongoose.model('Review', reviewSchema);

app.post('/api/reviews', async (req, res) => {
  try {
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