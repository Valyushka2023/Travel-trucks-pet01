import Booking from '../models/BookingModel.js';
import Camper from '../models/CamperModel.js';
import { sendEmail } from '../config/sendEmail.js';
import { generateBookingEmailHtml } from '../utils/emailTemplates.js';
import logger from '../utils/logger.js';

export const createBooking = async (req, res, next) => {
  try {
    logger.info('[BOOKING] Отримано новий запит на бронювання: %o', req.body);
    const {
      camperId,
      name,
      email,
      bookingStartDate,
      bookingEndDate,
      comment,
      phone,
    } = req.body;

    if (!camperId || !name || !email || !bookingStartDate || !bookingEndDate) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing required fields.' });
    }

    const booking = await Booking.create({
      camperId,
      name,
      email,
      bookingStartDate,
      bookingEndDate,
      comment,
      phone,
    });

    logger.info('[BOOKING] Запис про бронювання успішно створено: %o', booking);

    const camper = await Camper.findById(camperId);
    if (!camper) {
      logger.warn('[BOOKING] Camper з id %s не знайдено', camperId);
    }

    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      const subject = '🚛 Нова заявка на бронювання кемпера';
      const html = generateBookingEmailHtml(booking, camper);

      await sendEmail({ to: adminEmail, subject, html });

      logger.info('[EMAIL] Успішно надіслано email про бронювання');
    } catch (emailError) {
      logger.error('[EMAIL] Помилка при надсиланні email: %o', emailError);
    }

    res.status(201).json({ success: true, message: 'Booking created' });
  } catch (error) {
    logger.error('[BOOKING] Помилка при створенні бронювання: %o', error);
    next(error);
  }
};
