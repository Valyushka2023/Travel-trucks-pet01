import express from 'express';
import { createBooking } from '../controllers/bookingController.js';

const router = express.Router();

// Створення нового бронювання
router.post('/bookings', createBooking);

// Отримати всі бронювання (за потреби можна винести в окремий контролер)
import Booking from '../models/BookingModel.js';

router.get('/bookings', async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

export default router;
