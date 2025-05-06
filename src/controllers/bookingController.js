import Booking from '../models/BookingModel.js';
import { sendEmail } from '../config/sendEmail.js';
import logger from '../utils/logger.js';

export const createBooking = async (req, res, next) => {
  try {
    logger.info('[BOOKING] Отримано новий запит на бронювання: %o', req.body);

    const booking = await Booking.create(req.body);
    logger.info('[BOOKING] Запис про бронювання успішно створено: %o', booking);

    // 📧 Надсилаємо email адміністратору
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      const subject = '🚌 Нова заявка на бронювання';
      const html = `
        <h2>Кемпер заброньовано!</h2>
        <p><strong>Імʼя:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Дата бронювання:</strong> ${booking.bookingDate}</p>
      `;

      logger.info(
        '[EMAIL] Спроба відправити email адміну на адресу: %s',
        adminEmail
      );
      await sendEmail({ to: adminEmail, subject, html });
      logger.info('[EMAIL] Email адміну успішно відправлено.');
    } catch (emailError) {
      logger.error(
        '❌ [EMAIL] Помилка відправлення email адміну: %o',
        emailError
      );
    }

    res.status(201).json(booking);
  } catch (error) {
    logger.error('[BOOKING] Помилка при створенні бронювання: %o', error);
    next(error);
  }
};
