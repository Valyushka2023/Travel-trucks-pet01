// import express from 'express';
// import Booking from '../models/BookingModel.js';
// import { sendEmail } from '../config/sendEmail.js';
// import logger from '../utils/logger.js';

// const router = express.Router();

// // 📥 Створення нового бронювання
// router.post('/bookings', async (req, res, next) => {
//   try {
//     const { camperId, name, email, bookingDate, comment } = req.body;

//     if (!camperId || !name || !email || !bookingDate) {
//       return res.status(400).json({
//         success: false,
//         message: 'Обовʼязкові поля: camperId, name, email, bookingDate.',
//       });
//     }

//     logger.info('[BOOKING] Отримано новий запит: %o', req.body);
//     const booking = await Booking.create({
//       camperId,
//       name,
//       email,
//       bookingDate,
//       comment,
//     });
//     logger.info('[BOOKING] Створено бронювання: %o', booking);

//     // 📧 Надсилаємо email адміністратору
//     try {
//       const adminEmail = process.env.ADMIN_EMAIL;
//       const subject = '🚌 Нова заявка на бронювання кемпера';

//       const html = `
//         <table style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
//           <thead style="background-color: #f8f9fa;">
//             <tr>
//               <th colspan="2" style="padding: 16px; font-size: 20px; text-align: left; color: #333;">
//                 🚌 Нова заявка на бронювання кемпера
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr style="background-color: #ffffff;">
//               <td style="padding: 12px; font-weight: bold;">Ім’я</td>
//               <td style="padding: 12px;">${booking.name}</td>
//             </tr>
//             <tr style="background-color: #f9f9f9;">
//               <td style="padding: 12px; font-weight: bold;">Email</td>
//               <td style="padding: 12px;">${booking.email}</td>
//             </tr>
//             <tr style="background-color: #ffffff;">
//               <td style="padding: 12px; font-weight: bold;">Дата бронювання</td>
//               <td style="padding: 12px;">${booking.bookingDate}</td>
//             </tr>
//             ${
//               booking.comment
//                 ? `<tr style="background-color: #f9f9f9;">
//                      <td style="padding: 12px; font-weight: bold;">Коментар</td>
//                      <td style="padding: 12px;">${booking.comment}</td>
//                    </tr>`
//                 : ''
//             }
//           </tbody>
//         </table>
//       `;

//       logger.info('[EMAIL] Надсилаємо email адміну на: %s', adminEmail);
//       await sendEmail({ to: adminEmail, subject, html });
//       logger.info('[EMAIL] Email адміну успішно відправлено.');
//     } catch (emailError) {
//       logger.error('[EMAIL] Помилка відправки email адміну: %o', emailError);
//     }

//     res.status(201).json({
//       success: true,
//       message: 'Запит на бронювання надіслано!',
//       data: booking,
//     });
//   } catch (error) {
//     logger.error('[BOOKING] Помилка при створенні бронювання: %o', error);
//     next(error);
//   }
// });

// // 📄 Отримати всі бронювання
// router.get('/bookings', async (req, res, next) => {
//   try {
//     const bookings = await Booking.find();
//     res.json(bookings);
//   } catch (error) {
//     next(error);
//   }
// });

// export default router;

import express from 'express';
import Booking from '../models/BookingModel.js';
import Camper from '../models/CamperModel.js';
import { sendEmail } from '../config/sendEmail.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Створення нового бронювання
router.post('/bookings', async (req, res, next) => {
  try {
    const { camperId, name, email, bookingDate, comment } = req.body;

    if (!camperId || !name || !email || !bookingDate) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing required fields.' });
    }

    const booking = await Booking.create({
      camperId,
      name,
      email,
      bookingDate,
      comment,
    });

    // Шукаємо кемпер по camperId
    const camper = await Camper.findById(camperId);
    if (!camper) {
      logger.warn('[BOOKING] Camper з id %s не знайдено', camperId);
    }

    // 📧 Надсилаємо email адміністратору
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      const subject = '🚌 Нова заявка на бронювання кемпера';

      const html = `
        <table style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <thead style="background-color: #f8f9fa;">
            <tr>
              <th colspan="2" style="padding: 16px; font-size: 20px; text-align: left; color: #333;">
                🚌 Нова заявка на бронювання кемпера
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="background-color: #ffffff;">
              <td style="padding: 12px; font-weight: bold;">Назва кемпера</td>
              <td style="padding: 12px;">${camper?.name || '—'}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 12px; font-weight: bold;">Локація</td>
              <td style="padding: 12px;">${camper?.location || '—'}</td>
            </tr>
            <tr style="background-color: #ffffff;">
              <td style="padding: 12px; font-weight: bold;">Ім’я</td>
              <td style="padding: 12px;">${booking.name}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 12px; font-weight: bold;">Email</td>
              <td style="padding: 12px;">${booking.email}</td>
            </tr>
            <tr style="background-color: #ffffff;">
              <td style="padding: 12px; font-weight: bold;">Дата бронювання</td>
              <td style="padding: 12px;">${booking.bookingDate}</td>
            </tr>
            ${
              comment
                ? `<tr style="background-color: #f9f9f9;">
                    <td style="padding: 12px; font-weight: bold;">Коментар</td>
                    <td style="padding: 12px;">${comment}</td>
                  </tr>`
                : ''
            }
          </tbody>
        </table>
      `;

      await sendEmail({ to: adminEmail, subject, html });
      logger.info('[EMAIL] Email адміну успішно відправлено.');
    } catch (emailError) {
      logger.error(
        '❌ [EMAIL] Помилка відправлення email адміну: %o',
        emailError
      );
    }

    res.status(201).json({
      success: true,
      message: 'Booking request submitted successfully!',
      data: booking,
    });
  } catch (error) {
    logger.error('[BOOKING] Помилка при створенні бронювання: %o', error);
    next(error);
  }
});

// Отримати всі бронювання
router.get('/bookings', async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

export default router;
