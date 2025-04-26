import express from 'express';
import { addReview } from '../controllers/campers.js';
import Camper from '../models/Camper.js';

const router = express.Router();

// Отримання всіх кемперів
router.get('/campers', async (req, res) => {
  try {
    const campers = await Camper.find(); // Отримуємо всі документи з колекції 'campers'
    console.log('Отримані кемпери:', campers);
    res.json(campers);
  } catch (error) {
    console.error('Помилка в GET /campers:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// Отримання конкретного кемпера за ID
router.get('/campers/:id', async (req, res) => {
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

// Додавання відгуку для конкретного кемпера
router.post('/campers/:camperId/reviews', addReview);

export default router;